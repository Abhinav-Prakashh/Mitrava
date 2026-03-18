import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { plans } from '../data/mockData'

export default function Coverage() {
  const [selected, setSelected] = useState('standard')
  const [billing, setBilling] = useState('weekly')
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-8">

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Insurance for Innovators</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
            Protection for the<br /><span className="text-primary">Urban Delivery Partner.</span>
          </h1>
        </div>
        <div className="inline-flex border border-surface-container-highest rounded-lg overflow-hidden self-start lg:self-auto">
          {['Weekly','Monthly'].map(b => (
            <button key={b} onClick={() => setBilling(b.toLowerCase())}
              className={`px-6 py-2.5 text-sm font-bold transition-colors
                ${billing === b.toLowerCase() ? 'bg-on-surface text-surface' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} onClick={() => setSelected(plan.id)}
            className={`relative rounded-xl p-8 cursor-pointer transition-all
              ${selected === plan.id
                ? 'bg-surface-container-lowest shadow-soft ring-2 ring-primary'
                : 'bg-surface-container-low hover:bg-surface-container-high'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap">
                Recommended
              </div>
            )}
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">{plan.name}</p>
            <div className="text-5xl font-extrabold tracking-tighter text-on-surface mb-1">
              ₹{plan.weeklyPrice}
              <span className="text-base font-semibold text-on-surface-variant">/wk</span>
            </div>
            <p className="text-sm text-on-surface-variant mb-1">Max payout: <strong className="text-on-surface">₹{plan.maxDailyPayout}/day</strong></p>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              {plan.id === 'basic' && 'Essential coverage for the focused minimalist.'}
              {plan.id === 'standard' && 'Comprehensive shield for active metropolitan careers.'}
              {plan.id === 'premium' && 'The ultimate monolithic protection for industry leaders.'}
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all
                ${plan.popular
                  ? 'bg-primary text-on-primary shadow-blue'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'}`}
              onClick={() => navigate('/app/home')}
            >
              {plan.popular ? 'Secure Coverage' : `Select ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10 border-t border-surface-container">
        {[
          { val: '99.9%', label: 'Claims Approval' },
          { val: '140+',  label: 'Cities Covered'  },
          { val: '~4min', label: 'Response Target'  },
          { val: '₹2Cr+', label: 'Income Protected' },
        ].map(s => (
          <div key={s.label}>
            <div className="text-4xl font-extrabold tracking-tighter text-primary mb-1">{s.val}</div>
            <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom feature section */}
      <div className="grid lg:grid-cols-2 gap-8 py-8 border-t border-surface-container items-center">
        <div className="bg-surface-container-low rounded-xl aspect-video flex items-center justify-center">
          <span className="text-8xl">🛡️</span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Material Strength</p>
          <h2 className="text-3xl font-extrabold tracking-tighter text-on-surface mb-4">
            Designed for the Modern Monolith.
          </h2>
          <p className="text-on-surface-variant font-medium leading-relaxed mb-6">
            We understand that your income is your lifeline. Mitrava isn't just an insurance policy — it's a structural foundation that ensures your earning momentum is never compromised by the unexpected.
          </p>
          {['Automated disruption detection','Zero-touch claim processing','Instant UPI payout'].map(f => (
            <div key={f} className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
              <span className="text-sm font-medium text-on-surface-variant">{f}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
