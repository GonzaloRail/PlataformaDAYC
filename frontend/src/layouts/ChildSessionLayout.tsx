import { Outlet } from 'react-router-dom'
import './ChildSessionLayout.css'

export function ChildSessionLayout() {
  return (
    <div className="child-layout">
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default ChildSessionLayout
