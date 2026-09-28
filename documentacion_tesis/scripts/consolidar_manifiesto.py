#!/usr/bin/env python3
"""Consolida los metadatos y usos de las 40 fuentes en el manifiesto."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOCS_DIR = ROOT / "documentacion_tesis"
SOURCE_DIR = DOCS_DIR / "articulos_markdown"
CARDS_DIR = DOCS_DIR / "fichas"
MANIFEST_PATH = DOCS_DIR / "00_manifiesto_fuentes.md"
BIBLIOGRAPHY_PATH = DOCS_DIR / "00_bibliografia_apa7_normalizada.md"
MATRIX_PATH = DOCS_DIR / "01_matriz_cobertura.md"


@dataclass(frozen=True)
class Source:
    source_id: str
    zotero_key: str
    pdf_path: str
    title: str
    authors: str
    year: str
    doi: str
    citation: str
    reference: str
    category: str
    intended_use: str


def frontmatter(markdown: str) -> dict[str, str]:
    match = re.match(r"^---\n(.*?)\n---", markdown, re.DOTALL)
    if not match:
        raise ValueError("Markdown sin frontmatter")

    values = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        raw_value = raw_value.strip()
        if raw_value.startswith('"'):
            raw_value = json.loads(raw_value)
        values[key.strip()] = str(raw_value)
    return values


def load_references() -> dict[str, str]:
    bibliography = BIBLIOGRAPHY_PATH.read_text(encoding="utf-8")
    references = {
        match.group(1): match.group(2).strip()
        for match in re.finditer(r"^\[(S\d{2})\] (.+)$", bibliography, re.MULTILINE)
    }
    return references


def load_uses() -> dict[str, str]:
    matrix = MATRIX_PATH.read_text(encoding="utf-8")
    uses = {}
    for line in matrix.splitlines():
        if not re.match(r"^\| S\d{2} \|", line):
            continue
        columns = [column.strip() for column in line.split("|")[1:-1]]
        if len(columns) == 7:
            uses[columns[0]] = columns[6]
    return uses


def extract_authors(reference: str, year: str) -> str:
    marker = f" ({year})."
    if marker not in reference:
        raise ValueError(f"No se identificaron autores en: {reference}")
    return reference.split(marker, 1)[0]


def load_sources() -> list[Source]:
    references = load_references()
    uses = load_uses()
    sources = []

    for source_path in sorted(SOURCE_DIR.glob("S*.md")):
        source_meta = frontmatter(source_path.read_text(encoding="utf-8"))
        source_id = source_meta["id"]
        card_path = CARDS_DIR / f"{source_id}_ficha.md"
        card = card_path.read_text(encoding="utf-8")
        card_meta = frontmatter(card)
        citation_match = re.search(r"^- Parentética: (.+)$", card, re.MULTILINE)
        if not citation_match:
            raise ValueError(f"Cita parentética ausente en {card_path.name}")

        reference = references[source_id]
        sources.append(
            Source(
                source_id=source_id,
                zotero_key=source_meta["zotero_key"],
                pdf_path=source_meta["source_pdf"],
                title=source_meta["title"],
                authors=extract_authors(reference, source_meta["year"]),
                year=source_meta["year"],
                doi=source_meta["doi"],
                citation=citation_match.group(1),
                reference=reference,
                category=card_meta["eje"],
                intended_use=uses[source_id],
            )
        )

    if len(sources) != len(references) or len(sources) != len(uses):
        raise ValueError("La bibliografía, matriz y fuentes convertidas no contienen el mismo número de registros")
    if len({source.source_id for source in sources}) != len(sources):
        raise ValueError("Hay IDs duplicados")
    return sorted(sources, key=lambda source: int(source.source_id[1:]))


def markdown_cell(value: str) -> str:
    return value.replace("|", r"\|").replace("\n", " ").strip()


def source_row(source: Source) -> str:
    pdf_name = Path(source.pdf_path).name
    pdf_link = f"[{pdf_name}](<../{source.pdf_path}>)"
    doi_link = f"[{source.doi}](https://doi.org/{source.doi})"
    values = (
        source.source_id,
        source.zotero_key,
        pdf_link,
        source.title,
        source.authors,
        source.year,
        doi_link,
        source.citation,
        source.reference,
        source.category,
        source.intended_use,
    )
    return "| " + " | ".join(markdown_cell(value) for value in values) + " |"


def write_manifest(sources: list[Source]) -> None:
    current = MANIFEST_PATH.read_text(encoding="utf-8")
    prefix, _ = current.split("## Fuentes disponibles", 1)
    _, suffix = current.split("## Normalizaciones aplicadas", 1)
    suffix = suffix.replace(
        "S07, S14, S15, S17, S18, S29 y S36",
        "S01, S07, S14, S15, S17, S18, S29 y S36",
    )

    rows = [source_row(source) for source in sources]
    manifest = "\n".join(
        (
            prefix.rstrip(),
            "",
            "## Fuentes disponibles",
            "",
            "Cada fila consolida los metadatos bibliográficos, el archivo fuente y el uso previsto. "
            "La clave Zotero se conserva únicamente para trazabilidad interna.",
            "",
            "| ID | Clave Zotero | Nombre del PDF | Título | Autores | Año | DOI | Cita parentética APA 7 | Referencia APA 7 | Categoría temática | Uso previsto en la tesis |",
            "|---|---|---|---|---|---:|---|---|---|---|---|",
            *rows,
            "",
            "## Normalizaciones aplicadas",
            "",
            suffix.lstrip(),
        )
    )
    MANIFEST_PATH.write_text(manifest, encoding="utf-8")


def main() -> None:
    sources = load_sources()
    write_manifest(sources)
    print(f"Manifiesto consolidado: {len(sources)} fuentes")


if __name__ == "__main__":
    main()
