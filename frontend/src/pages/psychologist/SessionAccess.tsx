import { Button, Card, Input } from '@/components/ui'
import { useSessionJoin } from '@/hooks/useSessionJoin'
import './SessionAccess.css'

export function SessionAccess() {
  const { sessionCode, setSessionCode, isLoading, error, openSession } = useSessionJoin()

  return (
    <section className="session-access-page">
      <div className="session-access-hero">
        <p className="session-access-kicker">Entrada asistida</p>
        <h1>Abrir sesión por código</h1>
        <p>Usa esta vista dentro del portal para buscar el código compartido y abrir directamente la pantalla del niño o del adulto acompañante.</p>
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
        {error && <p className="session-access-error">{error}</p>}
        <div className="session-access-actions">
          <Button type="button" size="lg" isLoading={isLoading} disabled={sessionCode.trim().length < 6} onClick={() => void openSession('child')}>
            Abrir pantalla del niño
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
