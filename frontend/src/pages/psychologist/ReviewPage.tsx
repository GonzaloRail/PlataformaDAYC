import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, ViewState } from '@/components/ui'
import { EvidenceViewer } from '@/components/evidence/EvidenceViewer'
import { ResultsPanel } from '@/components/psychologist/ResultsPanel'
import evaluacionesApi from '@/services/evaluacionesApi'
import type { EvaluacionItem, ReviewOverview, ScoreComparison, Resultado } from '@/types'
import './ReviewPage.css'

const resultLabel: Record<string, string> = {
  PASS: 'Pasó',
  FAIL: 'No pasó',
  INCONCLUSIVE: 'Inconcluso',
  NOT_ADMINISTERED: 'No administrado',
}

type ReviewOutcome = EvaluacionItem['final_result']

function getStatusKey(item: EvaluacionItem): { key: string; label: string; tone: 'pending' | 'pass' | 'fail' | 'inconclusive' | 'na' } {
  if (item.estado === 'REVIEWED' && item.final_result) {
    switch (item.final_result) {
      case 'PASS': return { key: 'pass', label: 'Pasó', tone: 'pass' }
      case 'FAIL': return { key: 'fail', label: 'No pasó', tone: 'fail' }
      case 'INCONCLUSIVE': return { key: 'inconclusive', label: 'Inconcluso', tone: 'inconclusive' }
      case 'NOT_ADMINISTERED': return { key: 'na', label: 'No adm.', tone: 'na' }
    }
  }
  return { key: 'pending', label: 'Pendiente', tone: 'pending' }
}

export function ReviewPage() {
  const { evaluacionId } = useParams<{ evaluacionId: string }>()
  const [overview, setOverview] = useState<ReviewOverview | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [comparison, setComparison] = useState<ScoreComparison | null>(null)
  const [resultados, setResultados] = useState<Resultado[]>([])
  const [gdqGlobal, setGdqGlobal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadReview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluacionId])

  const pendingItems = useMemo(() => {
    if (!overview) return []
    return overview.items.filter((i) => i.estado === 'NEEDS_REVIEW')
  }, [overview])

  const selectedItem = useMemo(() => {
    if (!overview) return null
    if (selectedItemId) {
      const found = overview.items.find((i) => i.item_id === selectedItemId)
      if (found) return found
    }
    return pendingItems[0] || overview.items[0] || null
  }, [overview, selectedItemId, pendingItems])

  useEffect(() => {
    if (selectedItem) {
      setSelectedItemId(selectedItem.item_id)
      setNotes(selectedItem.psychologist_notes || '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem?.item_id])

  const loadReview = async () => {
    if (!evaluacionId) return
    setLoading(true)
    setError(null)
    try {
      const data = await evaluacionesApi.reviewOverview(evaluacionId)
      setOverview(data)
      try {
        const cmp = await evaluacionesApi.scoreComparison(evaluacionId)
        setComparison(cmp)
      } catch {
        setComparison(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la revisión')
    } finally {
      setLoading(false)
    }
  }

  const pickNextPending = (items: ReviewOverview['items'], currentId: string) => {
    const idx = items.findIndex((i) => i.item_id === currentId)
    if (idx === -1) return
    for (let i = idx + 1; i < items.length; i += 1) {
      if (items[i].estado === 'NEEDS_REVIEW') {
        setSelectedItemId(items[i].item_id)
        return
      }
    }
    for (let i = 0; i < idx; i += 1) {
      if (items[i].estado === 'NEEDS_REVIEW') {
        setSelectedItemId(items[i].item_id)
        return
      }
    }
    setSelectedItemId(items[idx].item_id)
  }

  const review = async (finalResult: ReviewOutcome) => {
    if (!evaluacionId || !selectedItem || !finalResult) return
    setSaving(true)
    setError(null)
    try {
      await evaluacionesApi.reviewItem(evaluacionId, selectedItem.item_id, {
        final_result: finalResult,
        psychologist_notes: notes,
      })
      const fresh = await evaluacionesApi.reviewOverview(evaluacionId)
      setOverview(fresh)
      try {
        const cmp = await evaluacionesApi.scoreComparison(evaluacionId)
        setComparison(cmp)
      } catch {
        setComparison(null)
      }
      pickNextPending(fresh.items, selectedItem.item_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la revisión')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (!evaluacionId) return
    const handler = (event: KeyboardEvent) => {
      if (saving) return
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) return
      if (!selectedItem) return
      if (event.key === 'p' || event.key === 'P') void review('PASS')
      else if (event.key === 'f' || event.key === 'F') void review('FAIL')
      else if (event.key === 'i' || event.key === 'I') void review('INCONCLUSIVE')
      else if (event.key === 'n' || event.key === 'N') void review('NOT_ADMINISTERED')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluacionId, selectedItem, saving, notes, overview])

  const completeReview = async () => {
    if (!evaluacionId) return
    setSaving(true)
    try {
      const res = await evaluacionesApi.completeReview(evaluacionId) as { evaluacion?: unknown; resultados?: Resultado[]; gdq_global?: number | null }
      if (res?.resultados) {
        setResultados(res.resultados)
        setGdqGlobal(res.gdq_global ?? null)
      }
      await loadReview()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo finalizar la revisión')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <ViewState kind="loading" message="Cargando revisión..." />
  if (error && !overview) return <ViewState kind="error" message={error} onRetry={() => void loadReview()} />
  if (!overview) return <ViewState kind="empty" message="No hay revisión disponible" />

  const reviewedCount = overview.reviewed_count
  const pendingCount = overview.pending_count
  const totalCount = overview.items.length
  const progressPct = totalCount === 0 ? 0 : Math.round((reviewedCount / totalCount) * 100)

  return (
    <section className="review-page">
      <header className="review-header">
        <div>
          <p className="review-kicker">Revisión profesional</p>
          <h1>Validación de evidencias</h1>
          <p>Confirma o corrige el resultado preliminar del sistema antes del cálculo validado.</p>
        </div>
        <div className="review-header-actions">
          <span className="review-progress-label">
            {reviewedCount} de {totalCount} revisados · {progressPct}%
          </span>
          <Button onClick={completeReview} isLoading={saving} disabled={pendingCount > 0}>
            Finalizar revisión
          </Button>
        </div>
      </header>

      {error && <div className="review-error">{error}</div>}

      <div className="review-summary">
        <Card padding="sm"><strong>{overview.items.length}</strong><span>Ítems registrados</span></Card>
        <Card padding="sm"><strong>{overview.pending_count}</strong><span>Pendientes</span></Card>
        <Card padding="sm"><strong>{overview.reviewed_count}</strong><span>Revisados</span></Card>
        <Card padding="sm"><strong>{comparison?.concordancia_porcentual ?? 0}%</strong><span>Concordancia</span></Card>
      </div>

      <div className="review-layout">
        <Card className="review-list" padding="sm">
          {overview.items.map((item) => {
            const status = getStatusKey(item)
            return (
              <button
                type="button"
                key={item.id}
                className={`review-item-row tone-${status.tone}${selectedItem?.item_id === item.item_id ? ' active' : ''}`}
                onClick={() => setSelectedItemId(item.item_id)}
              >
                <span className="review-item-id">{item.item_id}</span>
                <small>{item.area}</small>
                <em className={`review-status-badge tone-${status.tone}`}>{status.label}</em>
              </button>
            )
          })}
        </Card>

        <Card className="review-detail" padding="lg">
          {selectedItem ? (
            <>
              <p className="review-kicker">{selectedItem.area}</p>
              <h2>{selectedItem.item_id}</h2>
              <div className="review-result-grid">
                <div><span>Sistema</span><strong>{selectedItem.system_result ? resultLabel[selectedItem.system_result] : 'Sin resultado'}</strong></div>
                <div><span>Confianza</span><strong>{selectedItem.system_confidence ?? '-'}</strong></div>
                <div><span>Final</span><strong>{selectedItem.final_result ? resultLabel[selectedItem.final_result] : 'Pendiente'}</strong></div>
                <div><span>Modalidad</span><strong>{selectedItem.modalidad}</strong></div>
              </div>

              <EvidenceViewer evaluacionId={evaluacionId!} itemId={selectedItem.item_id} />

              <label className="review-notes-label" htmlFor="review-notes">Observación profesional</label>
              <textarea id="review-notes" className="review-notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
              <div className="review-actions">
                <Button onClick={() => void review('PASS')} isLoading={saving}>Pasó (P)</Button>
                <Button variant="danger" onClick={() => void review('FAIL')} isLoading={saving}>No pasó (F)</Button>
                <Button variant="secondary" onClick={() => void review('INCONCLUSIVE')} isLoading={saving}>Inconcluso (I)</Button>
                <Button variant="ghost" onClick={() => void review('NOT_ADMINISTERED')} isLoading={saving}>No administrado (N)</Button>
              </div>
            </>
          ) : (
            <ViewState kind="empty" message="Selecciona un ítem para revisar" />
          )}
        </Card>
      </div>

      {resultados.length > 0 && (
        <ResultsPanel resultados={resultados} gdqGlobal={gdqGlobal} />
      )}
    </section>
  )
}

export default ReviewPage
