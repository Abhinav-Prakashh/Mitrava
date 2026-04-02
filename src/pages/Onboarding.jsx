import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { statesAndCities, states, getZones } from '../data/cities'

const steps = [
  { num: '01', label: 'Personal',     sub: 'CURRENT STEP' },
  { num: '02', label: 'Verification', sub: 'UPCOMING'     },
  { num: '03', label: 'Coverage',     sub: 'FINAL STEP'   },
]

const platforms = ['🍔 Zomato', '🛵 Swiggy', '📦 Others']

export default function Onboarding() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    state: 'Karnataka',
    city: 'Bangalore',
    zone: 'Koramangala',
    earnings: 700,
    hours: '6–10 hours',
  })
  const [selected, setSelected] = useState(['🍔 Zomato', '🛵 Swiggy'])

  const toggle = p => setSelected(prev =>
    prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
  )

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'state') {
      const firstCity = statesAndCities[value]?.[0] || ''
      const firstZone = getZones(firstCity)[0] || 'Zone 1'
      setForm({ ...form, state: value, city: firstCity, zone: firstZone })
    } else if (name === 'city') {
      const firstZone = getZones(value)[0] || 'Zone 1'
      setForm({ ...form, city: value, zone: firstZone })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = () => {
    if (!form.name.trim()) { alert('Please enter your name'); return }
    if (!form.phone || !/^[6-9]\d{9}$/.test(form.phone)) { alert('Enter a valid 10-digit phone number'); return }
    if (selected.length === 0) { alert('Please select at least one platform'); return }
    navigate('/otp', { state: { profile: { ...form, platforms: selected } } })
  }

  const availableCities = statesAndCities[form.state] || []
  const availableZones = getZones(form.city)

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            EXIT APPLICATION <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 grid lg:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-6">Application Progress</p>
          <div className="flex flex-col gap-4 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className={`flex items-center gap-4 ${i === 0 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  {s.num}
                </div>
                <div>
                  <div className={`text-sm font-bold ${i === 0 ? 'text-primary' : 'text-on-surface'}`}>{s.label}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-container-low rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-primary text-lg">verified_user</span>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Secure Verification</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your information is protected with 256-bit encryption.
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="max-w-2xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface mb-3">Tell us about yourself.</h1>
          <p className="text-on-surface-variant font-medium mb-10">Let's build your personalized protection plan.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
              <input name="name" type="text" value={form.name} onChange={handleChange} 
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Phone Number</label>
              <div className="flex gap-2">
                <span className="px-3 py-3.5 bg-surface-container-highest rounded-lg text-sm font-bold text-on-surface-variant flex-shrink-0">+91</span>
                <input name="phone" type="tel" maxLength={10} value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value.replace(/\D/g,'')})}
                  placeholder="XXXXX XXXXX"
                  className="flex-1 px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">State</label>
              <select name="state" value={form.state} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">City</label>
              <select name="city" value={form.city} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                {availableCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Delivery Zone</label>
              <select name="zone" value={form.zone} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                {availableZones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Avg Daily Earnings (₹)</label>
              <input name="earnings" type="number" value={form.earnings} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Hours Per Day</label>
              <select name="hours" value={form.hours} onChange={handleChange}
                className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all appearance-none">
                <option>4–6 hours</option>
                <option>6–10 hours</option>
                <option>10+ hours</option>
              </select>
            </div>

          </div>

          <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Platform</label>
            <div className="flex gap-3 flex-wrap">
              {platforms.map(p => (
                <button key={p} onClick={() => toggle(p)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                    ${selected.includes(p) ? 'bg-primary text-on-primary shadow-blue' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 mb-4">
            Continue to Verification
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
          <p className="text-xs text-on-surface-variant">
            By continuing, you agree to our <a href="#" className="text-primary underline">Privacy Policy</a> and <a href="#" className="text-primary underline">Terms of Service</a>.
          </p>
        </div>
      </main>
    </div>
  )
}
