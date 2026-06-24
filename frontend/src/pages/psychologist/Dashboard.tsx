import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Input, ViewState } from '../../components/ui'
import { EvaluationDetail } from '../../components/psychologist/EvaluationDetail'
import { EvaluationList } from '../../components/psychologist/EvaluationList'
import { store } from '../../store'
import type { Evaluacion } from '../../types'
import './Dashboard.css'

type DashboardTab = 'activas' | 'completadas' | 'ninos' | 'nueva'

const initialNinoForm = {
  nombre: '',
  fecha_nacimiento: '',
  genero: '',
  padre_tutor: '',
  escuela: '',
}

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const formatDateLabel = (value: string) => {
  if (!value) return 'Seleccionar fecha'
  const [year, month, day] = value.split('-')
  return `${day} ${monthNames[Number(month) - 1]} ${year}`
}

const toDateValue = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

function BirthDatePicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const today = new Date()
  const selectedDate = value ? new Date(`${value}T00:00:00`) : today
  const [isOpen, setIsOpen] = useState(false)
  const [visibleYear, setVisibleYear] = useState(selectedDate.getFullYear())
  const [visibleMonth, setVisibleMonth] = useState(selectedDate.getMonth())
  const currentYear = today.getFullYear()
  const years = Array.from({ length: 16 }, (_, index) => currentYear - index)
  const firstWeekday = new Date(visibleYear, visibleMonth, 1).getDay()
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate()
  const days = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index < firstWeekday ? null : index - firstWeekday + 1)

  const selectDay = (day: number) => {
    onChange(toDateValue(visibleYear, visibleMonth, day))
    setIsOpen(false)
  }

  return (
    <div className="date-picker-field">
      <label className="input-label" htmlFor="birth-date-picker">Fecha de nacimiento</label>
      <button id="birth-date-picker" type="button" className="date-picker-trigger" onClick={() => setIsOpen((prev) => !prev)}>
        <span>{formatDateLabel(value)}</span>
        <strong>{monthNames[visibleMonth]} {visibleYear}</strong>
      </button>
      {isOpen && (
        <div className="date-picker-popover">
          <div className="date-picker-controls">
            <select value={visibleMonth} onChange={(event) => setVisibleMonth(Number(event.target.value))} aria-label="Mes">
              {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
            </select>
            <select value={visibleYear} onChange={(event) => setVisibleYear(Number(event.target.value))} aria-label="Año">
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="date-picker-weekdays" aria-hidden="true">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
          </div>
          <div className="date-picker-grid">
            {days.map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />
              const dateValue = toDateValue(visibleYear, visibleMonth, day)
              const isSelected = dateValue === value
              const isFuture = new Date(visibleYear, visibleMonth, day) > today
              return (
                <button key={dateValue} type="button" className={isSelected ? 'selected' : ''} disabled={isFuture} onClick={() => selectDay(day)}>
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export function PsychologistDashboard() {
  const ninos = store((state) => state.ninos)
  const evaluaciones = store((state) => state.evaluaciones)
  const fetchNinos = store((state) => state.fetchNinos)
  const fetchEvaluaciones = store((state) => state.fetchEvaluaciones)
  const addNino = store((state) => state.addNino)
  const createEvaluacion = store((state) => state.createEvaluacion)
  const ninosLoading = store((state) => state.ninosLoading)
  const evalLoading = store((state) => state.evalLoading)

  const [activeTab, setActiveTab] = useState<DashboardTab>('activas')
  const [selectedEvaluacion, setSelectedEvaluacion] = useState<Evaluacion | null>(null)
  const [selectedNinoId, setSelectedNinoId] = useState('')
  const [ninoForm, setNinoForm] = useState(initialNinoForm)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    void loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setError(null)
    try {
      await Promise.all([fetchNinos(), fetchEvaluaciones()])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cargar el panel')
    }
  }

  const activeEvaluaciones = useMemo(
    () => evaluaciones.filter((e) => e.estado === 'INITIATED' || e.estado === 'IN_PROGRESS' || e.estado === 'WAITING_CHILD_DATA' || e.estado === 'WAITING_CONSENT'),
    [evaluaciones]
  )

  const completedEvaluaciones = useMemo(
    () => evaluaciones.filter((e) => e.estado === 'COMPLETED' || e.estado === 'STOPPED' || e.estado === 'ARCHIVED' || e.estado === 'PENDING_REVIEW' || e.estado === 'REVIEW_IN_PROGRESS' || e.estado === 'VALIDATED'),
    [evaluaciones]
  )

  const selectedNino = useMemo(
    () => ninos.find((nino) => nino.id === selectedNinoId),
    [ninos, selectedNinoId]
  )

  const selectedEvaluacionNino = useMemo(
    () => selectedEvaluacion ? ninos.find((nino) => nino.id === selectedEvaluacion.nino_id) : undefined,
    [ninos, selectedEvaluacion]
  )

  const handleCreateNino = async (event: React.FormEvent) => {
    event.preventDefault()
    setSuccessMessage(null)
    if (!ninoForm.nombre.trim() || !ninoForm.fecha_nacimiento) {
      setError('Nombre y fecha de nacimiento son requeridos')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      const nino = await addNino({
        nombre: ninoForm.nombre.trim(),
        fecha_nacimiento: ninoForm.fecha_nacimiento,
        genero: ninoForm.genero || undefined,
        padre_tutor: ninoForm.padre_tutor || undefined,
        escuela: ninoForm.escuela || undefined,
      })
      setNinoForm(initialNinoForm)
      setSelectedNinoId(nino.id)
      setSuccessMessage(`Niño registrado correctamente: ${nino.nombre}`)
      setActiveTab('nueva')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo registrar el niño')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCreateEvaluacion = async () => {
    if (!selectedNinoId) {
      setError('Selecciona un niño para iniciar la evaluación')
      return
    }

    setIsSubmitting(true)
    setError(null)
    try {
      const evaluacion = await createEvaluacion(selectedNinoId, ['COGNITIVO_001'])
      setSelectedEvaluacion(evaluacion)
      setActiveTab('activas')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la evaluación')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderList = (items: Evaluacion[], completed = false) => (
    <EvaluationList
      evaluaciones={items}
      ninos={ninos}
      onSelect={setSelectedEvaluacion}
      isLoading={evalLoading || ninosLoading}
      completed={completed}
    />
  )

  return (
    <section className="dashboard">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>Panel clínico DAYC-2</h1>
          <p>Administra niños, sesiones, fallback manual y resultados desde un solo espacio de trabajo.</p>
          <div className="header-kpis" aria-label="Resumen del panel">
            <span>{ninos.length} niños registrados</span>
            <span>{activeEvaluaciones.length} evaluaciones activas</span>
            <span>{completedEvaluaciones.length} cerradas</span>
          </div>
        </div>
        <div className="header-actions">
          <Button variant="secondary" onClick={() => void loadDashboard()}>Actualizar</Button>
          <Button onClick={() => setActiveTab('nueva')}>Nueva evaluación</Button>
        </div>
      </header>

      <nav className="dashboard-nav" aria-label="Secciones del panel">
        <button className={`nav-item ${activeTab === 'activas' ? 'active' : ''}`} onClick={() => setActiveTab('activas')}>Activas</button>
        <button className={`nav-item ${activeTab === 'completadas' ? 'active' : ''}`} onClick={() => setActiveTab('completadas')}>Completadas</button>
        <button className={`nav-item ${activeTab === 'ninos' ? 'active' : ''}`} onClick={() => setActiveTab('ninos')}>Niños</button>
        <button className={`nav-item ${activeTab === 'nueva' ? 'active' : ''}`} onClick={() => setActiveTab('nueva')}>Crear sesión</button>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-main">
          {error && <ViewState kind="error" message={error} onRetry={() => void loadDashboard()} />}
          {successMessage && (
            <div className="dashboard-toast" role="status">
              <span>Listo</span>
              <p>{successMessage}</p>
              <button type="button" onClick={() => setSuccessMessage(null)} aria-label="Cerrar aviso">x</button>
            </div>
          )}

          <div className="dashboard-summary">
            <Card className="summary-card" padding="sm">
              <div className="summary-icon users">N</div>
              <div><p className="summary-label">Niños</p><p className="summary-value">{ninos.length}</p></div>
            </Card>
            <Card className="summary-card" padding="sm">
              <div className="summary-icon active">A</div>
              <div><p className="summary-label">Activas</p><p className="summary-value">{activeEvaluaciones.length}</p></div>
            </Card>
            <Card className="summary-card" padding="sm">
              <div className="summary-icon completed">C</div>
              <div><p className="summary-label">Completadas</p><p className="summary-value">{completedEvaluaciones.length}</p></div>
            </Card>
          </div>

          {activeTab === 'activas' && <section className="dashboard-panel"><h2>Evaluaciones activas</h2>{renderList(activeEvaluaciones)}</section>}
          {activeTab === 'completadas' && <section className="dashboard-panel"><h2>Evaluaciones completadas</h2>{renderList(completedEvaluaciones, true)}</section>}

          {activeTab === 'ninos' && (
            <section className="dashboard-panel">
              <h2>Niños registrados</h2>
              {ninosLoading ? <ViewState kind="loading" message="Cargando niños..." /> : ninos.length === 0 ? <ViewState kind="empty" message="Todavía no hay niños registrados" /> : (
                <div className="evaluation-list">
                  {ninos.map((nino) => (
                    <Card key={nino.id} className="evaluation-card" onClick={() => setSelectedNinoId(nino.id)}>
                      <div className="evaluation-card-header"><span className="nino-name">{nino.nombre}</span><span className="badge badge-info">{nino.fecha_nacimiento}</span></div>
                      <div className="evaluation-card-info"><span className="info-item"><span className="info-label">Escuela:</span><span className="info-value">{nino.escuela || 'Sin dato'}</span></span></div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'nueva' && (
            <section className="dashboard-panel">
              <h2>Crear nueva evaluación</h2>
              <div className="form-group">
                <label className="form-label" htmlFor="nino-select">Niño para evaluar</label>
                <select id="nino-select" className="form-select" value={selectedNinoId} onChange={(e) => setSelectedNinoId(e.target.value)}>
                  <option value="">Seleccionar niño...</option>
                  {ninos.map((nino) => <option key={nino.id} value={nino.id}>{nino.nombre}</option>)}
                </select>
              </div>
              {selectedNino && <p className="empty-state">Se generará un código de sesión para {selectedNino.nombre}.</p>}
              <Button onClick={handleCreateEvaluacion} isLoading={isSubmitting} disabled={!selectedNinoId}>Iniciar evaluación DAYC-2</Button>
            </section>
          )}
        </div>

        <aside className="dashboard-sidebar">
          {selectedEvaluacion ? (
            <EvaluationDetail evaluacion={selectedEvaluacion} nino={selectedEvaluacionNino} onClose={() => setSelectedEvaluacion(null)} onRefresh={() => void loadDashboard()} />
          ) : (
            <Card className="dashboard-panel" padding="lg">
              <h2 className="panel-title">Registrar niño</h2>
              <form onSubmit={handleCreateNino}>
                <div className="form-group"><Input label="Nombre completo" value={ninoForm.nombre} onChange={(e) => setNinoForm((prev) => ({ ...prev, nombre: e.target.value }))} placeholder="Nombre del niño" /></div>
                <div className="form-group"><BirthDatePicker value={ninoForm.fecha_nacimiento} onChange={(fecha_nacimiento) => setNinoForm((prev) => ({ ...prev, fecha_nacimiento }))} /></div>
                <div className="form-group"><Input label="Padre o tutor" value={ninoForm.padre_tutor} onChange={(e) => setNinoForm((prev) => ({ ...prev, padre_tutor: e.target.value }))} placeholder="Nombre del tutor" /></div>
                <div className="form-group"><Input label="Escuela" value={ninoForm.escuela} onChange={(e) => setNinoForm((prev) => ({ ...prev, escuela: e.target.value }))} placeholder="Opcional" /></div>
                <Button type="submit" fullWidth isLoading={isSubmitting}>Guardar niño</Button>
              </form>
            </Card>
          )}
        </aside>
      </div>
    </section>
  )
}

export default PsychologistDashboard
