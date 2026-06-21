import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { store } from '../../store'

interface PublicRouteProps {
  children: React.ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const location = useLocation()
  const [isChecking, setIsChecking] = useState(true)
  const isAuthenticated = store((state) => state.isAuthenticated)
  const checkAuthAction = store((state) => state.checkAuth)

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        try {
          await checkAuthAction()
        } catch {
          // No hay sesión activa; permitir ver login.
        }
      }
      setIsChecking(false)
    }

    verifyAuth()
  }, [isAuthenticated, checkAuthAction])

  if (isChecking) return null

  if (isAuthenticated) {
    const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/psychologist'
    return <Navigate to={fromPath} replace />
  }

  return <>{children}</>
}

export default PublicRoute
