import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthCheck } from '@/hooks/useAuthCheck'

interface PublicRouteProps {
  children: ReactNode
}

export function PublicRoute({ children }: PublicRouteProps) {
  const location = useLocation()
  const { isChecking, isAuthenticated } = useAuthCheck()

  if (isChecking) return null

  if (isAuthenticated) {
    const fromPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/psychologist'
    return <Navigate to={fromPath} replace />
  }

  return <>{children}</>
}

export default PublicRoute
