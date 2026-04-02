import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const navItems = [
  { to: '/app/home', label: 'Home' },
  { to: '/app/coverage', label: 'Coverage' },
  { to: '/app/claims', label: 'Claims' },
  { to: '/app/riskmap', label: 'Risk Map' },
  { to: '/app/profile', label: 'Profile' },
]

export default function AppLayout() {
  const [open, setOpen] = useState(false)
  const [initial, setInitial] = useState("U")
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("user")

    if (!user) {
      window.location.href = "/"
      return
    }

    const profileData = localStorage.getItem("userProfile")
    const profile = profileData ? JSON.parse(profileData) : null

    if (profile?.name) {
      setInitial(profile.name.charAt(0).toUpperCase())
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">

      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

          <div className="text-2xl font-bold text-blue-600">
            Mitrava
          </div>

          <nav className="hidden lg:flex gap-8">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app/home'}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/app/profile')}
              className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
            >
              {initial}
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden"
            >
              {open ? 'X' : '≡'}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden px-6 py-4 flex flex-col gap-2 bg-white">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

    </div>
  )
}