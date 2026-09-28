#!/usr/bin/env python3
"""Convierte el corpus PDF a Markdown preservando límites de página."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
DOCS_DIR = ROOT / "documentacion_tesis"
MANIFEST_PATH = DOCS_DIR / "00_manifiesto_fuentes.md"
CSL_PATH = ROOT / "Mi biblioteca.json"
OUTPUT_DIR = DOCS_DIR / "articulos_markdown"
REPORT_PATH = DOCS_DIR / "01_reporte_conversion.md"


@dataclass(frozen=True)
class Source:
    source_id: str
    zotero_key: str
    year: str
    doi: str
    pdf_path: Path
    title: str


@dataclass(frozen=True)
class Result:
    source: Source
    pages: int
    characters: int
    sparse_pages: tuple[int, ...]
    replacement_characters: int
    sha256: str


def load_zotero_titles() -> dict[str, str]:
    records = json.loads(CSL_PATH.read_text(encoding="utf-8"))
    return {
        record["id"].rsplit("/", 1)[-1]: record["title"].strip()
        for record in records
    }


def load_sources() -> list[Source]:
    titles = load_zotero_titles()
    sources: list[Source] = []

    for line in MANIFEST_PATH.read_text(encoding="utf-8").splitlines():
        if not re.match(r"^\| S\d{2} \|", line):
            continue

        columns = [column.strip() for column in line.split("|")[1:-1]]
        if len(columns) < 6:
            continue
        source_id, zotero_key, year = columns[:3]
        doi_match = re.search(r"https://doi\.org/([^)]+)", columns[4])
        pdf_match = re.search(r"<([^>]+\.pdf)>", columns[5])
        if not doi_match or not pdf_match:
            raise ValueError(f"Fila incompleta en el manifiesto: {source_id}")
        if zotero_key not in titles:
            raise ValueError(f"Clave Zotero desconocida: {zotero_key}")

        pdf_path = (DOCS_DIR / pdf_match.group(1)).resolve()
        if not pdf_path.is_file():
            raise FileNotFoundError(pdf_path)

        sources.append(
            Source(
                source_id=source_id,
                zotero_key=zotero_key,
                year=year,
                doi=doi_match.group(1),
                pdf_path=pdf_path,
                title=titles[zotero_key],
            )
        )

    if len(sources) != 40:
        raise ValueError(f"Se esperaban 40 fuentes y se encontraron {len(sources)}")
    if len({source.source_id for source in sources}) != len(sources):
        raise ValueError("Hay IDs de fuente duplicados")
    return sorted(sources, key=lambda source: int(source.source_id[1:]))


def pdf_page_count(pdf_path: Path) -> int:
    process = subprocess.run(
        ["pdfinfo", str(pdf_path)],
        check=True,
        capture_output=True,
        text=True,
    )
    match = re.search(r"^Pages:\s+(\d+)\s*$", process.stdout, re.MULTILINE)
    if not match:
        raise ValueError(f"No se pudo determinar el número de páginas: {pdf_path}")
    return int(match.group(1))


def clean_page(text: str) -> str:
    text = (
        text.replace("\r\n", "\n")
        .replace("\r", "\n")
        .replace("\x00", "")
        .replace("�", r"\*")
    )
    lines = [line.rstrip() for line in text.splitlines()]
    cleaned = "\n".join(lines).strip()
    return re.sub(r"\n{3,}", "\n\n", cleaned)


def extract_pages(pdf_path: Path, expected_pages: int) -> list[str]:
    process = subprocess.run(
        ["pdftotext", "-enc", "UTF-8", "-eol", "unix", str(pdf_path), "-"],
        check=True,
        capture_output=True,
        text=True,
    )
    pages = process.stdout.split("\f")
    if len(pages) > expected_pages and not any(page.strip() for page in pages[expected_pages:]):
        pages = pages[:expected_pages]

    if len(pages) != expected_pages:
        pages = []
        for page_number in range(1, expected_pages + 1):
            page_process = subprocess.run(
                [
                    "pdftotext",
                    "-f",
                    str(page_number),
                    "-l",
                    str(page_number),
                    "-enc",
                    "UTF-8",
                    "-eol",
                    "unix",
                    str(pdf_path),
                    "-",
                ],
                check=True,
                capture_output=True,
                text=True,
            )
            pages.append(page_process.stdout.rstrip("\f"))

    return [clean_page(page) for page in pages]


def yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def convert(source: Source) -> Result:
    page_count = pdf_page_count(source.pdf_path)
    pages = extract_pages(source.pdf_path, page_count)
    digest = hashlib.sha256(source.pdf_path.read_bytes()).hexdigest()
    relative_pdf = source.pdf_path.relative_to(ROOT)

    sections = []
    for page_number, page in enumerate(pages, start=1):
        content = page or "_[Página sin texto extraíble]_"
        sections.append(f"## Página {page_number}\n\n{content}")

    markdown = "\n".join(
        [
            "---",
            f"id: {source.source_id}",
            f"zotero_key: {source.zotero_key}",
            f"title: {yaml_string(source.title)}",
            f"year: {source.year}",
            f"doi: {yaml_string(source.doi)}",
            f"source_pdf: {yaml_string(str(relative_pdf))}",
            f"source_sha256: {digest}",
            f"pages: {page_count}",
            'extraction_tool: "pdftotext"',
            "---",
            "",
            f"# {source.title}",
            "",
            *sections,
            "",
        ]
    )
    (OUTPUT_DIR / f"{source.source_id}.md").write_text(markdown, encoding="utf-8")

    page_characters = [len(page) for page in pages]
    return Result(
        source=source,
        pages=page_count,
        characters=sum(page_characters),
        sparse_pages=tuple(
            page_number
            for page_number, characters in enumerate(page_characters, start=1)
            if characters < 100
        ),
        replacement_characters=sum(page.count("�") for page in pages),
        sha256=digest,
    )


def write_report(results: list[Result]) -> None:
    rows = []
    for result in results:
        sparse = ", ".join(map(str, result.sparse_pages)) or "-"
        status = "OK"
        if result.characters < 1_000 or result.replacement_characters:
            status = "REVISAR"
        rows.append(
            "| "
            + " | ".join(
                [
                    result.source.source_id,
                    str(result.pages),
                    f"{result.characters:,}",
                    sparse,
                    str(result.replacement_characters),
                    result.sha256[:12],
                    status,
                ]
            )
            + " |"
        )

    report = "\n".join(
        [
            "# Reporte de conversión del corpus",
            "",
            "## Resumen",
            "",
            f"- PDF procesados: {len(results)}",
            f"- Páginas procesadas: {sum(result.pages for result in results)}",
            f"- Caracteres extraídos: {sum(result.characters for result in results):,}",
            f"- Archivos marcados para revisión: {sum(result.characters < 1_000 or bool(result.replacement_characters) for result in results)}",
            "- Herramienta: `pdftotext` con codificación UTF-8.",
            "- Cada archivo conserva marcadores explícitos por página y SHA-256 del PDF fuente.",
            "",
            "## Resultado por fuente",
            "",
            "| ID | Páginas | Caracteres | Páginas con menos de 100 caracteres | Caracteres de reemplazo | SHA-256 abreviado | Estado |",
            "|---|---:|---:|---|---:|---|---|",
            *rows,
            "",
            "## Interpretación",
            "",
            "- Una página con poco texto no implica un error: puede ser portada, figura o página final.",
            "- `REVISAR` se reserva para archivos con extracción total insuficiente o problemas de codificación.",
            "- Las fichas de la fase 3 deberán contrastar tablas y figuras relevantes directamente con el PDF.",
            "",
        ]
    )
    REPORT_PATH.write_text(report, encoding="utf-8")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    results = [convert(source) for source in load_sources()]
    write_report(results)
    print(
        f"Convertidos {len(results)} PDF, "
        f"{sum(result.pages for result in results)} páginas y "
        f"{sum(result.characters for result in results):,} caracteres."
    )


if __name__ == "__main__":
    main()
