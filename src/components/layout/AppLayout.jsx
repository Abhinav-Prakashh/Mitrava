import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { worker } from '../../data/mockData'

const navItems = [
  { to: '/app/home',     icon: 'home',          label: 'Home' },
  { to: '/app/coverage', icon: 'shield',         label: 'Coverage' },
  { to: '/app/claims',   icon: 'description',    label: 'Claims' },
  { to: '/app/riskmap',  icon: 'location_on',    label: 'Risk Map' },
  { to: '/app/profile',  icon: 'person',         label: 'Profile' },
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* Glass topbar */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-on-surface-variant hover:text-primary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-surface-container-high rounded-xl transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-xl">notifications</span>
            </button>
            <button
              onClick={() => navigate('/app/profile')}
              className="w-9 h-9 rounded-full bg-primary text-on-primary font-bold text-sm flex items-center justify-center"
            >
              R
            </button>
            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 hover:bg-surface-container-high rounded-xl transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown nav */}
        {open && (
          <div className="lg:hidden border-t border-surface-container-high bg-surface-container-lowest px-6 py-4 flex flex-col gap-1">
            {navItems.map(item => (
              <NavLink key={item.to} to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive ? 'bg-surface-container-low text-primary' : 'text-on-surface-variant hover:bg-surface-container-low'}`
                }
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* Page */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-8 pb-28 lg:pb-10">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-surface-container-high z-40 px-2 py-2 pb-4">
        <div className="flex justify-around max-w-sm mx-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${isActive ? 'text-primary' : 'text-on-surface-variant'}`
              }
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

    </div>
  )
}
