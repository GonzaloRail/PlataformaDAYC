import { type FormEvent } from 'react'
import { Button, Card, Input } from '@/components/ui'
import { useSessionJoin } from '@/hooks/useSessionJoin'
import './SessionEntry.css'

export function SessionEntry() {
  const { sessionCode, setSessionCode, invitationCode, setInvitationCode, isLoading, error, openSession } = useSessionJoin()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await openSession()
  }

  return (
    <main className="session-entry">
      <section className="session-entry-content">
        <div className="session-logo" aria-hidden="true">DAYC</div>
        <h1 className="session-title">Evaluación DAYC-2</h1>
        <p className="session-subtitle">Ingresa los códigos de sesión e invitación que te compartió tu psicólogo.</p>

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
              <Input
                className="session-input"
                label="Código de invitación"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
                placeholder="Código compartido por el profesional"
                autoComplete="off"
              />
              {error && <p className="session-error">{error}</p>}
            </div>
            <Button type="submit" size="lg" fullWidth isLoading={isLoading} disabled={sessionCode.trim().length < 6 || !invitationCode.trim()}>
              Abrir sesión
            </Button>
          </form>
        </Card>

        <p className="session-help">Si no tienes código, solicita ayuda al evaluador.</p>
      </section>
    </main>
  )
}

export default SessionEntry
