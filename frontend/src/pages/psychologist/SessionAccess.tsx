import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'
import api from '../../services/api'
import './SessionAccess.css'

export function SessionAccess() {
  const [sessionCode, setSessionCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const openSession = async (target: 'child' | 'adult') => {
    const normalizedCode = sessionCode.trim().toUpperCase()
    if (normalizedCode.length < 6) return

    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/evaluaciones/join/', { session_code: normalizedCode })
      navigate(target === 'adult' ? `/adult/session/${normalizedCode}` : `/child/evaluation/${normalizedCode}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Codigo de sesion no valido o evaluacion no disponible')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="session-access-page">
      <div className="session-access-hero">
        <p className="session-access-kicker">Entrada asistida</p>
        <h1>Abrir sesion por codigo</h1>
        <p>Usa esta vista dentro del portal para buscar el codigo compartido y abrir directamente la pantalla del nino o del adulto acompanante.</p>
      </div>

      <Card className="session-access-card" padding="lg">
        <div className="session-access-code-mark" aria-hidden="true">DAYC</div>
        <Input
          className="session-access-input"
          label="Codigo de sesion"
          value={sessionCode}
          onChange={(event) => setSessionCode(event.target.value.toUpperCase())}
          placeholder="ABC123"
          maxLength={6}
          autoComplete="off"
          autoFocus
        />
        {error && <p className="session-access-error">{error}</p>}
        <div className="session-access-actions">
          <Button type="button" size="lg" isLoading={isLoading} disabled={sessionCode.trim().length < 6} onClick={() => void openSession('child')}>
            Abrir pantalla del nino
          </Button>
          <Button type="button" variant="secondary" size="lg" disabled={sessionCode.trim().length < 6 || isLoading} onClick={() => void openSession('adult')}>
            Abrir pantalla del adulto
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default SessionAccess
