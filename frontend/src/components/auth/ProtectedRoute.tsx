import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { store } from '@/store'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { Skeleton } from '@/components/ui'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const { isChecking, isAuthenticated } = useAuthCheck()
  store((state) => state.isAuthenticated)

  if (isChecking) {
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <Skeleton variant="rectangular" height="40px" width="200px" />
        <div style={{ marginTop: '20px' }}>
          <Skeleton variant="rectangular" height="200px" />
        </div>
        <div style={{ marginTop: '20px' }}>
          <Skeleton variant="rectangular" height="200px" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
