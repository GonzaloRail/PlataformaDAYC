import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.4rem' }}>404</h1>
        <p style={{ marginBottom: '1rem' }}>No encontramos la pagina que buscas.</p>
        <Link to="/login">Ir al login</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
