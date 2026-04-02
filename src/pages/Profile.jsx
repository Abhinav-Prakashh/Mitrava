import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

export default function Profile() {
  const navigate = useNavigate()

  const profile = JSON.parse(localStorage.getItem('userProfile') || 'null')
  const userPlan = JSON.parse(localStorage.getItem('userPlan') || 'null')
  const initial = profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'

  const planName = userPlan?.plan || 'Standard'
  const weeklyPremium = userPlan?.amount || 49
  const coveragePerDay = userPlan?.payout || 500

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const menuSections = [
    {
      label: 'Coverage',
      items: [
        { icon: 'shield',        label: 'My Policy',      sub: `${planName} · ₹${weeklyPremium}/week`, to: '/app/coverage' },
        { icon: 'description',   label: 'Claim History',  sub: 'View all claims',                       to: '/app/claims'   },
        { icon: 'location_on',   label: 'Risk Map',       sub: 'Your zone risk data',                   to: '/app/riskmap'  },
      ],
    },
    {
      label: 'Account',
      items: [
        { icon: 'edit',          label: 'Edit Profile',   sub: 'Update your details',                   to: '/app/edit-profile' },
        { icon: 'payments',      label: 'Payment Method', sub: 'UPI · Linked',                          to: null },
        { icon: 'notifications', label: 'Notifications',  sub: 'All alerts on',                         to: null },
        { icon: 'security',      label: 'Security',       sub: '2FA enabled',                           to: null },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-8">

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Account</p>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
          {profile?.name || 'User'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile hero */}
        <div className="flex flex-col gap-4">
          <div className="bg-primary rounded-xl p-8">
            <div className="w-20 h-20 rounded-full bg-on-primary/20 border-4 border-on-primary/30 flex items-center justify-center text-3xl font-extrabold text-on-primary mx-auto mb-5">
              {initial}
            </div>
            <div className="text-center mb-6">
              <p className="text-xl font-extrabold tracking-tighter text-on-primary mb-1">{profile?.name || 'User'}</p>
              <p className="text-sm text-on-primary/70 font-medium">{profile?.platforms?.join(' · ') || 'No platforms'}</p>
              <p className="text-sm text-on-primary/70 font-medium">📍 {profile?.zone}, {profile?.city}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: `₹${profile?.earnings || 0}`, label: 'Daily'  },
                { val: profile?.hours?.split('–')[0] + 'h' || '-',    label: 'Hours'  },
                { val: profile?.state?.slice(0, 3) || profile?.city?.slice(0,3) || '-', label: 'State' },
              ].map(s => (
                <div key={s.label} className="bg-on-primary/15 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold tracking-tighter text-on-primary">{s.val}</p>
                  <p className="text-xs text-on-primary/60 font-bold uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plan card — dynamic */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Current Plan</p>
                <p className="text-base font-extrabold tracking-tighter text-on-surface">⚡ {planName} Shield</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold tracking-tighter text-primary">₹{weeklyPremium}</p>
                <p className="text-xs text-on-surface-variant font-medium">/ week</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-surface-container text-sm">
              <span className="text-on-surface-variant">Max daily payout</span>
              <span className="font-bold text-on-surface">₹{coveragePerDay}</span>
            </div>
            <button onClick={() => navigate('/plan')}
              className="w-full mt-4 py-3 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-blue transition-transform active:scale-95">
              Change Plan
            </button>
          </Card>
        </div>

        {/* Menu + details */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Account details */}
          <Card label="Your Details">
            <div className="flex flex-col">
              {[
                { k: 'Full Name', v: profile?.name },
                { k: 'Phone',     v: profile?.phone },
                { k: 'State',     v: profile?.state },
                { k: 'City',      v: profile?.city  },
                { k: 'Zone',      v: profile?.zone  },
                { k: 'Platforms', v: profile?.platforms?.join(', ') },
                { k: 'Earnings',  v: `₹${profile?.earnings}/day` },
                { k: 'Hours',     v: profile?.hours },
              ].map(row => (
                <div key={row.k} className="flex items-center justify-between py-3 border-b border-surface-container last:border-0 text-sm">
                  <span className="text-on-surface-variant font-medium">{row.k}</span>
                  <span className="font-bold text-on-surface">{row.v || '—'}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/app/edit-profile')}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              <span className="material-symbols-outlined text-base">edit</span>
              Edit Profile
            </button>
          </Card>

          {/* Menu sections */}
          {menuSections.map(section => (
            <Card key={section.label} label={section.label}>
              <div className="flex flex-col">
                {section.items.map((item, i) => (
                  <button key={item.label}
                    onClick={() => item.to && navigate(item.to)}
                    className={`flex items-center gap-4 px-2 py-4 rounded-xl transition-colors text-left
                      ${item.to ? 'hover:bg-surface-container-low cursor-pointer' : 'cursor-default'}
                      ${i < section.items.length - 1 ? 'border-b border-surface-container' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-base text-primary">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-on-surface">{item.label}</p>
                      {item.sub && <p className="text-xs text-on-surface-variant">{item.sub}</p>}
                    </div>
                    {item.to && <span className="material-symbols-outlined text-on-surface-variant text-base">chevron_right</span>}
                  </button>
                ))}
              </div>
            </Card>
          ))}

          {/* Danger Zone — logout */}
          <Card label="Danger Zone">
            <button onClick={handleLogout}
              className="flex items-center gap-3 w-full px-2 py-4 rounded-xl hover:bg-error-container transition-colors text-left group">
              <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-base text-error">logout</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-error">Log Out</p>
                <p className="text-xs text-on-surface-variant">Sign out of your account</p>
              </div>
              <span className="material-symbols-outlined text-error text-base">chevron_right</span>
            </button>
          </Card>

        </div>
      </div>
    </div>
  )
}
