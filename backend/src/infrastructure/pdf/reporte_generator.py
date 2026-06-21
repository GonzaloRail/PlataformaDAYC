"""PDF Report Generator for DAYC-2 evaluations"""
import os
import tempfile
from typing import Optional
from datetime import datetime


class ReporteGenerator:
    """Generate PDF reports for DAYC-2 evaluations"""
    
    def generar(self, evaluación) -> str:
        """Generate PDF report for an evaluation
        
        Note: This is a placeholder. For production, integrate with:
        - WeasyPrint (recommended)
        - ReportLab
        - FPDF
        
        The PDF should include:
        - Header with clinic info and evaluation date
        - Child demographics (name, age)
        - Results table by area
        - Performance charts (as images)
        - Conversion tables used
        - AI diagnosis (or edited version)
        - Stimulation activities
        - Professional footer
        """
        
        niño = evaluación.niño
        resultados = list(evaluación.resultados.all())
        diagnóstico = getattr(evaluación, 'diagnóstico', None)
        
        html_content = self._generar_html(niño, evaluación, resultados, diagnóstico)
        
        output_dir = tempfile.gettempdir()
        pdf_filename = f"reporte_dayc2_{niño.nombre}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        pdf_path = os.path.join(output_dir, pdf_filename)

        try:
            from weasyprint import HTML
            HTML(string=html_content).write_pdf(pdf_path)
        except Exception:
            with open(pdf_path, 'wb') as f:
                f.write(html_content.encode('utf-8'))
        
        return pdf_path
    
    def _generar_html(self, niño, evaluación, resultados, diagnóstico) -> str:
        """Generate HTML content for the report"""
        
        gdq_values = [r.cociente_general_gdq for r in resultados if r.cociente_general_gdq]
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
        evidencias_html += "</ul>" if tipos_evidencia else "<p>No hay evidencias registradas.</p>"

        informante = niño.nombre_informante or niño.padre_tutor or 'No especificado'
        estado_label = dict(Evaluación.Estado.choices).get(evaluación.estado, evaluación.estado)

        html = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reporte DAYC-2 - {niño.nombre}</title>
    <style>
        body {{ font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }}
        h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #2980b9; margin-top: 30px; }}
        h3 {{ color: #34495e; }}
        .info-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f9f9f9; padding: 15px; border-radius: 8px; }}
        .info-item strong {{ color: #2c3e50; }}
        table {{ width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }}
        th, td {{ border: 1px solid #ddd; padding: 12px; text-align: left; }}
        th {{ background-color: #3498db; color: white; }}
        tr:nth-child(even) {{ background-color: #f2f2f2; }}
        .footer {{ margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #7f8c8d; text-align: center; }}
        .warning-box {{ background-color: #fff3cd; color: #856404; padding: 15px; border-left: 5px solid #ffeeba; margin: 20px 0; border-radius: 4px; }}
        .activities {{ background-color: #ecf0f1; padding: 15px; border-radius: 5px; }}
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
        <div class="info-item"><strong>Adulto Acompañante/Informante:</strong> {informante}</div>
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
            <th>Edad Equivalente</th>
            <th>GDQ</th>
        </tr>
"""
        for r in resultados:
            html += f"""        <tr>
            <td>{r.área}</td>
            <td>{r.puntuación_directa}</td>
            <td>{r.puntuación_estándar or 'N/A'}</td>
            <td>{r.percentil or 'N/A'}</td>
            <td>{r.edad_equivalente or 'N/A'}</td>
            <td>{r.cociente_general_gdq or 'N/A'}</td>
        </tr>
"""
        html += f"""    </table>
    
    <h3>Cociente de Desarrollo General (GDQ): {gdq_global}</h3>
    
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
        
        html += f"""
    <div class="footer">
        <p><strong>Este documento es de uso exclusivamente clínico y como herramienta de apoyo.</strong></p>
        <p>Generado automáticamente por la Plataforma Semiasistida DAYC-2. La interpretación final de estos resultados debe ser realizada por un profesional de la salud cualificado y contextualizada con el historial clínico del paciente.</p>
    </div>
</body>
</html>"""
        
        return html


reporte_generator = ReporteGenerator()
