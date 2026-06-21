import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LayoutDashboard, LineChart, LogOut, Menu, X } from 'lucide-react'
import { Button } from '../components/ui'
import { store } from '../store'
import './PsychologistLayout.css'

export function PsychologistLayout() {
  const location = useLocation()
  const user = store((state) => state.user)
  const logout = store((state) => state.logout)
  const displayName = user?.name || user?.email || 'Profesional'
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  useEffect(() => {
    setIsNavOpen(false)
  }, [location.pathname])

  const currentSection = useMemo(() => {
    if (location.pathname.startsWith('/research')) return 'Metricas y analisis'
    if (location.pathname.startsWith('/psychologist/minijuegos')) return 'Catalogo de minijuegos'
    return 'Panel de evaluaciones'
  }, [location.pathname])

  const navItems = [
    { to: '/psychologist', label: 'Evaluaciones', icon: <LayoutDashboard size={18} /> },
    { to: '/psychologist/minijuegos', label: 'Minijuegos', icon: <LayoutDashboard size={18} /> },
    { to: '/research/metrics', label: 'Metricas', icon: <LineChart size={18} /> },
  ]

  return (
    <div className={`psych-shell ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className={`psych-sidebar ${isNavOpen ? 'open' : ''}`} aria-label="Navegacion principal">
        <div className="psych-sidebar-top">
          <div className="psych-sidebar-brand">
            <p className="psych-layout-kicker">DAYC-2</p>
            <h1>Portal Profesional</h1>
          </div>
          <Button
            type="button"
            variant="ghost"
            className="psych-sidebar-collapse"
            onClick={() => setIsSidebarCollapsed((prev) => !prev)}
            aria-label={isSidebarCollapsed ? 'Expandir barra lateral' : 'Ocultar barra lateral'}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </Button>
        </div>

        <nav className="psych-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `psych-nav-link ${isActive ? 'active' : ''}`}
              title={isSidebarCollapsed ? item.label : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="psych-sidebar-footer">
          <p className="psych-sidebar-user-label">Sesion activa</p>
          <p className="psych-sidebar-user-name" title={displayName}>{displayName}</p>
          <Button variant="ghost" fullWidth onClick={() => void logout()}>
            <LogOut size={16} />
            Cerrar sesion
          </Button>
        </div>
      </aside>

      {isNavOpen && <button className="psych-sidebar-backdrop" onClick={() => setIsNavOpen(false)} aria-label="Cerrar menu" />}

      <div className="psych-main-area">
        <header className="psych-topbar">
          <Button variant="ghost" className="psych-menu-toggle" onClick={() => setIsNavOpen((prev) => !prev)} aria-label="Abrir navegacion">
            {isNavOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
          <div className="psych-topbar-context">
            <p className="psych-topbar-kicker">Contexto</p>
            <p className="psych-topbar-title">{currentSection}</p>
          </div>
        </header>

        <main className="psych-layout-main" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default PsychologistLayout
