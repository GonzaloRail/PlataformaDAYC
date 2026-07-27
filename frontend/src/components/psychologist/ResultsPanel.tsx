import type { Resultado } from '@/types'
import './ResultsPanel.css'

interface ResultsPanelProps {
  resultados: Resultado[]
  gdqGlobal: number | null
}

type Tone = 'success' | 'warning' | 'danger' | 'neutral'

function interpretationTone(text: string | null | undefined): Tone {
  if (!text) return 'neutral'
  const t = text.toLowerCase()
  if (t.includes('muy superior') || t.includes('superior') || t.includes('por encima')) return 'success'
  if (t.includes('promedio') && !t.includes('por debajo')) return 'success'
  if (t.includes('por debajo') || t.includes('bajo')) return 'warning'
  if (t.includes('muy bajo')) return 'danger'
  return 'neutral'
}

function gdqTone(score: number | null): Tone {
  if (score == null) return 'neutral'
  if (score >= 111) return 'success'
  if (score >= 90) return 'success'
  if (score >= 80) return 'warning'
  if (score >= 70) return 'warning'
  return 'danger'
}

export function ResultsPanel({ resultados, gdqGlobal }: ResultsPanelProps) {
  return (
    <section className="results-panel" aria-label="Resultados de la evaluación">
      <header className="results-panel-header">
        <div>
          <h2>Resultados validados</h2>
          <p className="results-panel-subtitle">Puntuaciones calculadas a partir de baremos DAYC-2.</p>
        </div>
        <div className={`results-gdq tone-${gdqTone(gdqGlobal)}`}>
          <span className="results-gdq-label">GDQ Global</span>
          <strong>{gdqGlobal ?? '—'}</strong>
        </div>
      </header>

      <div className="results-grid">
        {resultados.map((r) => {
          const interpretacion = r.interpretacion ?? r.tempScore?.toString() ?? null
          const tone = interpretationTone(interpretacion)
          return (
            <article key={r.id || r.area} className={`results-card tone-${tone}`}>
              <header>
                <h3>{r.area}</h3>
                <span className={`results-badge tone-${tone}`}>{interpretacion ?? 'Sin datos'}</span>
              </header>
              <dl>
                <div>
                  <dt>Puntuación Directa</dt>
                  <dd>{r.puntuacion_directa ?? '—'}</dd>
                </div>
                <div>
                  <dt>Puntuación Estándar</dt>
                  <dd>{r.puntuacion_estandar ?? '—'}</dd>
                </div>
                <div>
                  <dt>Percentil</dt>
                  <dd>{r.percentil ?? '—'}</dd>
                </div>
                <div>
                  <dt>Edad Equivalente</dt>
                  <dd>{r.edad_equivalente ?? '—'}</dd>
                </div>
              </dl>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ResultsPanel
