import { useEffect, useRef, useState } from 'react'
import type { EvaluationTask } from '../../types'
import { DigitalActivityShell } from '../minijuegos/DigitalActivityShell'
import { PedagogicalMascot } from './PedagogicalMascot'
import './DigitalActivityExperience.css'

interface DigitalActivityExperienceProps {
  task: EvaluationTask
  areaLabel: string
  onComplete: (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', confidence?: number, rawData?: any) => void
  introDurationMs?: number
}

export function DigitalActivityExperience({
  task,
  areaLabel,
  onComplete,
  introDurationMs = 4500,
}: DigitalActivityExperienceProps) {
  const [phase, setPhase] = useState<'intro' | 'activity'>('intro')
  const previousItemRef = useRef<string | null>(null)
  const question = task.pregunta || task.instrucciones || 'Escucha al adulto y sigue la actividad.'

  useEffect(() => {
    if (previousItemRef.current !== task.item_id) {
      previousItemRef.current = task.item_id
      setPhase('intro')
    }

    const timeout = window.setTimeout(() => setPhase('activity'), introDurationMs)
    return () => window.clearTimeout(timeout)
  }, [task.item_id, introDurationMs])

  if (phase === 'intro') {
    return (
      <section className="digital-experience-intro" aria-label="Presentacion de la actividad">
        <div className="digital-intro-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <PedagogicalMascot className="digital-intro-mascot" />
        <div className="digital-intro-copy">
          <p>{areaLabel}{task.numero_item ? ` · Item ${task.numero_item}` : ''}</p>
          <span>Ahora vamos a hacer esto:</span>
          <h1>{question}</h1>
        </div>
        <div className="digital-intro-progress" aria-hidden="true" />
      </section>
    )
  }

  return (
    <section className="digital-experience-stage" aria-label="Actividad digital">
      <header className="digital-stage-header">
        <div>
          <p>{areaLabel}{task.numero_item ? ` · Item ${task.numero_item}` : ''}</p>
          <h1>{question}</h1>
        </div>
      </header>

      <div className="digital-stage-body">
        <DigitalActivityShell task={task} onComplete={onComplete} />
      </div>
    </section>
  )
}

export default DigitalActivityExperience
