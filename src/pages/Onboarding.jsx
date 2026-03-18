import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const steps = [
  { num: '01', label: 'Personal',  sub: 'CURRENT STEP' },
  { num: '02', label: 'Zone',      sub: 'UPCOMING' },
  { num: '03', label: 'Coverage',  sub: 'FINAL STEP' },
]
const platforms = ['🍔 Zomato', '🛵 Swiggy', '📦 Others']

export default function Onboarding() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(['🍔 Zomato', '🛵 Swiggy'])
  const toggle = p => setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Minimal header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            EXIT APPLICATION <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 grid lg:grid-cols-[280px_1fr] gap-12">

        {/* Left sidebar — steps */}
        <aside className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-6">Application Progress</p>
          <div className="flex flex-col gap-4 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className={`flex items-center gap-4 ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  {s.num}
                </div>
                <div>
                  <div className={`text-sm font-bold ${i === 0 ? 'text-primary' : 'text-on-surface'}`}>{s.label}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="bg-surface-container-low rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Secure Verification</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Your information is protected with industry-standard 256-bit encryption. We only use your data to provide accurate insurance quotes.</p>
          </div>
        </aside>

        {/* Form */}
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface mb-3">
            Tell us about yourself.
          </h1>
          <p className="text-on-surface-variant font-medium mb-10">Let's start with the basics to build your personalized protection plan.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[
              { label: 'FULL NAME', placeholder: 'Ravi Kumar', type: 'text' },
              { label: 'PHONE NUMBER', placeholder: '+91 98765 43210', type: 'tel' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.placeholder}
                  className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">CITY</label>
              <select className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                <option>Bangalore</option><option>Chennai</option><option>Mumbai</option><option>Delhi</option><option>Hyderabad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">DELIVERY ZONE</label>
              <select className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                <option>Koramangala</option><option>Indiranagar</option><option>HSR Layout</option><option>Whitefield</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">AVG DAILY EARNINGS (₹)</label>
              <input type="number" defaultValue="700" className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">HOURS PER DAY</label>
              <select className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                <option>4–6 hours</option><option selected>6–10 hours</option><option>10+ hours</option>
              </select>
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">PLATFORM</label>
            <div className="flex gap-3 flex-wrap">
              {platforms.map(p => (
                <button key={p} onClick={() => toggle(p)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                    ${selected.includes(p) ? 'bg-primary text-on-primary shadow-blue' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => navigate('/plan')} className="flex items-center gap-2 bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 mb-4">
            Continue to Step 02 <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <p className="text-xs text-on-surface-variant">By continuing, you agree to our <a href="#" className="text-primary underline">Privacy Policy</a> and <a href="#" className="text-primary underline">Terms of Service</a>.</p>
        </div>

      </main>
    </div>
  )
}
