import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { claimTimeline } from '../data/mockData'

const disruptions = [
  { icon: 'traffic',        label: 'Heavy Rain Alert',   sub: 'Koramangala · 80mm/hr', time: '2m ago', critical: true  },
  { icon: 'construction',   label: 'Zone Closure',        sub: 'HSR Layout · Strike',  time: '1h ago', critical: false },
]

export default function Claims() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8">

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Claims & Alerts</p>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
          Real-time disruption<br /><span className="text-primary">monitoring.</span>
        </h1>
      </div>

      {/* Critical alert */}
      <div className="bg-error-container rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-lg" style={{fontVariationSettings:"'FILL' 1"}}>warning</span>
            <span className="text-xs font-bold uppercase tracking-wider text-error">Critical Alert</span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">2m ago</span>
        </div>
        <h3 className="text-xl font-extrabold tracking-tighter text-on-surface mb-2">Active Disruption Detected</h3>
        <p className="text-sm text-on-surface-variant font-medium mb-5">
          Heavy rain 80mm/hr in Koramangala exceeds threshold. Parametric claim has been automatically initiated. No action required.
        </p>
        <button className="bg-error text-white font-bold text-sm px-6 py-3 rounded-lg transition-transform active:scale-95">
          View Affected Zone
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Timeline — takes 2 cols */}
        <div className="lg:col-span-2">
          <Card label={`Active Claim: #MT-8842`}>
            <div className="flex items-center gap-3 mb-6">
              <Badge label="In Review" color="blue" />
              <span className="text-xs text-on-surface-variant font-medium">AI processing · ~4 min avg</span>
            </div>
            <div className="flex flex-col">
              {claimTimeline.map((item, i) => (
                <div key={item.id} className="flex gap-4 pb-8 relative">
                  {i < claimTimeline.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-px bg-surface-container-high" />
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10
                    ${item.status === 'green' ? 'bg-[#d4f5e2]' : 'bg-surface-container-low'}`}>
                    <span className={`material-symbols-outlined text-base
                      ${item.status === 'green' ? 'text-[#0d6e35]' : 'text-primary'}`}
                      style={item.status === 'green' ? {fontVariationSettings:"'FILL' 1"} : {}}>
                      {item.status === 'green' ? 'check_circle' : item.icon === '📍' ? 'location_on' : item.icon === '🌧️' ? 'rainy' : 'payments'}
                    </span>
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="text-sm font-bold text-on-surface mb-0.5">{item.title}</p>
                    <p className="text-xs text-on-surface-variant mb-1">{item.desc}</p>
                    {item.amount && (
                      <p className="text-2xl font-extrabold tracking-tighter text-[#0d6e35]">{item.amount}</p>
                    )}
                    <p className="text-xs text-on-surface-variant/60 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">

          {/* Summary */}
          <Card label="Claim Summary">
            {[
              { k: 'Trigger',   v: 'Heavy Rain',    vc: '' },
              { k: 'Zone',      v: 'Koramangala',   vc: '' },
              { k: 'Duration',  v: '4 hours',       vc: '' },
              { k: 'Coverage',  v: '75% (Full)',     vc: '' },
              { k: 'Method',    v: 'UPI · Ravi@ybl', vc: '' },
              { k: 'Payout',    v: '₹500',          vc: 'text-[#0d6e35] text-xl font-extrabold tracking-tighter' },
              { k: 'Status',    v: 'Paid',           badge: true },
            ].map(row => (
              <div key={row.k} className="flex justify-between items-center py-3 border-b border-surface-container last:border-0 text-sm">
                <span className="text-on-surface-variant font-medium">{row.k}</span>
                {row.badge
                  ? <Badge label={row.v} color="green" />
                  : <span className={`font-bold text-on-surface ${row.vc}`}>{row.v}</span>
                }
              </div>
            ))}
          </Card>

          {/* Disruption feed */}
          <Card label="Disruption Feed">
            <div className="flex flex-col gap-4">
              {disruptions.map((d, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-base">{d.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface">{d.label}</p>
                    <p className="text-xs text-on-surface-variant truncate">{d.sub}</p>
                  </div>
                  {d.critical
                    ? <Badge label="Live" color="red" />
                    : <span className="text-xs text-on-surface-variant whitespace-nowrap">{d.time}</span>
                  }
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* FAB for mobile */}
      <button
        onClick={() => navigate('/app/claims')}
        className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-blue flex items-center justify-center z-30"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

    </div>
  )
}
