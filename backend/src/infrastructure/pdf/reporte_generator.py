"""PDF Report Generator for DAYC-2 evaluations"""

# flake8: noqa: E501 (HTML template strings exceed 79 chars)

import os
import tempfile
from collections import defaultdict
from datetime import datetime


class ReporteGenerator:
    """Generate PDF reports for DAYC-2 evaluations"""

    AREA_ORDER = [
        "COGNITIVO",
        "COMUNICACION",
        "DESARROLLO_FISICO",
        "SOCIAL_EMOCIONAL",
        "CONDUCTA_ADAPTATIVA",
    ]

    AREA_COLORS = {
        "COGNITIVO": "#3498db",
        "COMUNICACION": "#e74c3c",
        "DESARROLLO_FISICO": "#2ecc71",
        "SOCIAL_EMOCIONAL": "#f39c12",
        "CONDUCTA_ADAPTATIVA": "#9b59b6",
    }

    AREA_LABELS = {
        "COGNITIVO": "Cognitivo",
        "COMUNICACION": "Comunicación",
        "DESARROLLO_FISICO": "Físico",
        "SOCIAL_EMOCIONAL": "Socioemocional",
        "CONDUCTA_ADAPTATIVA": "Adaptativa",
    }

    def generar(self, evaluación) -> str:
        niño = evaluación.niño
        resultados = list(evaluación.resultados.all())
        diagnóstico = getattr(evaluación, "diagnóstico", None)
        items = list(evaluación.items.all())

        html_content = self._generar_html(
            niño, evaluación, resultados, diagnóstico, items
        )

        output_dir = tempfile.gettempdir()
        pdf_filename = (
            f"reporte_dayc2_{niño.nombre}_"
            f"{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        )
        pdf_path = os.path.join(output_dir, pdf_filename)

        try:
            from weasyprint import HTML

            HTML(string=html_content).write_pdf(pdf_path)
        except (ImportError, OSError) as exc:
            import logging

            logging.getLogger(__name__).error(
                "PDF generation failed for evaluation %s: %s",
                getattr(evaluación, "id", "?"),
                exc,
            )
            raise RuntimeError(f"PDF generation failed: {exc}") from exc

        return pdf_path

    def _generar_html(self, niño, evaluación, resultados, diagnóstico, items) -> str:
        gdq_values = [
            r.cociente_general_gdq for r in resultados if r.cociente_general_gdq
        ]
        gdq_global = sum(gdq_values) // len(gdq_values) if gdq_values else 0

        from src.api.evaluaciones.models import Evaluación

        evidencias = evaluación.evidencias.all()
        evidencias_count = evidencias.count()
        tipos_evidencia = {}
        for ev in evidencias:
            tipo_label = dict(ev.Tipo.choices).get(ev.type, ev.type)
            tipos_evidencia[tipo_label] = tipos_evidencia.get(tipo_label, 0) + 1

        evidencias_html = "<ul>"
        for k, v in tipos_evidencia.items():
            evidencias_html += f"<li>{k}: {v}</li>"
        evidencias_html += (
            "</ul>" if tipos_evidencia else "<p>No hay evidencias registradas.</p>"
        )

        informante = niño.nombre_informante or niño.padre_tutor or "No especificado"
        estado_label = dict(Evaluación.Estado.choices).get(
            evaluación.estado, evaluación.estado
        )
        modo_label = dict(Evaluación.ModoEvaluacion.choices).get(
            evaluación.modo_evaluacion, evaluación.modo_evaluacion
        )

        fecha_inicio = (
            evaluación.started_at.strftime("%d/%m/%Y %H:%M")
            if evaluación.started_at
            else "—"
        )
        fecha_completado = (
            evaluación.completed_at.strftime("%d/%m/%Y %H:%M")
            if evaluación.completed_at
            else "—"
        )

        resultados_ordenados = sorted(
            [r for r in resultados if r.área in self.AREA_ORDER],
            key=lambda r: self.AREA_ORDER.index(r.área),
        )

        concordancia = self._calcular_concordancia(items)

        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reporte DAYC-2 - {niño.nombre}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }}
        h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; font-size: 22px; }}
        h2 {{ color: #2980b9; margin-top: 30px; font-size: 17px; }}
        h3 {{ color: #34495e; font-size: 14px; }}
        .info-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px; }}
        .info-item strong {{ color: #2c3e50; }}
        .info-item {{ font-size: 13px; }}
        table {{ width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }}
        th, td {{ border: 1px solid #ddd; padding: 8px 10px; text-align: left; }}
        th {{ background-color: #3498db; color: white; font-weight: bold; }}
        tr:nth-child(even) {{ background-color: #f8f9fa; }}
        .chart-container {{ text-align: center; margin: 20px 0; }}
        .footer {{ margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #7f8c8d; text-align: center; }}
        .warning-box {{ background-color: #fff3cd; color: #856404; padding: 15px; border-left: 5px solid #ffeeba; margin: 20px 0; border-radius: 4px; font-size: 13px; }}
        .activities {{ background-color: #ecf0f1; padding: 15px; border-radius: 5px; font-size: 13px; }}
        .badge-pass {{ display: inline-block; background: #27ae60; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; }}
        .badge-fail {{ display: inline-block; background: #e74c3c; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; }}
        .badge-review {{ display: inline-block; background: #f39c12; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; }}
        .badge-na {{ display: inline-block; background: #95a5a6; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; font-weight: bold; }}
        .concordance-box {{ background: #eaf2f8; padding: 15px; border-radius: 5px; margin: 15px 0; font-size: 13px; }}
        .concordance-box .stat {{ font-weight: bold; color: #2980b9; }}
        .page-break {{ page-break-before: always; }}
    </style>
</head>
<body>
    <h1>Reporte de Evaluación DAYC-2 Semiasistida</h1>

    <div class="info-grid">
        <div class="info-item"><strong>Fecha de Reporte:</strong> {datetime.now().strftime('%d/%m/%Y')}</div>
        <div class="info-item"><strong>Estado de Sesión:</strong> {estado_label}</div>
        <div class="info-item"><strong>Nombre del Niño:</strong> {niño.nombre}</div>
        <div class="info-item"><strong>Fecha de Nacimiento:</strong> {niño.fecha_nacimiento.strftime('%d/%m/%Y')}</div>
        <div class="info-item"><strong>Edad Cronológica:</strong> {evaluación.edad_meses} meses</div>
        <div class="info-item"><strong>Código de Sesión:</strong> {evaluación.session_code}</div>
        <div class="info-item"><strong>Adulto Acompañante/Informante:</strong> {informante}</div>
        <div class="info-item"><strong>Modo de Evaluación:</strong> {modo_label}</div>
        <div class="info-item"><strong>Fecha de Inicio:</strong> {fecha_inicio}</div>
        <div class="info-item"><strong>Fecha de Finalización:</strong> {fecha_completado}</div>
    </div>

    <div class="warning-box">
        <strong>Nota Clínica:</strong> Esta evaluación fue realizada utilizando la plataforma semiasistida DAYC-2.
        Los resultados combinan interacciones digitales validadas automáticamente y observaciones clínicas directas.
    </div>

    <h2>Resultados Validados por Área</h2>
    <table>
        <tr>
            <th>Área</th>
            <th>Puntuación Directa</th>
            <th>Puntuación Estándar</th>
            <th>Percentil</th>
            <th>Interpretación</th>
            <th>Edad Equivalente</th>
            <th>GDQ</th>
        </tr>
"""
        for r in resultados_ordenados:
            html += f"""        <tr>
            <td>{self.AREA_LABELS.get(r.área, r.área)}</td>
            <td>{r.puntuación_directa}</td>
            <td>{r.puntuación_estándar or 'N/A'}</td>
            <td>{r.percentil or 'N/A'}</td>
            <td>{r.interpretación or 'N/A'}</td>
            <td>{r.edad_equivalente or 'N/A'}</td>
            <td>{r.cociente_general_gdq or 'N/A'}</td>
        </tr>
"""
        html += f"""    </table>

    <h3>Cociente de Desarrollo General (GDQ): {gdq_global}</h3>

    <h2>Gráfica de Puntuaciones Estándar por Área</h2>
    <div class="chart-container">
        {self._generar_chart_svg(resultados_ordenados)}
    </div>

    <h2>Validación de Resultados</h2>
    <div class="concordance-box">
        {self._generar_concordancia_html(concordancia)}
    </div>
"""
        if items:
            html += f"""    <div class="page-break"></div>
    <h2>Desglose de Ítems por Área</h2>
    {self._generar_items_html(items)}
"""

        html += f"""
    <h2>Resumen de Evidencias Recolectadas</h2>
    <p>El sistema ha registrado un total de {evidencias_count} evidencias objetivas durante la sesión infantil:</p>
    {evidencias_html}
"""

        if diagnóstico:
            html += f"""
    <h2>Resumen Narrativo Asistido</h2>
    <p>{diagnóstico.contenido}</p>

    <h2>Actividades de Estimulación Sugeridas</h2>
    <div class="activities">
"""
            for act in diagnóstico.actividades_estimulación:
                html += f"""        <p><strong>{act.get('nombre', 'Actividad')}</strong>: {act.get('descripción', '')} ({act.get('duración_minutos', 10)} min)</p>
"""
            html += """    </div>
"""

        html += """
    <div class="footer">
        <p><strong>Este documento es de uso exclusivamente clínico y como herramienta de apoyo.</strong></p>
        <p>Generado automáticamente por la Plataforma Semiasistida DAYC-2. La interpretación final de estos resultados debe ser realizada por un profesional de la salud cualificado y contextualizada con el historial clínico del paciente.</p>
    </div>
</body>
</html>"""

        return html

    def _generar_chart_svg(self, resultados) -> str:
        svg_w = 580
        svg_h = 270
        ml = 42
        mr = 10
        mt = 10
        mb = 42
        plot_w = svg_w - ml - mr
        plot_h = svg_h - mt - mb
        y_range = 160.0

        def y_pos(score):
            return mt + plot_h - (score / y_range * plot_h)

        lines = []
        y_ticks = [0, 40, 70, 100, 130, 160]
        for tick in y_ticks:
            y = y_pos(tick)
            is_ref = tick == 100
            lines.append(
                f'<line x1="{ml}" y1="{y:.1f}" x2="{svg_w - mr}" y2="{y:.1f}" '
                f'stroke="#ddd" stroke-width="{1.5 if is_ref else 1}" '
                f'stroke-dasharray="{is_ref and "6,4" or "3,3"}" />'
            )
            lines.append(
                f'<text x="{ml - 6}" y="{y + 4}" text-anchor="end" '
                f'font-size="10" fill="#666">{tick}</text>'
            )

        lines.append(
            f'<text x="{svg_w - mr + 2}" y="{y_pos(100) + 4}" '
            f'font-size="9" fill="#e74c3c">Promedio</text>'
        )

        n = len(resultados)
        if n == 0:
            return '<svg width="580" height="270" xmlns="http://www.w3.org/2000/svg"></svg>'

        slot_w = plot_w / n
        bar_w = min(int(slot_w * 0.55), 65)

        for i, r in enumerate(resultados):
            score = r.puntuación_estándar
            if score is None:
                continue
            color = self.AREA_COLORS.get(r.área, "#95a5a6")
            label = self.AREA_LABELS.get(r.área, r.área)

            cx = ml + slot_w * i + slot_w / 2
            bx = cx - bar_w / 2
            by = y_pos(score)
            bh = plot_h - (by - mt)

            lines.append(
                f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bar_w}" '
                f'height="{bh:.1f}" rx="3" fill="{color}" opacity="0.85" />'
            )
            lines.append(
                f'<text x="{cx:.1f}" y="{by - 6}" text-anchor="middle" '
                f'font-size="11" font-weight="bold" fill="#2c3e50">{score}</text>'
            )
            lines.append(
                f'<text x="{cx:.1f}" y="{svg_h - mb + 16}" text-anchor="middle" '
                f'font-size="10" fill="#555">{label}</text>'
            )

        svg = f'<svg width="{svg_w}" height="{svg_h}" xmlns="http://www.w3.org/2000/svg">\n'
        svg += "\n".join(f"        {line}" for line in lines)
        svg += "\n        </svg>"
        return svg

    def _calcular_concordancia(self, items) -> dict:
        con_sistema = 0
        con_final = 0
        coincidentes = 0
        corregidos = 0

        for item in items:
            if not item.system_result:
                continue
            con_sistema += 1
            if not item.final_result:
                continue
            con_final += 1
            if item.system_result == item.final_result:
                coincidentes += 1
            else:
                corregidos += 1

        concordancia = round((coincidentes / con_final * 100), 1) if con_final else 0

        return {
            "con_sistema": con_sistema,
            "con_final": con_final,
            "coincidentes": coincidentes,
            "corregidos": corregidos,
            "concordancia": concordancia,
        }

    def _generar_concordancia_html(self, c: dict) -> str:
        nivel = (
            "Alta"
            if c["concordancia"] >= 90
            else "Moderada" if c["concordancia"] >= 75 else "Revisión recomendada"
        )
        return f"""<p><strong>Resumen de validación psicólogo vs. sistema</strong></p>
        <p>Ítems con resultado del sistema: <span class="stat">{c["con_sistema"]}</span> |
        Ítems revisados por psicólogo: <span class="stat">{c["con_final"]}</span></p>
        <p>Coincidencias: <span class="stat">{c["coincidentes"]}</span> |
        Correcciones: <span class="stat">{c["corregidos"]}</span></p>
        <p>Concordancia: <span class="stat">{c["concordancia"]}%</span> ({nivel})</p>"""

    def _generar_items_html(self, items) -> str:
        from src.api.evaluaciones.models import EvaluacionItem

        modalidad_choices = dict(EvaluacionItem.Modalidad.choices)
        estado_choices = dict(EvaluacionItem.Estado.choices)

        items_por_area = defaultdict(list)
        for item in items:
            items_por_area[item.area].append(item)

        html = ""
        for area in self.AREA_ORDER:
            area_items = items_por_area.get(area, [])
            if not area_items:
                continue
            html += f"<h3>{self.AREA_LABELS.get(area, area)} ({len(area_items)} ítems)</h3>\n"
            html += (
                "<table>\n<tr>\n<th>Ítem</th>\n<th>Resultado</th>\n<th>Modalidad</th>\n"
            )
            html += "<th>Estado</th>\n<th>Requiere Revisión</th>\n</tr>\n"
            for item in area_items:
                res = item.final_result or item.system_result or "—"
                badge = self._resultado_badge(res)
                modalidad = modalidad_choices.get(item.modalidad, item.modalidad)
                estado = estado_choices.get(item.estado, item.estado)
                revision = "Sí" if item.requires_review else "No"
                html += (
                    f"<tr>\n<td>{item.item_id}</td>\n"
                    f"<td>{badge}</td>\n"
                    f"<td>{modalidad}</td>\n"
                    f"<td>{estado}</td>\n"
                    f"<td>{revision}</td>\n</tr>\n"
                )
            html += "</table>\n"
        return html

    def _resultado_badge(self, resultado: str) -> str:
        if resultado == "PASS":
            return '<span class="badge-pass">PASS</span>'
        if resultado == "FAIL":
            return '<span class="badge-fail">FAIL</span>'
        if resultado in ("INCONCLUSIVE",):
            return '<span class="badge-review">INCONCLUSO</span>'
        if resultado == "NOT_ADMINISTERED":
            return '<span class="badge-na">N/A</span>'
        return f"<span>{resultado}</span>"


reporte_generator = ReporteGenerator()
