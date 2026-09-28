#!/usr/bin/env python3
"""Valida la estructura y la trazabilidad de las fichas del corpus."""

from __future__ import annotations

import json
import re
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOCS_DIR = ROOT / "documentacion_tesis"
SOURCE_DIR = DOCS_DIR / "articulos_markdown"
CARDS_DIR = DOCS_DIR / "fichas"
REPORT_PATH = DOCS_DIR / "02_indice_y_reporte_fichas.md"

REQUIRED_SECTIONS = (
    "Referencia APA 7",
    "Citas",
    "Objetivo",
    "Problema abordado",
    "Metodología",
    "Arquitectura y tecnología",
    "Actores",
    "Datos y evidencias",
    "Resultados principales",
    "Métricas e instrumentos",
    "Limitaciones",
    "Aporte a la tesis",
    "Evidencia textual verificable",
    "Precauciones de uso",
)


@dataclass(frozen=True)
class CardResult:
    source_id: str
    year: str
    axis: str
    source_pages: int
    evidence_rows: int
    paraphrases: int
    direct_quotes: int
    page_references: int


def frontmatter(markdown: str) -> dict[str, str]:
    match = re.match(r"^---\n(.*?)\n---", markdown, re.DOTALL)
    if not match:
        return {}

    values = {}
    for line in match.group(1).splitlines():
        if ":" not in line:
            continue
        key, raw_value = line.split(":", 1)
        raw_value = raw_value.strip()
        if raw_value.startswith('"'):
            try:
                raw_value = json.loads(raw_value)
            except json.JSONDecodeError:
                pass
        values[key.strip()] = str(raw_value)
    return values


def section(markdown: str, heading: str) -> str | None:
    match = re.search(
        rf"^## {re.escape(heading)}\s*$\n(.*?)(?=^## |\Z)",
        markdown,
        re.MULTILINE | re.DOTALL,
    )
    return match.group(1).strip() if match else None


def source_pages(markdown: str) -> dict[int, str]:
    chunks = re.split(r"^## Página (\d+)\s*$", markdown, flags=re.MULTILINE)
    return {int(chunks[index]): chunks[index + 1] for index in range(1, len(chunks), 2)}


def page_numbers(card: str) -> list[int]:
    numbers: list[int] = []
    for match in re.finditer(r"pp?\. PDF ([0-9][0-9, –\-y]*)", card):
        numbers.extend(int(value) for value in re.findall(r"\d+", match.group(1)))

    for heading in (
        "Resultados principales",
        "Limitaciones",
        "Evidencia textual verificable",
    ):
        content = section(card, heading) or ""
        for line in content.splitlines():
            if not line.startswith("|") or line.startswith("|---"):
                continue
            last_cell = line.rstrip("|").rsplit("|", 1)[-1].strip()
            if re.fullmatch(r"[0-9, –\-]+", last_cell):
                numbers.extend(int(value) for value in re.findall(r"\d+", last_cell))
    return numbers


def normalize_text(value: str) -> str:
    value = unicodedata.normalize("NFKC", value)
    value = value.translate(
        str.maketrans(
            {
                "’": "",
                "‘": "",
                "“": "",
                "”": "",
                '"': "",
                "'": "",
                "–": "-",
                "—": "-",
            }
        )
    )
    return re.sub(r"\s+", " ", value).strip().lower()


def direct_quote(value: str) -> str:
    quote = value.removeprefix("Cita directa:").strip()
    if quote.startswith(("“", '"')):
        quote = quote[1:]
    quote = quote.rstrip()
    if quote.endswith("."):
        quote = quote[:-1]
    if quote.endswith(("”", '"')):
        quote = quote[:-1]
    return quote.rstrip(".")


def evidence_rows(card: str) -> list[list[str]]:
    content = section(card, "Evidencia textual verificable") or ""
    rows = []
    for line in content.splitlines():
        if (
            not line.startswith("|")
            or line.startswith("|---")
            or "Uso previsto" in line
        ):
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if len(cells) == 3:
            rows.append(cells)
    return rows


def validate_card(card_path: Path, source_path: Path) -> tuple[CardResult, list[str]]:
    card = card_path.read_text(encoding="utf-8")
    source = source_path.read_text(encoding="utf-8")
    card_meta = frontmatter(card)
    source_meta = frontmatter(source)
    source_id = source_meta.get("id", source_path.stem)
    errors: list[str] = []

    for heading in REQUIRED_SECTIONS:
        content = section(card, heading)
        if content is None:
            errors.append(f"{source_id}: falta la sección '{heading}'")
        elif not content:
            errors.append(f"{source_id}: la sección '{heading}' está vacía")

    for field in ("id", "title", "year", "doi"):
        if card_meta.get(field) != source_meta.get(field):
            errors.append(
                f"{source_id}: metadato '{field}' distinto del Markdown fuente"
            )

    pages = source_pages(source)
    expected_pages = int(source_meta.get("pages", 0))
    if len(pages) != expected_pages:
        errors.append(
            f"{source_id}: se detectaron {len(pages)} marcadores de {expected_pages} páginas"
        )

    references = page_numbers(card)
    invalid_pages = sorted({number for number in references if number not in pages})
    if invalid_pages:
        errors.append(f"{source_id}: páginas fuera de rango: {invalid_pages}")

    rows = evidence_rows(card)
    if len(rows) < 3:
        errors.append(f"{source_id}: solo contiene {len(rows)} evidencias textuales")

    paraphrases = 0
    quotes = 0
    for use, text, raw_pages in rows:
        cited_pages = [int(value) for value in re.findall(r"\d+", raw_pages)]
        if text.startswith("Paráfrasis:"):
            paraphrases += 1
            continue
        if not text.startswith("Cita directa:"):
            errors.append(f"{source_id}: evidencia '{use}' sin tipo declarado")
            continue

        quotes += 1
        quote = normalize_text(direct_quote(text))
        page_text = normalize_text(
            " ".join(pages.get(number, "") for number in cited_pages)
        )
        if not quote or quote not in page_text:
            errors.append(
                f"{source_id}: la cita directa '{use}' no aparece en la página declarada"
            )

    return (
        CardResult(
            source_id=source_id,
            year=card_meta.get("year", "-"),
            axis=card_meta.get("eje", "-"),
            source_pages=expected_pages,
            evidence_rows=len(rows),
            paraphrases=paraphrases,
            direct_quotes=quotes,
            page_references=len(references),
        ),
        errors,
    )


def write_report(results: list[CardResult]) -> None:
    rows = [
        "| "
        + " | ".join(
            (
                result.source_id,
                result.year,
                result.axis,
                str(result.source_pages),
                str(result.evidence_rows),
                str(result.page_references),
                f"[Abrir](fichas/{result.source_id}_ficha.md)",
                "OK",
            )
        )
        + " |"
        for result in results
    ]
    report = "\n".join(
        (
            "# Índice y reporte de fichas de evidencia",
            "",
            "## Resumen",
            "",
            f"- Fichas validadas: {len(results)}.",
            f"- Páginas fuente cubiertas: {sum(result.source_pages for result in results)}.",
            f"- Evidencias textuales registradas: {sum(result.evidence_rows for result in results)}.",
            f"- Paráfrasis declaradas: {sum(result.paraphrases for result in results)}.",
            f"- Citas directas verificadas: {sum(result.direct_quotes for result in results)}.",
            f"- Referencias de página comprobadas: {sum(result.page_references for result in results)}.",
            "- Fichas con errores estructurales o de trazabilidad: 0.",
            "",
            "## Controles aplicados",
            "",
            "- Correspondencia exacta de ID, título, año y DOI con el Markdown fuente.",
            "- Presencia y contenido de las 14 secciones obligatorias de la plantilla.",
            "- Existencia de cada página declarada dentro del rango del artículo.",
            "- Clasificación explícita de cada evidencia como paráfrasis o cita directa.",
            "- Coincidencia normalizada de cada cita directa con el texto de la página indicada.",
            "- Revisión manual de fichas representativas de los ejes del corpus.",
            "",
            "La validación automática confirma estructura y trazabilidad formal. La interpretación "
            "conceptual de las paráfrasis debe volver a contrastarse al incorporarlas a la redacción final.",
            "",
            "## Índice por fuente",
            "",
            "| ID | Año | Eje | Páginas fuente | Evidencias | Referencias de página | Ficha | Estado |",
            "|---|---:|---|---:|---:|---:|---|---|",
            *rows,
            "",
            "## Reproducción",
            "",
            "```bash",
            "python documentacion_tesis/scripts/validar_fichas.py",
            "```",
            "",
            "El comando termina con código distinto de cero y no sobrescribe este reporte si detecta errores.",
            "",
        )
    )
    REPORT_PATH.write_text(report, encoding="utf-8")


def main() -> None:
    card_paths = sorted(CARDS_DIR.glob("S*_ficha.md"))
    source_paths = sorted(SOURCE_DIR.glob("S*.md"))
    if len(card_paths) != len(source_paths):
        print(
            f"La cantidad de fichas y fuentes no coincide: se encontraron "
            f"{len(card_paths)} y {len(source_paths)}.",
            file=sys.stderr,
        )
        raise SystemExit(1)

    results: list[CardResult] = []
    errors: list[str] = []
    for card_path in card_paths:
        source_path = SOURCE_DIR / f"{card_path.name[:3]}.md"
        result, card_errors = validate_card(card_path, source_path)
        results.append(result)
        errors.extend(card_errors)

    if errors:
        print("\n".join(errors), file=sys.stderr)
        raise SystemExit(1)

    write_report(results)
    print(f"{len(results)} fichas válidas. Reporte actualizado: {REPORT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
