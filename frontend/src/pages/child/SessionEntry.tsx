import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input } from '../../components/ui'
import api from '../../services/api'
import './SessionEntry.css'

export function SessionEntry() {
  const [sessionCode, setSessionCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await openSession('child')
  }

  const openSession = async (target: 'child' | 'adult') => {
    const normalizedCode = sessionCode.trim().toUpperCase()
    if (!normalizedCode) return

    setIsLoading(true)
    setError(null)
    try {
      await api.post('/api/evaluaciones/join/', { session_code: normalizedCode })
      navigate(target === 'adult' ? `/adult/session/${normalizedCode}` : `/child/evaluation/${normalizedCode}`)
    } catch {
      setError('Código de sesión no válido o evaluación no disponible')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="session-entry">
      <section className="session-entry-content">
        <div className="session-logo" aria-hidden="true">DAYC</div>
        <h1 className="session-title">Evaluación DAYC-2</h1>
        <p className="session-subtitle">Ingresa el código que te compartió tu psicólogo.</p>

        <Card className="session-card" padding="lg">
          <form onSubmit={handleSubmit}>
            <div className="session-input-group">
              <Input
                className="session-input"
                label="Código de sesión"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                maxLength={6}
                autoFocus
                autoComplete="off"
              />
              {error && <p className="session-error">{error}</p>}
            </div>
            <Button type="submit" size="lg" fullWidth isLoading={isLoading} disabled={sessionCode.trim().length < 6}>
              Abrir pantalla del niño
            </Button>
            <button
              type="button"
              className="session-adult-link"
              onClick={() => void openSession('adult')}
              disabled={sessionCode.trim().length < 6 || isLoading}
            >
              Abrir pantalla del adulto
            </button>
          </form>
        </Card>

        <p className="session-help">Si no tienes código, solicita ayuda al evaluador.</p>
      </section>
    </main>
  )
}

export default SessionEntry
