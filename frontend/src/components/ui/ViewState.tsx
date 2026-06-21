import { Button } from './Button'
import './ViewState.css'

interface ViewStateProps {
  kind: 'loading' | 'empty' | 'error'
  message: string
  onRetry?: () => void
}

export function ViewState({ kind, message, onRetry }: ViewStateProps) {
  return (
    <div className={`view-state view-state-${kind}`}>
      <p>{message}</p>
      {kind === 'error' && onRetry && (
        <Button variant="secondary" onClick={onRetry}>Reintentar</Button>
      )}
    </div>
  )
}

export default ViewState
