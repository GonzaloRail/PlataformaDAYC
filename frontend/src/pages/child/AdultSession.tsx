import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { evidenceUploadQueue } from '@/components/evidence/EvidenceUploadQueue'
import { Button, Card, Input } from '@/components/ui'
import evaluacionesApi from '@/services/evaluacionesApi'
import type { EvaluationTask, SessionState } from '@/types'
import './AdultSession.css'

type Phase = 'loading' | 'child-data' | 'consent' | 'control' | 'complete' | 'error'

const initialChildForm = {
  nombre: '',
  fecha_nacimiento: '',
  genero: '',
  nombre_informante: '',
  relacion_informante: '',
}

const modalityLabels: Record<string, string> = {
  INTERACTIVO_AUTO: 'Minijuego digital',
  INTERACTIVO_ASISTIDO: 'Actividad digital asistida',
  EVIDENCIA_DIFERIDA: 'Evidencia oral o diferida',
  OBSERVACION_FISICA: 'Observación física',
  PREGUNTA_CUIDADOR: 'Pregunta al cuidador',
  MANUAL_GUIADO: 'Aplicación guiada',
}

const evidenceLabels: Record<string, string> = {
  LOG: 'logs',
  VIDEO: 'video',
  AUDIO: 'audio',
  SCREENSHOT: 'captura',
  CAMERA_FRAME: 'cámara',
}

const sessionAdvanceChannel = 'dayc-session-advance'

function notifyChildSessionAdvanced(sessionCode: string, itemId?: string) {
  const payload = JSON.stringify({ sessionCode, itemId, at: Date.now() })
  window.localStorage.setItem(sessionAdvanceChannel, payload)
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel(sessionAdvanceChannel)
    channel.postMessage(payload)
    channel.close()
  }
}

function buildAdultHint(task: EvaluationTask | null) {
  if (!task) return 'Espera a que el sistema cargue el ítem actual.'

  if (task.modalidad === 'OBSERVACION_FISICA') {
    return 'Ubica al niño frente al dispositivo. Asegúrate de que se vea la acción completa antes de registrar el resultado.'
  }

  if (task.modalidad === 'PREGUNTA_CUIDADOR') {
    return 'Responde según lo que observas habitualmente en la vida diaria del niño. El niño puede descansar durante esta parte.'
  }

  if (task.modalidad === 'EVIDENCIA_DIFERIDA') {
    return 'Lee o guía la consigna. Permite que el niño responda con calma para que la evidencia sea revisable.'
  }

  if (task.pantalla_nino === 'ACTIVIDAD') {
    return 'Deja que el niño interactúe con la tablet o laptop. Intervén solo si necesita comprender la consigna.'
  }

  return 'Guía la actividad y registra el resultado observado.'
}

async function captureCameraFrame(): Promise<Blob | null> {
  if (!navigator.mediaDevices?.getUserMedia) return null

  let stream: MediaStream | null = null
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false })
    const video = document.createElement('video')
    video.srcObject = stream
    video.muted = true
    await video.play()

    await new Promise((resolve) => window.setTimeout(resolve, 350))

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720
    const context = canvas.getContext('2d')
    if (!context) return null

    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    return await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88))
  } catch (error) {
    console.warn('No se pudo capturar evidencia de camara:', error)
    return null
  } finally {
    stream?.getTracks().forEach((track) => track.stop())
  }
}

export function AdultSession() {
  const { sessionCode } = useParams<{ sessionCode: string }>()
  const [phase, setPhase] = useState<Phase>('loading')
  const [sessionState, setSessionState] = useState<SessionState | null>(null)
  const [task, setTask] = useState<EvaluationTask | null>(null)
  const [childForm, setChildForm] = useState(initialChildForm)
  const [consentChecked, setConsentChecked] = useState(false)
  const [adultObservation, setAdultObservation] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const itemStartRef = useRef(Date.now())

  useEffect(() => {
    void loadSessionState(true)
  }, [sessionCode])

  const loadSessionState = async (showLoading: boolean) => {
    if (!sessionCode) return
    if (showLoading) setPhase('loading')
    setError(null)
    try {
      const state = await evaluacionesApi.sessionState(sessionCode)
      setSessionState(state)
      setTask(state.current_task || null)
      itemStartRef.current = Date.now()

      if (state.child_data_required) {
        setPhase('child-data')
      } else if (state.consent_required) {
        setPhase('consent')
      } else if (state.evaluacion.estado === 'PENDING_REVIEW' || state.evaluacion.estado === 'VALIDATED') {
        setPhase('complete')
      } else {
        if (state.evaluacion.estado !== 'IN_PROGRESS') {
          const response = await evaluacionesApi.startSession(sessionCode)
          setSessionState((prev) => prev ? { ...prev, evaluacion: response.evaluacion } : prev)
          setTask(response.current_task)
        }
        setPhase('control')
      }
    } catch {
      setError('No pudimos abrir la sesión. Verifica el código con el profesional.')
      setPhase('error')
    }
  }

  const completeChildData = async (event: FormEvent) => {
    event.preventDefault()
    if (!sessionCode || !childForm.nombre || !childForm.fecha_nacimiento) {
      setError('Nombre y fecha de nacimiento son requeridos')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      await evaluacionesApi.completeChildData(sessionCode, childForm)
      await loadSessionState(false)
    } catch {
      setError('No se pudieron guardar los datos del niño')
    } finally {
      setSubmitting(false)
    }
  }

  const acceptConsent = async () => {
    if (!sessionCode || !consentChecked) return
    setSubmitting(true)
    setError(null)
    try {
      const response = await evaluacionesApi.acceptConsent(sessionCode)
      setSessionState((prev) => prev ? { ...prev, evaluacion: response.evaluacion, session_token: response.session_token, consent_accepted: true, consent_required: false } : prev)
      setTask(response.current_task)
      setPhase('control')
    } catch {
      setError('No se pudo registrar el consentimiento')
    } finally {
      setSubmitting(false)
    }
  }

  const answer = async (resultado: 'CORRECT' | 'ERROR' | 'NOT_APPLICABLE') => {
    if (!task?.evaluacion_id || !task.item_id) return
    setSubmitting(true)
    setError(null)
    const duration = Date.now() - itemStartRef.current
    const token = sessionState?.session_token || undefined
    try {
      recordAdultEvidence(task, resultado, duration, token).catch((err) => {
        console.warn('[AdultSession] recordAdultEvidence falló:', err)
      })

      const response = await evaluacionesApi.submitRespuesta(task.evaluacion_id, {
        item_id: task.item_id,
        resultado,
        tiempo_respuesta_ms: duration,
        source: 'ADULT_ASSISTED',
        confidence: resultado === 'NOT_APPLICABLE' ? 0.4 : 0.65,
        raw_data: {
          modalidad: task.modalidad,
          pantalla_nino: task.pantalla_nino,
          adult_observation: adultObservation,
        },
      }, token)

      setAdultObservation('')
      if (response.evaluation_finished) {
        if (sessionCode) notifyChildSessionAdvanced(sessionCode)
        setPhase('complete')
        return
      }
      if (response.current_task) {
        setTask(response.current_task)
        itemStartRef.current = Date.now()
      } else {
        await loadSessionState(false)
      }
      if (sessionCode) notifyChildSessionAdvanced(sessionCode, response.current_task?.item_id || response.next_item_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar la respuesta')
    } finally {
      setSubmitting(false)
    }
  }

  const recordAdultEvidence = async (currentTask: EvaluationTask, resultado: string, duration: number, token?: string) => {
    const metadata = {
      item_id: currentTask.item_id,
      numero_item: currentTask.numero_item,
      pregunta: currentTask.pregunta || currentTask.instrucciones,
      resultado,
      duration_ms: duration,
      modalidad: currentTask.modalidad,
      pantalla_nino: currentTask.pantalla_nino,
      adult_observation: adultObservation,
      captured_at: new Date().toISOString(),
    }

    void evaluacionesApi.submitEvent(currentTask.evaluacion_id!, currentTask.item_id, {
      event_type: 'ADULT_RESULT_SELECTED',
      relative_time_ms: duration,
      event_payload: metadata,
    }, token).catch((error) => {
      console.warn('No se pudo registrar el evento del adulto:', error)
    })

    evidenceUploadQueue.add({
      evaluacionId: currentTask.evaluacion_id!,
      itemId: currentTask.item_id,
      type: 'TIME_EVENT',
      metadata: { ...metadata, event: 'ADULT_RESULT_SELECTED' },
      durationMs: duration,
      capturedBy: 'ADULT_DEVICE',
      sessionToken: token,
    })

    const shouldCaptureFrame =
      currentTask.modalidad === 'OBSERVACION_FISICA' ||
      currentTask.tipos_evidencia?.some((type) => ['VIDEO', 'CAMERA_FRAME', 'SCREENSHOT'].includes(type))

    if (!shouldCaptureFrame) return

    const frame = await captureCameraFrame()
    if (!frame) {
      evidenceUploadQueue.add({
        evaluacionId: currentTask.evaluacion_id!,
        itemId: currentTask.item_id,
        type: 'LOG',
        metadata: { ...metadata, event: 'CAMERA_FRAME_NOT_CAPTURED' },
        durationMs: duration,
        capturedBy: 'ADULT_DEVICE',
        sessionToken: token,
      })
      return
    }

    evidenceUploadQueue.add({
      evaluacionId: currentTask.evaluacion_id!,
      itemId: currentTask.item_id,
      type: 'CAMERA_FRAME',
      file: frame,
      metadata,
      durationMs: duration,
      sizeBytes: frame.size,
      capturedBy: 'ADULT_DEVICE',
      sessionToken: token,
    })
  }

  const finishSession = async () => {
    if (!sessionCode) return
    setSubmitting(true)
    setError(null)
    try {
      await evaluacionesApi.finishSession(sessionCode, adultObservation, sessionState?.session_token || undefined)
      setPhase('complete')
    } catch {
      setError('No se pudo finalizar la sesión')
    } finally {
      setSubmitting(false)
    }
  }

  if (phase === 'loading') {
    return <main className="adult-session"><div className="adult-loading">Cargando sesión...</div></main>
  }

  if (phase === 'error') {
    return <main className="adult-session"><Card className="adult-card"><h1>No pudimos abrir la sesión</h1><p>{error}</p><Button onClick={() => void loadSessionState(true)}>Reintentar</Button></Card></main>
  }

  if (phase === 'child-data') {
    return (
      <main className="adult-session">
        <Card className="adult-card" padding="lg">
          <p className="adult-eyebrow">Datos requeridos</p>
          <h1>Completa los datos del niño</h1>
          <form onSubmit={completeChildData} className="adult-form">
            <Input label="Nombre y apellidos" value={childForm.nombre} onChange={(e) => setChildForm((prev) => ({ ...prev, nombre: e.target.value }))} />
            <Input label="Fecha de nacimiento" type="date" value={childForm.fecha_nacimiento} onChange={(e) => setChildForm((prev) => ({ ...prev, fecha_nacimiento: e.target.value }))} />
            <Input label="Nombre del informante" value={childForm.nombre_informante} onChange={(e) => setChildForm((prev) => ({ ...prev, nombre_informante: e.target.value }))} />
            <Input label="Relación con el niño" value={childForm.relacion_informante} onChange={(e) => setChildForm((prev) => ({ ...prev, relacion_informante: e.target.value }))} />
            {error && <p className="adult-error">{error}</p>}
            <Button type="submit" fullWidth isLoading={submitting}>Guardar y continuar</Button>
          </form>
        </Card>
      </main>
    )
  }

  if (phase === 'consent') {
    return (
      <main className="adult-session">
        <Card className="adult-card" padding="lg">
          <p className="adult-eyebrow">Consentimiento</p>
          <h1>Autoriza el registro de evidencias</h1>
          <p>La evaluación registrará logs, tiempos y, cuando corresponda, audio, video o capturas para revisión profesional.</p>
          <label className="adult-check">
            <input type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} />
            <span>Acepto el registro de evidencias durante la evaluación.</span>
          </label>
          {error && <p className="adult-error">{error}</p>}
          <Button fullWidth onClick={acceptConsent} disabled={!consentChecked || submitting} isLoading={submitting}>Aceptar e iniciar</Button>
        </Card>
      </main>
    )
  }

  if (phase === 'complete') {
    return (
      <main className="adult-session">
        <Card className="adult-card adult-complete" padding="lg">
          <p className="adult-eyebrow">Sesión finalizada</p>
          <h1>La evaluación quedó para revisión</h1>
          <p>El psicólogo podrá validar los resultados y revisar evidencias.</p>
        </Card>
      </main>
    )
  }

  return (
    <main className="adult-session">
      <section className="adult-topbar">
        <span>Sesión {sessionCode}</span>
        <button type="button" onClick={() => void loadSessionState(false)}>Actualizar</button>
      </section>

      <Card className="adult-card adult-control-card" padding="lg">
        <p className="adult-eyebrow">{task?.area || 'Área'} · Ítem {task?.numero_item || task?.item_id || '-'}</p>
        <h1>{modalityLabels[task?.modalidad || ''] || 'Aplicación guiada'}</h1>
        <p className="adult-question">{task?.pregunta || task?.instrucciones || 'Sigue la indicación del profesional.'}</p>
        <div className="adult-hint">{buildAdultHint(task)}</div>

        <div className="adult-evidence-list">
          {(task?.tipos_evidencia || ['LOG']).map((type) => (
            <span key={type}>{evidenceLabels[type] || type.toLowerCase()}</span>
          ))}
        </div>

        <textarea
          className="adult-notes"
          value={adultObservation}
          onChange={(e) => setAdultObservation(e.target.value)}
          placeholder="Observación opcional de este ítem"
        />

        {error && <p className="adult-error">{error}</p>}

        <div className="adult-actions">
          <Button className="adult-pass" fullWidth onClick={() => void answer('CORRECT')} disabled={submitting}>Lo logró</Button>
          <button className="adult-fail" onClick={() => void answer('ERROR')} disabled={submitting}>No lo logró</button>
          <button className="adult-skip" onClick={() => void answer('NOT_APPLICABLE')} disabled={submitting}>No se pudo observar</button>
        </div>
      </Card>

      <button className="adult-finish" type="button" onClick={() => void finishSession()} disabled={submitting}>Finalizar sesión</button>
    </main>
  )
}

export default AdultSession
