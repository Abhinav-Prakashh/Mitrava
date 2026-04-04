import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { plans } from '../data/mockData'
import { calculateDynamicPremium } from '../utils/premiumEngine'

export default function PlanSelection() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('standard')
  const [billing, setBilling] = useState('weekly')
  const [showBreakdown, setShowBreakdown] = useState(null)

  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const weeksActive = parseInt(localStorage.getItem('weeksActive') || '0')

  // Calculate dynamic premium for each plan
  const dynamicPlans = plans.map(plan => {
    const result = calculateDynamicPremium(plan.weeklyPrice, profile, weeksActive)
    return { ...plan, ...result }
  })

  const selectedPlan = dynamicPlans.find(p => p.id === selected)

  const handleContinue = () => {
    if (!selectedPlan) return
    navigate('/app/payment', {
      state: {
        ...selectedPlan,
        weeklyPrice: selectedPlan.finalPremium, // use dynamic price
      }
    })
  }

  const highlightColor = {
    red:     'text-error',
    green:   'text-[#0d6e35]',
    yellow:  'text-[#92600a]',
    neutral: 'text-on-surface-variant',
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <button onClick={() => navigate('/onboarding')}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            EXIT APPLICATION <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-12">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Insurance for Innovators</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
              Protection for the<br /><span className="text-primary">Urban Delivery Partner.</span>
            </h1>
          </div>
          <div className="inline-flex border border-surface-container-highest rounded-lg overflow-hidden self-start lg:self-auto">
            {['weekly','monthly'].map(b => (
              <button key={b} onClick={() => setBilling(b)}
                className={`px-6 py-2.5 text-sm font-bold capitalize transition-colors
                  ${billing === b ? 'bg-on-surface text-surface' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
                {b.charAt(0).toUpperCase()+b.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Zone + risk info banner */}
        {profile?.zone && (
          <div className={`mb-8 rounded-xl px-5 py-4 flex items-center gap-3 text-sm font-medium
            ${selectedPlan?.riskLevel === 'High' ? 'bg-error-container text-error' :
              selectedPlan?.riskLevel === 'Low'  ? 'bg-[#d4f5e2] text-[#0d6e35]' :
              'bg-surface-container-low text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-base">location_on</span>
            <span>
              Your zone: <strong>{profile.zone}, {profile.city}</strong> ·{' '}
              {selectedPlan?.zoneData
                ? `${selectedPlan.zoneData.disruptions} disruption days/month · ${selectedPlan.zoneData.reason}`
                : 'Standard risk zone'
              }
            </span>
            <span className={`ml-auto font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wide
              ${selectedPlan?.riskLevel === 'High' ? 'bg-error text-white' :
                selectedPlan?.riskLevel === 'Low'  ? 'bg-[#0d6e35] text-white' :
                'bg-on-surface text-surface'}`}>
              {selectedPlan?.riskLevel} Risk
            </span>
          </div>
        )}

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {dynamicPlans.map(plan => (
            <div key={plan.id} onClick={() => setSelected(plan.id)}
              className={`relative rounded-xl p-8 cursor-pointer transition-all
                ${selected === plan.id
                  ? 'bg-surface-container-lowest ring-2 ring-primary shadow-soft'
                  : 'bg-surface-container-low hover:bg-surface-container-high'}`}>

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full whitespace-nowrap">
                  Recommended
                </div>
              )}

              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">{plan.name}</p>

              {/* Dynamic price */}
              <div className="mb-1">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-extrabold tracking-tighter text-on-surface">
                    ₹{billing === 'weekly' ? plan.finalPremium : plan.finalPremium * 4}
                  </span>
                  <span className="text-base font-semibold text-on-surface-variant mb-1">
                    /{billing === 'weekly' ? 'wk' : 'mo'}
                  </span>
                </div>
                {/* Show base vs dynamic */}
                {plan.finalPremium !== plan.basePremium && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-on-surface-variant line-through">₹{plan.basePremium}</span>
                    {plan.savings > 0
                      ? <span className="text-xs font-bold text-[#0d6e35] bg-[#d4f5e2] px-2 py-0.5 rounded-full">Save ₹{plan.savings}</span>
                      : <span className="text-xs font-bold text-error bg-error-container px-2 py-0.5 rounded-full">+₹{plan.finalPremium - plan.basePremium} zone risk</span>
                    }
                  </div>
                )}
              </div>

              <p className="text-sm text-on-surface-variant mb-4">
                Max payout: <strong className="text-on-surface">₹{plan.maxDailyPayout}/day</strong>
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {(plan.features || []).map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Breakdown toggle */}
              <button
                onClick={e => { e.stopPropagation(); setShowBreakdown(showBreakdown === plan.id ? null : plan.id) }}
                className="w-full flex items-center justify-center gap-1 text-xs font-bold text-primary mb-4 hover:underline"
              >
                <span className="material-symbols-outlined text-sm">calculate</span>
                {showBreakdown === plan.id ? 'Hide' : 'Show'} price breakdown
              </button>

              {/* Price breakdown */}
              {showBreakdown === plan.id && (
                <div className="bg-surface-container-low rounded-xl p-4 mb-4 flex flex-col gap-3">
                  {plan.breakdown.map((b, i) => (
                    <div key={i} className="flex flex-col gap-0.5">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-on-surface">{b.label}</span>
                        <span className={`text-xs font-extrabold ${highlightColor[b.highlight]}`}>{b.value}</span>
                      </div>
                      <span className="text-xs text-on-surface-variant">{b.note}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-surface-container flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface">Final Weekly Premium</span>
                    <span className="text-sm font-extrabold tracking-tighter text-primary">₹{plan.finalPremium}</span>
                  </div>
                </div>
              )}

              <button
                onClick={e => { e.stopPropagation(); navigate('/app/payment', { state: { ...plan, weeklyPrice: plan.finalPremium } }) }}
                className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all
                  ${plan.popular ? 'bg-primary text-on-primary shadow-blue' : 'bg-surface-container-highest text-on-surface hover:bg-surface-container'}`}>
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

        <div className="text-center mt-4">
          <button onClick={handleContinue}
            className="bg-primary text-on-primary font-bold px-10 py-4 rounded-lg shadow-blue transition-transform active:scale-95 inline-flex items-center gap-2">
            Continue with {selectedPlan?.name} — ₹{selectedPlan?.finalPremium}/wk
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>

      </main>
    </div>
  )
}
