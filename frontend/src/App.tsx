import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SessionEntry } from './pages/child/SessionEntry'
import { EvaluationSession } from './pages/child/EvaluationSession'
import { AdultSession } from './pages/child/AdultSession'
import { LoginPage } from './pages/auth/LoginPage'
import { PsychologistDashboard } from './pages/psychologist/Dashboard'
import { MinijuegosTester } from './pages/psychologist/MinijuegosTester'
import { ReviewPage } from './pages/psychologist/ReviewPage'
import { MetricsDashboard } from './pages/research/MetricsDashboard'
import { PublicRoute } from './components/auth/PublicRoute'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PsychologistLayout } from './layouts/PsychologistLayout'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/research/metrics" element={<MetricsDashboard />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
