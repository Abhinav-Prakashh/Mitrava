import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { worker } from '../data/mockData'

const menuSections = [
  {
    label: 'Coverage',
    items: [
      { icon: 'shield',       label: 'My Policy',      sub: `${worker.plan} · ₹${worker.weeklyPremium}/week`, to: '/app/coverage' },
      { icon: 'description',  label: 'Claim History',  sub: `${worker.claimsPaid} claims processed`,           to: '/app/claims'   },
      { icon: 'location_on',  label: 'Risk Map',       sub: 'Koramangala · High Risk Zone',                    to: '/app/riskmap'  },
    ],
  },
  {
    label: 'Account',
    items: [
      { icon: 'payments',     label: 'Payment Method', sub: 'UPI · Ravi@ybl',   to: null },
      { icon: 'notifications',label: 'Notifications',  sub: 'All alerts on',    to: null },
      { icon: 'language',     label: 'Language',       sub: 'English',          to: null },
      { icon: 'security',     label: 'Security',       sub: '2FA enabled',      to: null },
    ],
  },
  {
    label: 'Support',
    items: [
      { icon: 'help',         label: 'Help Center',    sub: 'FAQs and guides',  to: null },
      { icon: 'headset_mic',  label: 'Contact Support',sub: 'Available 24/7',   to: null },
      { icon: 'logout',       label: 'Log Out',        sub: '',                 to: '/', danger: true },
    ],
  },
]

export default function Profile() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8">

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Account</p>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
          {worker.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile card */}
        <div className="flex flex-col gap-4">
          <div className="bg-primary rounded-xl p-8">
            <div className="w-20 h-20 rounded-full bg-on-primary/20 border-4 border-on-primary/30 flex items-center justify-center text-3xl font-extrabold text-on-primary mx-auto mb-5">
              R
            </div>
            <div className="text-center mb-6">
              <p className="text-xl font-extrabold tracking-tighter text-on-primary mb-1">{worker.name}</p>
              <p className="text-sm text-on-primary/70 font-medium">🍔 Zomato · 🛵 Swiggy</p>
              <p className="text-sm text-on-primary/70 font-medium">📍 {worker.zone}, {worker.city}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: `₹${(worker.totalProtected/1000).toFixed(1)}k`, label: 'Protected' },
                { val: worker.claimsPaid,                              label: 'Claims'    },
                { val: `${worker.weeksActive}wk`,                      label: 'Active'    },
              ].map(s => (
                <div key={s.label} className="bg-on-primary/15 rounded-xl p-3 text-center">
                  <p className="text-lg font-extrabold tracking-tighter text-on-primary">{s.val}</p>
                  <p className="text-xs text-on-primary/60 font-bold uppercase tracking-wide mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current plan */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Current Plan</p>
                <p className="text-base font-extrabold tracking-tighter text-on-surface">⚡ {worker.plan} Shield</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold tracking-tighter text-primary">₹{worker.weeklyPremium}</p>
                <p className="text-xs text-on-surface-variant font-medium">/ week</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/app/coverage')}
              className="w-full mt-4 py-3 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-blue transition-transform active:scale-95"
            >
              Manage Plan
            </button>
          </Card>
        </div>

        {/* Menu sections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {menuSections.map(section => (
            <Card key={section.label} label={section.label}>
              <div className="flex flex-col">
                {section.items.map((item, i) => (
                  <button
                    key={item.label}
                    onClick={() => item.to && navigate(item.to)}
                    className={`flex items-center gap-4 px-2 py-4 rounded-xl transition-colors text-left
                      ${item.to ? 'hover:bg-surface-container-low cursor-pointer' : 'cursor-default'}
                      ${i < section.items.length - 1 ? 'border-b border-surface-container' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                      ${item.danger ? 'bg-error-container' : 'bg-surface-container-low'}`}>
                      <span className={`material-symbols-outlined text-base
                        ${item.danger ? 'text-error' : 'text-primary'}`}>{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold ${item.danger ? 'text-error' : 'text-on-surface'}`}>{item.label}</p>
                      {item.sub && <p className="text-xs text-on-surface-variant">{item.sub}</p>}
                    </div>
                    {item.to && (
                      <span className="material-symbols-outlined text-on-surface-variant text-base">chevron_right</span>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}
