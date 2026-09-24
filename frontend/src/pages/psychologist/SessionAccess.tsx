import { Button, Card, Input } from '@/components/ui'
import { useSessionJoin } from '@/hooks/useSessionJoin'
import './SessionAccess.css'

export function SessionAccess() {
  const { sessionCode, setSessionCode, invitationCode, setInvitationCode, isLoading, error, openSession } = useSessionJoin()

  return (
    <section className="session-access-page">
      <div className="session-access-hero">
        <p className="session-access-kicker">Entrada asistida</p>
        <h1>Abrir sesión por código</h1>
        <p>Usa los códigos de sesión e invitación emitidos por el profesional. La invitación determina la pantalla autorizada.</p>
      </div>

      <Card className="session-access-card" padding="lg">
        <div className="session-access-code-mark" aria-hidden="true">DAYC</div>
        <Input
          className="session-access-input"
          label="Código de sesión"
          value={sessionCode}
          onChange={(event) => setSessionCode(event.target.value.toUpperCase())}
          placeholder="ABC123"
          maxLength={6}
          autoComplete="off"
          autoFocus
        />
        <Input
          className="session-access-input"
          label="Código de invitación"
          value={invitationCode}
          onChange={(event) => setInvitationCode(event.target.value)}
          placeholder="Código compartido por el profesional"
          autoComplete="off"
        />
        {error && <p className="session-access-error">{error}</p>}
        <div className="session-access-actions">
          <Button type="button" size="lg" isLoading={isLoading} disabled={sessionCode.trim().length < 6 || !invitationCode.trim()} onClick={() => void openSession()}>
            Abrir sesión autorizada
          </Button>
        </div>
      </Card>
    </section>
  )
}

export default SessionAccess
