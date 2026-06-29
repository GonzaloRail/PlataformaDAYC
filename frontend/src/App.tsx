import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SessionEntry } from '@/pages/child/SessionEntry'
import { EvaluationSession } from '@/pages/child/EvaluationSession'
import { AdultSession } from '@/pages/child/AdultSession'
import { LoginPage } from '@/pages/auth/LoginPage'
import { PublicRoute } from '@/components/auth/PublicRoute'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PsychologistLayout } from '@/layouts/PsychologistLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Skeleton } from '@/components/ui'

const PsychologistDashboard = lazy(() =>
  import('@/pages/psychologist/Dashboard').then((m) => ({ default: m.PsychologistDashboard }))
)
const MinijuegosTester = lazy(() =>
  import('@/pages/psychologist/MinijuegosTester').then((m) => ({ default: m.MinijuegosTester }))
)
const SessionAccess = lazy(() =>
  import('@/pages/psychologist/SessionAccess').then((m) => ({ default: m.SessionAccess }))
)
const ReviewPage = lazy(() =>
  import('@/pages/psychologist/ReviewPage').then((m) => ({ default: m.ReviewPage }))
)
const MetricsDashboard = lazy(() =>
  import('@/pages/research/MetricsDashboard').then((m) => ({ default: m.MetricsDashboard }))
)

function PageFallback() {
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <Skeleton variant="rectangular" height="40px" width="200px" />
      <div style={{ marginTop: '20px' }}>
        <Skeleton variant="rectangular" height="200px" />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route path="/child/entry" element={<SessionEntry />} />
          <Route path="/child/evaluation/:sessionCode" element={<EvaluationSession />} />
          <Route path="/adult/session/:sessionCode" element={<AdultSession />} />
          <Route
            element={
              <ProtectedRoute>
                <PsychologistLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/psychologist" element={<PsychologistDashboard />} />
            <Route path="/psychologist/evaluations/:evaluacionId/review" element={<ReviewPage />} />
            <Route path="/psychologist/minijuegos" element={<MinijuegosTester />} />
            <Route path="/psychologist/session-access" element={<SessionAccess />} />
            <Route path="/research/metrics" element={<MetricsDashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
