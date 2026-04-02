import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { worker, todaysRisk } from '../data/mockData'
import { useEffect, useState } from 'react'

const quickActions = [
  { icon: 'description',  label: 'File Claim',  to: '/app/claims'   },
  { icon: 'shield',       label: 'View Plans',  to: '/app/coverage' },
  { icon: 'location_on',  label: 'Risk Map',    to: '/app/riskmap'  },
  { icon: 'person',       label: 'Account',     to: '/app/profile'  },
]

const recentActivity = [
  { icon: 'check_circle', label: 'Weekly Payout Processed',     time: 'Today, 08:30 AM',     col: 'text-[#0d6e35]' },
  { icon: 'warning',      label: 'Risk Level Alert: Your Zone', time: 'Yesterday, 11:45 PM',  col: 'text-[#92600a]' },
  { icon: 'check_circle', label: 'Claim Auto-Approved',          time: '2 days ago',           col: 'text-[#0d6e35]' },
]

export default function Home() {
  const navigate = useNavigate()
  const [userPlan, setUserPlan] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) { window.location.href = '/'; return }
    if (!user.onboarded) { window.location.href = '/onboarding'; return }

    const p = localStorage.getItem('userProfile')
    if (p) setProfile(JSON.parse(p))

    const plan = localStorage.getItem('userPlan')
    if (plan) setUserPlan(JSON.parse(plan))
  }, [])

  const displayName = profile?.name || 'User'
  const coveragePerDay = userPlan?.payout || worker.coveragePerDay
  const weeklyPremium = userPlan?.amount || worker.weeklyPremium
  const planName = userPlan?.plan || worker.plan

  return (
    <div className="flex flex-col gap-8">

      {/* Page heading */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Dashboard</p>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
          Good Morning, <span className="text-primary">{displayName}.</span>
        </h1>
      </div>

      {/* Active policy hero card */}
      <div className="bg-primary rounded-xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-on-primary/15 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-on-primary mb-4">
              Active Policy · ID: MV-8829
            </div>
            <h2 className="text-2xl font-extrabold tracking-tighter text-on-primary mb-5">
              {planName} Income Shield
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-on-primary/15 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-on-primary/70 mb-1">Today's Coverage</p>
                <p className="text-2xl font-extrabold tracking-tighter text-on-primary">₹{coveragePerDay}</p>
              </div>
              <div className="bg-on-primary/15 rounded-xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-on-primary/70 mb-1">Weekly Premium</p>
                <p className="text-2xl font-extrabold tracking-tighter text-on-primary">₹{weeklyPremium}</p>
              </div>
            </div>
            {userPlan && (
              <p className="text-xs text-green-200 mt-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                Plan updated after payment
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            <button onClick={() => navigate('/app/coverage')}
              className="bg-surface-container-lowest text-primary font-bold text-sm px-6 py-3 rounded-lg transition-transform active:scale-95 whitespace-nowrap">
              Renew Coverage
            </button>
            <p className="text-xs text-on-primary/60 font-medium">Coverage active · {worker.weeksActive} weeks</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4">Quick Actions</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(a => (
            <button key={a.label} onClick={() => navigate(a.to)}
              className="flex flex-col items-start p-5 bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-xl group text-left"
            >
              <span className="material-symbols-outlined text-primary text-2xl mb-3 group-hover:scale-110 transition-transform">{a.icon}</span>
              <span className="text-sm font-bold uppercase tracking-wider text-on-surface">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Safety performance */}
        <Card>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Safety Performance</p>
          <div className="flex items-end gap-4 mb-4">
            <span className="text-6xl font-extrabold tracking-tighter text-on-surface">98.2</span>
            <span className="text-sm font-semibold text-[#0d6e35] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>+1.4% vs last week
            </span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1.5 h-16">
            {[40,55,45,65,58,72,90].map((h, i) => (
              <div key={i}
                className={`flex-1 rounded-sm transition-all ${i === 6 ? 'bg-primary' : 'bg-surface-container-high'}`}
                style={{height:`${h}%`}}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-surface-container">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Weekly Earnings</p>
              <p className="text-xl font-extrabold tracking-tighter text-on-surface">
                ₹{((profile?.earnings || 700) * 7).toLocaleString()}
              </p>
              <div className="mt-2 h-1 bg-surface-container-high rounded-full">
                <div className="h-1 bg-primary rounded-full w-3/4" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Active Hours</p>
              <p className="text-xl font-extrabold tracking-tighter text-on-surface">42.5h</p>
              <div className="mt-2 flex gap-1">
                {[1,1,1,0,0].map((f,i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${f ? 'bg-primary' : 'bg-surface-container-high'}`} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Right col */}
        <div className="flex flex-col gap-4">
          <Card label="Today's Risk">
            <div className="flex flex-col gap-3">
              {todaysRisk.map(r => (
                <div key={r.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-lg">{r.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{r.name}</p>
                      <p className="text-xs text-on-surface-variant">{r.sub}</p>
                    </div>
                  </div>
                  <Badge label={r.level} color={r.color} />
                </div>
              ))}
            </div>
          </Card>

          <Card label="Recent Activity">
            <div className="flex flex-col gap-4">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`material-symbols-outlined text-lg mt-0.5 ${a.col}`}
                    style={{fontVariationSettings:"'FILL' 1"}}>{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-on-surface truncate">{a.label}</p>
                    <p className="text-xs text-on-surface-variant">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Coverage status */}
      <Card label="Coverage Status">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { k: 'Total Protected', v: `₹${worker.totalProtected.toLocaleString()}`, color: 'text-primary' },
            { k: 'Claims Paid',     v: worker.claimsPaid,                             color: 'text-on-surface' },
            { k: 'Active Weeks',    v: `${worker.weeksActive}`,                       color: 'text-on-surface' },
            { k: 'Claim Approval',  v: '99.9%',                                       color: 'text-[#0d6e35]'  },
          ].map(s => (
            <div key={s.k} className="flex items-center justify-between py-3 border-b border-surface-container lg:border-0">
              <span className="text-sm text-on-surface-variant font-medium">{s.k}</span>
              <span className={`text-sm font-extrabold ${s.color}`}>{s.v}</span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
