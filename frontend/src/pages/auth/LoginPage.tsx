import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, Card } from '../../components/ui'
import { store } from '../../store'
import './LoginPage.css'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/psychologist'
  const isAuthenticated = store((state) => state.isAuthenticated)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [lockUntil, setLockUntil] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())
  const isLoading = store((state) => state.isLoading)

  const isLocked = useMemo(() => Boolean(lockUntil && lockUntil > now), [lockUntil, now])
  const lockSeconds = useMemo(() => (lockUntil ? Math.max(0, Math.ceil((lockUntil - now) / 1000)) : 0), [lockUntil, now])

  useEffect(() => {
    if (isLocked) {
      const timer = window.setInterval(() => setNow(Date.now()), 1000)
      return () => window.clearInterval(timer)
    }
  }, [isLocked])

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (!isAuthenticated) {
        await store.getState().checkAuth()
      }
      if (store.getState().isAuthenticated) {
        navigate(fromPath, { replace: true })
      }
    }
    bootstrapAuth()
  }, [isAuthenticated, navigate, fromPath])

  const normalizeError = (err: unknown, fallbackMessage: string) => {
    if (err instanceof Error) {
      try {
        const parsed = JSON.parse(err.message) as { error?: string }
        if (parsed?.error) return parsed.error
      } catch {
        if (err.message && !err.message.startsWith('HTTP ')) return err.message
      }
    }
    return fallbackMessage
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (isLocked) {
      setError(`Demasiados intentos. Espera ${lockSeconds}s para volver a intentar.`)
      return
    }

    if (!email || !password || (isRegisterMode && (!nombre || !apellido))) {
      setError(isRegisterMode
        ? 'Nombre, apellido, email y contraseña son requeridos'
        : 'Email y contraseña son requeridos')
      return
    }

    try {
      if (isRegisterMode) {
        await store.getState().registerPsychologist({ nombre, apellido, email, password })
        setSuccess('Cuenta creada correctamente')
        setAttempts(0)
      } else {
        await store.getState().login(email, password)
        setAttempts(0)
      }
      navigate(fromPath, { replace: true })
    } catch (err) {
      const nextAttempts = attempts + 1
      setAttempts(nextAttempts)
      if (nextAttempts >= 5) {
        setLockUntil(Date.now() + 30_000)
        setAttempts(0)
      }
      setError(normalizeError(err, isRegisterMode ? 'No se pudo crear la cuenta' : 'Credenciales inválidas'))
    }
  }

  const toggleMode = () => {
    setIsRegisterMode((prev) => !prev)
    setError(null)
    setSuccess(null)
    setShowPassword(false)
  }

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-header">
          <h1>DAYC-2</h1>
          <p>Plataforma de Evaluación</p>
        </div>

        <Card className="login-card">
          <h2>{isRegisterMode ? 'Registro de Psicólogo' : 'Iniciar Sesión'}</h2>
          <p className="login-subtitle">
            {isRegisterMode
              ? 'Crea tu cuenta profesional para administrar evaluaciones DAYC-2.'
              : 'Ingresa para continuar con la gestión clínica de evaluaciones.'}
          </p>
          <form onSubmit={handleSubmit}>
            {isRegisterMode && (
              <>
                <div className="form-group">
                  <Input
                    label="Nombre"
                    type="text"
                    value={nombre}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                    placeholder="Tu nombre"
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <Input
                    label="Apellido"
                    type="text"
                    value={apellido}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApellido(e.target.value)}
                    placeholder="Tu apellido"
                  />
                </div>
              </>
            )}

            <div className="form-group">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  autoComplete="email"
                  autoFocus={!isRegisterMode}
                />
              </div>

            <div className="form-group">
                <Input
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                </button>
              </div>

            {error && <p className="login-error">{error}</p>}
            {success && <p className="login-success">{success}</p>}

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              disabled={isLocked || !email || !password || (isRegisterMode && (!nombre || !apellido))}
            >
              {isRegisterMode ? 'Crear cuenta' : 'Ingresar'}
            </Button>
          </form>

          <Button type="button" variant="ghost" fullWidth className="auth-switch" onClick={toggleMode}>
            {isRegisterMode ? 'Ya tengo cuenta, iniciar sesión' : 'Registrar psicólogo'}
          </Button>
        </Card>

        <p className="login-footer">
          Acceso exclusivo para profesionales autorizados
        </p>
      </div>
    </div>
  )
}

export default LoginPage
