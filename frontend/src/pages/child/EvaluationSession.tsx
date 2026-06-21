import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EvidenceRecorder } from '../../components/evidence/EvidenceRecorder'
import { DigitalActivityShell } from '../../components/minijuegos/DigitalActivityShell'
import { getMinijuego } from '../../components/minijuegos/registry'
import evaluacionesApi from '../../services/evaluacionesApi'
import type { EvaluationTask, SessionState } from '../../types'
import './EvaluationSession.css'

type Phase = 'loading' | 'waiting-adult' | 'session' | 'complete' | 'error'

const areaLabels: Record<string, string> = {
  COGNITIVO: 'Pensar y resolver',
  COMUNICACION: 'Escuchar y hablar',
  SOCIAL_EMOCIONAL: 'Emociones y convivencia',
  DESARROLLO_FISICO: 'Movimiento',
  CONDUCTA_ADAPTATIVA: 'Rutinas diarias',
}

const getChildStage = (task: EvaluationTask | null) => {
  const modality = task?.modalidad || 'MANUAL_GUIADO'
  const screen = task?.pantalla_nino || 'INSTRUCCION_SIMPLE'

  if (modality === 'PREGUNTA_CUIDADOR' || screen === 'PANTALLA_NEUTRA') {
    return {
      variant: 'neutral',
      eyebrow: 'Pausa tranquila',
      title: 'Espera un momento',
      text: 'El adulto está respondiendo esta parte.',
      helper: 'Cuando termine, continuaremos con la siguiente actividad.',
    }
  }

  if (modality === 'OBSERVACION_FISICA' || screen === 'ESPERA_ADULTO') {
    return {
      variant: 'movement',
      eyebrow: 'Actividad con el adulto',
      title: 'Sigue la indicación',
      text: 'Haz la actividad con calma frente al dispositivo.',
      helper: 'El adulto te dirá qué hacer y registrará el resultado.',
    }
  }

  if (modality === 'EVIDENCIA_DIFERIDA' || screen === 'ESTIMULO') {
    return {
      variant: 'voice',
      eyebrow: 'Escucha y responde',
      title: 'Responde con tu voz',
      text: task?.instrucciones || 'Escucha al adulto y responde cuando estés listo.',
      helper: 'No hay prisa. Puedes responder con calma.',
    }
  }

  return {
    variant: 'play',
    eyebrow: 'Actividad en pantalla',
    title: 'Vamos a jugar',
    text: task?.instrucciones || 'Mira la pantalla y sigue la actividad.',
    helper: 'Si necesitas ayuda, el adulto está contigo.',
  }
}

export function EvaluationSession() {
  const { sessionCode } = useParams<{ sessionCode: string }>()
  const [phase, setPhase] = useState<Phase>('loading')
  const [sessionState, setSessionState] = useState<SessionState | null>(null)
  const [task, setTask] = useState<EvaluationTask | null>(null)
  const [error, setError] = useState<string | null>(null)
  const itemStartRef = useRef(Date.now())

  useEffect(() => {
    void loadSessionState(true)
    const interval = window.setInterval(() => void loadSessionState(false), 2000)
    return () => window.clearInterval(interval)
  }, [sessionCode])

  const loadSessionState = async (showLoading: boolean) => {
    if (!sessionCode) return
    if (showLoading) setPhase('loading')
    setError(null)
    try {
      const state = await evaluacionesApi.sessionState(sessionCode)
      setSessionState(state)
      setTask(state.current_task || null)

      if (state.evaluacion.estado === 'PENDING_REVIEW' || state.evaluacion.estado === 'VALIDATED') {
        setPhase('complete')
        return
      }

      if (state.child_data_required || state.consent_required) {
        setPhase('waiting-adult')
        return
      }

      if (state.evaluacion.estado !== 'IN_PROGRESS') {
        const response = await evaluacionesApi.startSession(sessionCode)
        setSessionState((prev) => prev ? { ...prev, evaluacion: response.evaluacion } : prev)
        setTask(response.current_task)
      }

      itemStartRef.current = Date.now()
      setPhase('session')
    } catch {
      setError('No pudimos abrir la sesión. Verifica el código con el adulto.')
      setPhase('error')
    }
  }

  const autoAnswer = async (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE', confidence?: number, rawDataExt?: any) => {
    if (!task?.evaluacion_id || !task.item_id) return
    const duration = Date.now() - itemStartRef.current
    try {
      const response = await evaluacionesApi.submitAutoResult(task.evaluacion_id, task.item_id, {
        resultado,
        duration_ms: duration,
        confidence: confidence !== undefined ? confidence : 0.8,
        raw_data: {
          modalidad: task.modalidad,
          pantalla_nino: task.pantalla_nino,
          ...(rawDataExt || {}),
        },
      }, sessionState?.session_token || undefined)

      if (response.evaluation_finished) {
        setPhase('complete')
        return
      }

      if (response.current_task) {
        setTask(response.current_task)
        itemStartRef.current = Date.now()
      } else {
        await loadSessionState(false)
      }
    } catch {
      setError('No se pudo registrar la actividad. Avísale al adulto.')
    }
  }

  const stage = getChildStage(task)
  const digitalEntry = task?.actividad_digital ? getMinijuego(task.actividad_digital) : undefined
  const adultUrl = `${window.location.origin}/adult/session/${sessionCode || ''}`

  if (phase === 'loading') {
    return <main className="evaluation-loading"><div className="evaluation-spinner" /><p>Preparando actividad...</p></main>
  }

  if (phase === 'error') {
    return <main className="evaluation-error"><h1>No pudimos abrir la sesión</h1><p>{error}</p></main>
  }

  if (phase === 'waiting-adult') {
    return (
      <main className="evaluation-session child-only-session">
        <section className="child-only-stage child-task-stage child-task-stage-neutral">
          <p className="child-stage-eyebrow">Esperando al adulto</p>
          <h1>Ya casi empezamos</h1>
          <p className="child-stage-main">El adulto debe abrir su pantalla y aceptar los pasos iniciales.</p>
          <p className="child-stage-helper">Pantalla adulto: {adultUrl}</p>
        </section>
      </main>
    )
  }

  if (phase === 'complete') {
    return (
      <main className="evaluation-session child-only-session">
        <section className="child-only-stage child-task-stage child-task-stage-neutral">
          <p className="child-stage-eyebrow">Terminamos</p>
          <h1>Gracias por participar</h1>
          <p className="child-stage-main">Hiciste un gran trabajo.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="evaluation-session child-only-session">
      {task?.evaluacion_id && task?.item_id && (
        <EvidenceRecorder
          evaluacionId={task.evaluacion_id}
          itemId={task.item_id}
          tiposEvidencia={task.tipos_evidencia || []}
          sessionToken={sessionState?.session_token || undefined}
        />
      )}

      <header className="child-only-header">
        <span>DAYC en juego</span>
        <strong>{task?.area ? areaLabels[task.area] || task.area : 'Actividad'}</strong>
      </header>

      <section className="child-only-stage">
        {task && digitalEntry ? (
          <DigitalActivityShell task={task} onComplete={autoAnswer} />
        ) : (
          <div className={`child-task-stage child-task-stage-${stage.variant}`}>
            <div className="child-orbit" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="child-stage-eyebrow">{stage.eyebrow}</p>
            <h1>{stage.title}</h1>
            <p className="child-stage-main">{stage.text}</p>
            <p className="child-stage-helper">{stage.helper}</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default EvaluationSession
