import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { store } from '../../store'
import { Skeleton } from '../ui'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
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
          // User is not authenticated
        }
      }
      setIsChecking(false)
    }

    verifyAuth()
  }, [isAuthenticated, checkAuthAction])

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
