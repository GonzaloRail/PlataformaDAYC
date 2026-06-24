import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChildQuestionPresenter } from '../../components/child/ChildQuestionPresenter'
import { DigitalActivityExperience } from '../../components/child/DigitalActivityExperience'
import { PedagogicalMascot } from '../../components/child/PedagogicalMascot'
import { EvidenceRecorder } from '../../components/evidence/EvidenceRecorder'
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

const sessionAdvanceChannel = 'dayc-session-advance'

export function EvaluationSession() {
  const { sessionCode } = useParams<{ sessionCode: string }>()
  const [phase, setPhase] = useState<Phase>('loading')
  const [sessionState, setSessionState] = useState<SessionState | null>(null)
  const [task, setTask] = useState<EvaluationTask | null>(null)
  const [error, setError] = useState<string | null>(null)
  const itemStartRef = useRef(Date.now())
  const activeItemRef = useRef<string | null>(null)

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
      const nextTask = state.current_task || null
      setSessionState(state)
      setTask(nextTask)
      if (nextTask?.item_id && activeItemRef.current !== nextTask.item_id) {
        activeItemRef.current = nextTask.item_id
        itemStartRef.current = Date.now()
      }

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
        if (response.current_task?.item_id && activeItemRef.current !== response.current_task.item_id) {
          activeItemRef.current = response.current_task.item_id
          itemStartRef.current = Date.now()
        }
      }

      setPhase('session')
    } catch {
      setError('No pudimos abrir la sesión. Verifica el código con el adulto.')
      setPhase('error')
    }
  }

  useEffect(() => {
    const refreshFromSignal = (rawPayload: string | null) => {
      if (!rawPayload || !sessionCode) return
      try {
        const payload = JSON.parse(rawPayload) as { sessionCode?: string }
        if (payload.sessionCode === sessionCode) void loadSessionState(false)
      } catch {
        return
      }
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key === sessionAdvanceChannel) refreshFromSignal(event.newValue)
    }

    window.addEventListener('storage', onStorage)

    let channel: BroadcastChannel | null = null
    if ('BroadcastChannel' in window) {
      channel = new BroadcastChannel(sessionAdvanceChannel)
      channel.onmessage = (event) => refreshFromSignal(String(event.data || ''))
    }

    return () => {
      window.removeEventListener('storage', onStorage)
      channel?.close()
    }
  }, [sessionCode])

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
        activeItemRef.current = response.current_task.item_id
        itemStartRef.current = Date.now()
      } else {
        await loadSessionState(false)
      }
    } catch {
      setError('No se pudo registrar la actividad. Avísale al adulto.')
    }
  }

  const hasDigitalActivity = Boolean(task?.actividad_digital)
  const adultUrl = `${window.location.origin}/adult/session/${sessionCode || ''}`
  const currentAreaLabel = task?.area ? areaLabels[task.area] || task.area : 'Actividad'

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
          <PedagogicalMascot className="child-stage-mascot" />
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
          <PedagogicalMascot className="child-stage-mascot" />
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
        <strong>{currentAreaLabel}{task?.numero_item ? ` · Ítem ${task.numero_item}` : ''}</strong>
      </header>

      <section className="child-only-stage">
        {task && (
          hasDigitalActivity ? (
            <DigitalActivityExperience task={task} areaLabel={currentAreaLabel} onComplete={autoAnswer} />
          ) : (
            <div className="child-question-flow">
              <ChildQuestionPresenter task={task} areaLabel={currentAreaLabel} />
            </div>
          )
        )}
      </section>
    </main>
  )
}

export default EvaluationSession
