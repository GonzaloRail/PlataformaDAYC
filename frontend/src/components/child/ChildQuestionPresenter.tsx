import type { EvaluationTask } from '../../types'
import { PedagogicalMascot } from './PedagogicalMascot'
import './ChildQuestionPresenter.css'

interface ChildQuestionPresenterProps {
  task: EvaluationTask
  areaLabel: string
  hasActivity?: boolean
}

export function ChildQuestionPresenter({ task, areaLabel, hasActivity = false }: ChildQuestionPresenterProps) {
  const question = task.pregunta || task.instrucciones || 'Escucha al adulto y sigue la actividad.'

  return (
    <section className="child-question-presenter" aria-label="Pregunta actual">
      <div className="child-question-background" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="child-mascot-card" aria-hidden="true">
        <PedagogicalMascot className="child-mascot-lottie" animation="talking" />
      </div>

      <div className="child-question-copy">
        <p className="child-question-kicker">{areaLabel}{task.numero_item ? ` · Ítem ${task.numero_item}` : ''}</p>
        <p className="child-question-intro">Ahora vamos a hacer esto:</p>
        <h1>{question}</h1>
        <p className="child-question-helper">
          {hasActivity ? 'Mira la actividad en pantalla y responde con calma.' : 'El adulto te acompañará y registrará cómo te fue.'}
        </p>
      </div>
    </section>
  )
}

export default ChildQuestionPresenter
