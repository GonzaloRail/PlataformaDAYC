import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { EvaluationTask } from '@/types'
import { EvidenceOrchestrator } from '@/components/evidence/EvidenceOrchestrator'
import type { EvidenceSink } from '@/components/evidence/EvidenceSink'
import { DigitalActivityShell } from '@/components/minijuegos/DigitalActivityShell'
import { PedagogicalMascot } from '@/components/child/PedagogicalMascot'
import './DigitalActivityExperience.css'

interface DigitalActivityExperienceProps {
  task: EvaluationTask
  areaLabel: string
  onComplete: (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', confidence?: number, rawData?: any) => void
  sessionToken?: string
  evidenceSink?: EvidenceSink
  introDurationMs?: number
}

export function DigitalActivityExperience({
  task,
  areaLabel,
  onComplete,
  sessionToken,
  evidenceSink,
  introDurationMs = 4500,
}: DigitalActivityExperienceProps) {
  const [phase, setPhase] = useState<'intro' | 'activity'>('intro')
  const [showCompletedBanner, setShowCompletedBanner] = useState(false)
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousItemRef = useRef<string | null>(null)
  const question = task.pregunta || task.instrucciones || 'Escucha al adulto y sigue la actividad.'

  useEffect(() => {
    if (previousItemRef.current !== task.item_id) {
      previousItemRef.current = task.item_id
      setPhase('intro')
      setShowCompletedBanner(false)
    }

    const timeout = window.setTimeout(() => setPhase('activity'), introDurationMs)
    return () => window.clearTimeout(timeout)
  }, [task.item_id, introDurationMs])

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) {
        clearTimeout(bannerTimerRef.current)
      }
    }
  }, [])

  const completeActivity = (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', confidence?: number, rawData?: any) => {
    setShowCompletedBanner(true)
    bannerTimerRef.current = setTimeout(() => setShowCompletedBanner(false), 4000)
    onComplete(resultado, confidence, rawData)
  }

  if (phase === 'intro') {
    return (
      <section className="digital-experience-intro" aria-label="Presentacion de la actividad">
        <div className="digital-intro-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <PedagogicalMascot className="digital-intro-mascot" animation="talking" />
        <div className="digital-intro-copy">
          <p>{areaLabel}{task.numero_item ? ` · Item ${task.numero_item}` : ''}</p>
          <span>Ahora vamos a hacer esto:</span>
          <h1>{question}</h1>
        </div>
        <div className="digital-intro-progress" style={{ '--digital-intro-duration': `${introDurationMs}ms` } as CSSProperties} aria-hidden="true" />
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
        <EvidenceOrchestrator
          key={task.item_id}
          task={task}
          sessionToken={sessionToken}
          sink={evidenceSink}
        >
          <DigitalActivityShell task={task} onComplete={completeActivity} />
        </EvidenceOrchestrator>

        {showCompletedBanner && (
          <div className="digital-evidence-banner" role="status" aria-live="polite">
            <div className="digital-banner-icon" aria-hidden="true">✓</div>
            <span>Actividad completada</span>
          </div>
        )}
      </div>
    </section>
  )
}

export default DigitalActivityExperience
