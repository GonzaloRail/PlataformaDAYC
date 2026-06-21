import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, ViewState } from '../../components/ui'
import { EvidenceViewer } from '../../components/evidence/EvidenceViewer'
import evaluacionesApi from '../../services/evaluacionesApi'
import type { EvaluacionItem, ReviewOverview, ScoreComparison } from '../../types'
import './ReviewPage.css'

const resultLabel: Record<string, string> = {
  PASS: 'Pasó',
  FAIL: 'No pasó',
  INCONCLUSIVE: 'Inconcluso',
  NOT_ADMINISTERED: 'No administrado',
}

export function ReviewPage() {
  const { evaluacionId } = useParams<{ evaluacionId: string }>()
  const [overview, setOverview] = useState<ReviewOverview | null>(null)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [comparison, setComparison] = useState<ScoreComparison | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadReview()
  }, [evaluacionId])

  const selectedItem = useMemo(() => {
    if (!overview) return null
    return overview.items.find((item) => item.item_id === selectedItemId) || overview.items[0] || null
  }, [overview, selectedItemId])

  useEffect(() => {
    if (selectedItem) {
      setSelectedItemId(selectedItem.item_id)
      setNotes(selectedItem.psychologist_notes || '')
    }
  }, [selectedItem?.item_id])

  const loadReview = async () => {
    if (!evaluacionId) return
    setLoading(true)
    setError(null)
    try {
      const data = await evaluacionesApi.reviewOverview(evaluacionId)
      setOverview(data)
      if (!selectedItemId && data.items.length > 0) setSelectedItemId(data.items[0].item_id)
      try {
        setComparison(await evaluacionesApi.scoreComparison(evaluacionId))
      } catch {
        setComparison(null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar la revisión')
    } finally {
      setLoading(false)
    }
  }

  const review = async (finalResult: EvaluacionItem['final_result']) => {
    if (!evaluacionId || !selectedItem || !finalResult) return
    setSaving(true)
    setError(null)
    try {
      await evaluacionesApi.reviewItem(evaluacionId, selectedItem.item_id, {
        final_result: finalResult,
        psychologist_notes: notes,
      })
      await loadReview()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar la revisión')
    } finally {
      setSaving(false)
    }
  }

  const completeReview = async () => {
    if (!evaluacionId) return
    setSaving(true)
    try {
      await evaluacionesApi.completeReview(evaluacionId)
      await evaluacionesApi.scoreValidated(evaluacionId)
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

  return (
    <section className="review-page">
      <header className="review-header">
        <div>
          <p className="review-kicker">Revisión profesional</p>
          <h1>Validación de evidencias</h1>
          <p>Confirma o corrige el resultado preliminar del sistema antes del cálculo validado.</p>
        </div>
        <Button onClick={completeReview} isLoading={saving} disabled={overview.pending_count > 0}>
          Finalizar revisión
        </Button>
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
          {overview.items.map((item) => (
            <button
              key={item.id}
              className={`review-item-row ${selectedItem?.item_id === item.item_id ? 'active' : ''}`}
              onClick={() => setSelectedItemId(item.item_id)}
            >
              <span>{item.item_id}</span>
              <small>{item.area}</small>
              <em>{item.estado}</em>
            </button>
          ))}
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
                <Button onClick={() => void review('PASS')} isLoading={saving}>Pasó</Button>
                <Button variant="danger" onClick={() => void review('FAIL')} isLoading={saving}>No pasó</Button>
                <Button variant="secondary" onClick={() => void review('INCONCLUSIVE')} isLoading={saving}>Inconcluso</Button>
                <Button variant="ghost" onClick={() => void review('NOT_ADMINISTERED')} isLoading={saving}>No administrado</Button>
              </div>
            </>
          ) : (
            <ViewState kind="empty" message="Selecciona un ítem para revisar" />
          )}
        </Card>
      </div>
    </section>
  )
}

export default ReviewPage
