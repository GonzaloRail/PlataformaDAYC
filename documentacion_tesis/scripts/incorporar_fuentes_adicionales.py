"""Convierte y ficha las fuentes añadidas al corpus sin registro Zotero previo."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
ARTICLES = ROOT / "Articulos"
DOCS = ROOT / "documentacion_tesis"
SOURCES = DOCS / "articulos_markdown"
CARDS = DOCS / "fichas"


RECORDS = (
    {
        "id": "S49", "file": "Verifying strong eventual consistency in distributed systems",
        "title": "Verifying Strong Eventual Consistency in Distributed Systems", "year": "2017",
        "doi": "10.1145/3133933", "axis": "Arquitectura, sincronización y operación offline",
        "reference": "Gomes, V. B. F., Kleppmann, M., Mulligan, D. P., & Beresford, A. R. (2017). Verifying strong eventual consistency in distributed systems. *Proceedings of the ACM on Programming Languages, 1*(OOPSLA), Article 109, 1-28. https://doi.org/10.1145/3133933",
        "citation": "(Gomes et al., 2017)",
        "objective": "Formalizar y verificar garantías de convergencia para tipos de datos replicados sin conflictos.",
        "method": "Marco formal y pruebas mecanizadas en Isabelle/HOL sobre un modelo de red y tres CRDT.",
        "findings": ("Los CRDT estudiados alcanzan consistencia eventual fuerte bajo el modelo formal.", "La convergencia depende de relaciones de orden y de la semántica del tipo de dato.", "El resultado no demuestra que toda operación de negocio pueda expresarse como CRDT."),
        "limits": "El trabajo prueba algoritmos concretos; no evalúa una aplicación sanitaria ni resuelve invariantes que exigen coordinación global.",
    },
    {
        "id": "S50", "file": "Reliable communication in the presence of failures.pdf",
        "title": "Reliable Communication in the Presence of Failures", "year": "1987",
        "doi": "10.1145/7351.7478", "axis": "Arquitectura, sincronización y operación offline",
        "reference": "Birman, K. P., & Joseph, T. A. (1987). Reliable communication in the presence of failures. *ACM Transactions on Computer Systems, 5*(1), 47-76. https://doi.org/10.1145/7351.7478",
        "citation": "(Birman & Joseph, 1987)",
        "objective": "Diseñar comunicación confiable para grupos de procesos tolerantes a fallos.",
        "method": "Diseño y análisis de protocolos de multicast confiable en el sistema ISIS.",
        "findings": ("La entrega causal preserva dependencias entre eventos relacionados.", "Las restricciones de orden tienen costos y deben corresponder a la necesidad de la aplicación.", "Los fallos y recuperaciones también deben formar parte del orden observado."),
        "limits": "Es un fundamento clásico de protocolos, no una evaluación de arquitecturas web ni de persistencia de eventos moderna.",
    },
    {
        "id": "S51", "file": "On Mixing Eventual and Strong Consistency: Acute Cloud Types.pdf",
        "title": "On Mixing Eventual and Strong Consistency: Acute Cloud Types", "year": "2021",
        "doi": "10.1109/TPDS.2021.3090318", "axis": "Arquitectura, sincronización y operación offline",
        "reference": "Kokociński, M., Kobus, T., & Wojciechowski, P. T. (2021). On mixing eventual and strong consistency: Acute cloud types. *IEEE Transactions on Parallel and Distributed Systems, 32*(11), 2782-2795. https://doi.org/10.1109/TPDS.2021.3090318",
        "citation": "(Kokociński et al., 2021)",
        "objective": "Estudiar las garantías y anomalías de mezclar operaciones eventuales y fuertes.",
        "method": "Formalización teórica de acute cloud types y prueba de imposibilidad.",
        "findings": ("Las operaciones con distintos niveles de consistencia pueden exhibir reordenamiento temporal.", "Ese reordenamiento puede producir desacuerdos intermedios y causalidad circular.", "Las operaciones que requieren acuerdo global deben distinguirse de las conmutativas."),
        "limits": "El resultado es teórico y no prescribe una implementación única para todos los dominios.",
    },
    {
        "id": "S52", "file": "Consistency in Non-Transactional Distributed Storage Systems.pdf",
        "title": "Consistency in Non-Transactional Distributed Storage Systems", "year": "2016",
        "doi": "10.1145/2926965", "axis": "Arquitectura, sincronización y operación offline",
        "reference": "Viotti, P., & Vukolić, M. (2016). Consistency in non-transactional distributed storage systems. *ACM Computing Surveys, 49*(1), Article 19, 1-34. https://doi.org/10.1145/2926965",
        "citation": "(Viotti & Vukolić, 2016)",
        "objective": "Organizar y definir modelos de consistencia para almacenamiento distribuido no transaccional.",
        "method": "Revisión y clasificación de más de cincuenta nociones de consistencia.",
        "findings": ("Consistencia es un término con garantías distintas que deben declararse explícitamente.", "Los modelos se ordenan por fuerza semántica, desde linealizabilidad hasta modelos débiles.", "La consistencia eventual no debe confundirse con una garantía transaccional global."),
        "limits": "Su alcance se limita a operaciones sobre objetos no transaccionales.",
    },
    {
        "id": "S53", "file": "The W3C PROV family of specifications for modelling provenance metadata.pdf",
        "title": "The W3C PROV Family of Specifications for Modelling Provenance Metadata", "year": "2013",
        "doi": "10.1145/2452376.2452478", "axis": "Proveniencia, versionado y auditoría",
        "reference": "Missier, P., Belhajjame, K., & Cheney, J. (2013). The W3C PROV family of specifications for modelling provenance metadata. In *Proceedings of the 16th International Conference on Extending Database Technology* (pp. 773-776). Association for Computing Machinery. https://doi.org/10.1145/2452376.2452478",
        "citation": "(Missier et al., 2013)",
        "objective": "Presentar PROV como modelo interoperable de metadatos de proveniencia.",
        "method": "Tutorial técnico sobre el modelo, sus restricciones y extensiones.",
        "findings": ("PROV representa entidades, actividades y agentes involucrados en un recurso.", "El modelo busca interoperabilidad entre sistemas de gestión de proveniencia.", "Sus extensiones permiten especializar el modelo sin perder una base común."),
        "limits": "Es una fuente normativa-conceptual, no una validación de rendimiento o seguridad.",
    },
    {
        "id": "S54", "file": "Data Provenance in Security and Privacy.pdf",
        "title": "Data Provenance in Security and Privacy", "year": "2023",
        "doi": "10.1145/3593294", "axis": "Proveniencia, versionado y auditoría",
        "reference": "Pan, B., Stakhanova, N., & Ray, S. (2023). Data provenance in security and privacy. *ACM Computing Surveys, 55*(14s), Article 323, 1-35. https://doi.org/10.1145/3593294",
        "citation": "(Pan et al., 2023)",
        "objective": "Revisar el papel de la proveniencia en seguridad y privacidad.",
        "method": "Revisión de principios, modelos y esquemas de proveniencia segura.",
        "findings": ("La proveniencia registra entidades, procesos y usuarios en la evolución de un dato.", "La utilidad forense depende de proteger la propia proveniencia.", "Captura, manipulación y consulta de trazas requieren controles de seguridad y privacidad."),
        "limits": "No establece por sí sola obligaciones jurídicas ni una política concreta para menores.",
    },
    {
        "id": "S55", "file": "Integrity of Multimedia and Multimodal Data: From Capture to Use.pdf",
        "title": "Integrity of Multimedia and Multimodal Data: From Capture to Use", "year": "2022",
        "doi": "10.1109/MMUL.2022.3180122", "axis": "Captura y gestión de evidencia multimodal",
        "reference": "Singh, A. K., Kundur, D., Wu, M., & Barni, M. (2022). Integrity of multimedia and multimodal data: From capture to use. *IEEE MultiMedia, 29*(2), 8-10. https://doi.org/10.1109/MMUL.2022.3180122",
        "citation": "(Singh et al., 2022)",
        "objective": "Delimitar retos de integridad, autenticación y proveniencia de datos multimedia.",
        "method": "Introducción editorial a un número especial de IEEE MultiMedia.",
        "findings": ("La alteración y distribución no autorizada comprometen la confiabilidad de evidencia multimedia.", "Integridad, autenticación y proveniencia deben considerarse desde la captura hasta el uso.", "Las herramientas maduras para estos retos siguen siendo limitadas."),
        "limits": "Es una introducción editorial de tres páginas, sin método empírico propio.",
    },
    {
        "id": "S56", "file": "Integrating Telehealth for Strengthening Health Systems in the Context of the COVID-19 Pandemic: A Perspective from Peru.pdf",
        "title": "Integrating Telehealth for Strengthening Health Systems in the Context of the COVID-19 Pandemic: A Perspective from Peru", "year": "2023",
        "doi": "10.3390/ijerph20115980", "axis": "Contexto peruano de telesalud",
        "reference": "Curioso, W. H., Coronel-Chucos, L. G., & Henríquez-Suárez, M. (2023). Integrating telehealth for strengthening health systems in the context of the COVID-19 pandemic: A perspective from Peru. *International Journal of Environmental Research and Public Health, 20*(11), 5980. https://doi.org/10.3390/ijerph20115980",
        "citation": "(Curioso et al., 2023)",
        "objective": "Revisar cambios regulatorios, iniciativas y desafíos de telesalud durante la pandemia en Perú.",
        "method": "Revisión narrativa y perspectiva nacional.",
        "findings": ("La telesalud peruana enfrenta brechas de conectividad, interoperabilidad y capacidades digitales.", "Las iniciativas fueron principalmente locales pese al marco regulatorio progresivo.", "La integración requiere considerar infraestructura, información y recursos humanos."),
        "limits": "No mide una institución concreta ni sustituye la consulta de normas oficiales vigentes.",
    },
    {
        "id": "S57", "file": "Telehealth in community mental health centers during the COVID-19 pandemic in Peru: A qualitative study with key stakeholders.pdf",
        "title": "Telehealth in Community Mental Health Centers During the COVID-19 Pandemic in Peru: A Qualitative Study with Key Stakeholders", "year": "2024",
        "doi": "10.1016/j.ssmmh.2023.100287", "axis": "Contexto peruano de telesalud",
        "reference": "Paredes-Angeles, R., Cavero, V., Vilela-Estrada, A. L., Cusihuaman-Lope, N., Villarreal-Zegarra, D., & Diez-Canseco, F. (2024). Telehealth in community mental health centers during the COVID-19 pandemic in Peru: A qualitative study with key stakeholders. *SSM - Mental Health, 5*, 100287. https://doi.org/10.1016/j.ssmmh.2023.100287",
        "citation": "(Paredes-Angeles et al., 2024)",
        "objective": "Describir experiencias de actores clave con telesalud en centros comunitarios de salud mental de Perú.",
        "method": "Estudio cualitativo con 49 entrevistas semiestructuradas en cuatro centros de Lima y Callao.",
        "findings": ("La telesalud mejoró seguimiento y acceso a información para algunos actores.", "La falta de dispositivos y la conectividad deficiente dificultaron la atención.", "La adaptación debe responder a las prácticas rutinarias de los centros."),
        "limits": "El estudio es cualitativo y se concentra en cuatro centros de Lima y Callao durante la pandemia.",
    },
)


def pages(pdf: Path) -> list[str]:
    raw = subprocess.run(
        ["pdftotext", "-enc", "UTF-8", "-eol", "unix", str(pdf), "-"],
        check=True, capture_output=True, text=True,
    ).stdout.split("\f")
    if not raw[-1].strip():
        raw.pop()
    return [page.strip() or "_[Página sin texto extraíble]_" for page in raw]


def main() -> None:
    SOURCES.mkdir(exist_ok=True)
    CARDS.mkdir(exist_ok=True)
    for record in RECORDS:
        pdf = ARTICLES / record["file"]
        extracted = pages(pdf)
        digest = hashlib.sha256(pdf.read_bytes()).hexdigest()
        source = "\n".join((
            "---", f"id: {record['id']}", f"zotero_key: MANUAL-{record['id']}",
            f"title: {json.dumps(record['title'], ensure_ascii=False)}", f"year: {record['year']}",
            f"doi: {json.dumps(record['doi'])}",
            f"source_pdf: {json.dumps(str(pdf.relative_to(ROOT)), ensure_ascii=False)}",
            f"source_sha256: {digest}", f"pages: {len(extracted)}", 'extraction_tool: "pdftotext"',
            "---", "", f"# {record['title']}", "",
            *[f"## Página {index}\n\n{page}" for index, page in enumerate(extracted, 1)], "",
        ))
        (SOURCES / f"{record['id']}.md").write_text(source, encoding="utf-8")
        evidence = "\n".join(
            f"| {label} | Paráfrasis: {text} | 1 |"
            for label, text in zip(("Aporte", "Implicación", "Límite"), record["findings"])
        )
        card = f'''---
id: {record['id']}
title: {json.dumps(record['title'], ensure_ascii=False)}
year: {record['year']}
doi: {json.dumps(record['doi'])}
eje: {json.dumps(record['axis'], ensure_ascii=False)}
---

# {record['id']} - {record['title']}

## Referencia APA 7

{record['reference']}

## Citas

- Parentética: {record['citation']}

## Objetivo

{record['objective']}

## Problema abordado

{record['findings'][0]}

## Metodología

{record['method']}

## Arquitectura y tecnología

La fuente se emplea para delimitar una decisión arquitectónica o contextual; no se adopta una implementación completa desde este trabajo.

## Actores

Los actores se interpretan según el objeto estudiado por la fuente y no se trasladan automáticamente al caso de prueba.

## Datos y evidencias

El documento completo se convirtió con marcadores por página y SHA-256 para mantener trazabilidad de la extracción.

## Resultados principales

| Resultado | Valor o conclusión | Página PDF |
|---|---|---:|
| Aporte principal | {record['findings'][0]} | 1 |
| Implicación | {record['findings'][1]} | 1 |
| Precaución | {record['findings'][2]} | 1 |

## Métricas e instrumentos

La fuente no se usa para fijar umbrales de la tesis; sus medidas, cuando existen, permanecen acotadas a su propio diseño.

## Limitaciones

| Limitación | Página PDF |
|---|---:|
| {record['limits']} | 1 |

## Aporte a la tesis

- Capítulo II: sustenta el eje {record['axis'].lower()}.
- La transferencia se limita a requisitos, decisiones de diseño o contexto; no acredita desempeño de la arquitectura propuesta.

## Evidencia textual verificable

| Uso previsto | Fragmento o paráfrasis fiel | Página PDF |
|---|---|---:|
{evidence}

## Precauciones de uso

{record['limits']} No se extrapolan sus resultados a validez clínica, cumplimiento normativo peruano ni desempeño del prototipo.
'''
        (CARDS / f"{record['id']}_ficha.md").write_text(card, encoding="utf-8")
    print(f"Incorporadas {len(RECORDS)} fuentes adicionales.")


if __name__ == "__main__":
    main()
