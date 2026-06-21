import { useEffect, useState } from 'react'
import { Card, ViewState } from '../../components/ui'
import api from '../../services/api'
import './MetricsDashboard.css'

interface ThesisMetrics {
  evaluaciones_totales: number
  evaluaciones_completadas: number
  concordancia_porcentual: number
  tasa_automatizacion: number
  items_corregidos: number
  items_autovalidados: number
  duracion_promedio_minutos: number
}

const fallbackMetrics: ThesisMetrics = {
  evaluaciones_totales: 0,
  evaluaciones_completadas: 0,
  concordancia_porcentual: 0,
  tasa_automatizacion: 0,
  items_corregidos: 0,
  items_autovalidados: 0,
  duracion_promedio_minutos: 0,
}

export function MetricsDashboard() {
  const [metrics, setMetrics] = useState<ThesisMetrics>(fallbackMetrics)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadMetrics()
  }, [])

  const loadMetrics = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api.get<ThesisMetrics>('/api/metricas/tesis/')
      setMetrics(data)
    } catch (err) {
      setMetrics(fallbackMetrics)
      setError(err instanceof Error ? err.message : 'No se pudieron cargar métricas de tesis')
    } finally {
      setIsLoading(false)
    }
  }

  const completionRate = metrics.evaluaciones_totales > 0 
    ? Math.round((metrics.evaluaciones_completadas / metrics.evaluaciones_totales) * 100) 
    : 0

  return (
    <section className="metrics-dashboard">
      <header className="metrics-header">
        <h1>Métricas de investigación</h1>
        <p>Seguimiento de uso, finalización, duración y fallback de las evaluaciones DAYC-2.</p>
      </header>

      {error && <div className="metrics-error">{error}</div>}

      {isLoading ? (
        <ViewState kind="loading" message="Cargando métricas de tesis..." />
      ) : (
        <>
          <div className="metrics-summary">
            <Card className="metric-card"><h3>{metrics.evaluaciones_totales}</h3><p>Evaluaciones creadas</p></Card>
            <Card className="metric-card"><h3>{metrics.evaluaciones_completadas}</h3><p>Completadas / En revisión</p></Card>
            <Card className="metric-card"><h3>{completionRate}%</h3><p>Tasa de finalización</p></Card>
            <Card className="metric-card"><h3>{metrics.duracion_promedio_minutos}min</h3><p>Duración promedio sesión</p></Card>
          </div>

          <div className="metrics-summary" style={{ marginTop: '20px' }}>
            <Card className="metric-card"><h3>{metrics.concordancia_porcentual}%</h3><p>Concordancia IA vs Profesional</p></Card>
            <Card className="metric-card"><h3>{metrics.tasa_automatizacion}%</h3><p>Tasa de automatización de ítems</p></Card>
            <Card className="metric-card"><h3>{metrics.items_autovalidados}</h3><p>Ítems auto-validados</p></Card>
            <Card className="metric-card"><h3>{metrics.items_corregidos}</h3><p>Ítems corregidos</p></Card>
          </div>
        </>
      )}
    </section>
  )
}

export default MetricsDashboard
