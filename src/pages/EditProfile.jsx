import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { statesAndCities, states, getZones } from '../data/cities'
import { plans } from '../data/mockData'

const platformOptions = ['🍔 Zomato', '🛵 Swiggy', '📦 Others']

export default function EditProfile() {
  const navigate = useNavigate()

  const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const savedPlan = JSON.parse(localStorage.getItem('userPlan') || 'null')

  const [form, setForm] = useState({
    name:     savedProfile.name     || '',
    phone:    savedProfile.phone    || '',
    state:    savedProfile.state    || 'Karnataka',
    city:     savedProfile.city     || 'Bangalore',
    zone:     savedProfile.zone     || 'Koramangala',
    earnings: savedProfile.earnings || 700,
    hours:    savedProfile.hours    || '6–10 hours',
  })
  const [selected, setSelected] = useState(savedProfile.platforms || ['🍔 Zomato'])
  const [selectedPlan, setSelectedPlan] = useState(savedPlan?.plan || 'Standard')
  const [saved, setSaved] = useState(false)

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

  const handleSave = () => {
    if (!form.name.trim()) { alert('Name is required'); return }

    // Save updated profile
    localStorage.setItem('userProfile', JSON.stringify({ ...form, platforms: selected }))

    // Update plan if changed
    const chosenPlan = plans.find(p => p.name === selectedPlan)
    if (chosenPlan) {
      const existingPlan = JSON.parse(localStorage.getItem('userPlan') || '{}')
      localStorage.setItem('userPlan', JSON.stringify({
        ...existingPlan,
        plan: chosenPlan.name,
        amount: chosenPlan.weeklyPrice,
        payout: chosenPlan.maxDailyPayout,
      }))
    }

    setSaved(true)
    setTimeout(() => navigate('/app/profile'), 1000)
  }

  const availableCities = statesAndCities[form.state] || []
  const availableZones = getZones(form.city)

  return (
    <div className="flex flex-col gap-8 max-w-2xl">

      <div>
        <button onClick={() => navigate('/app/profile')}
          className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-4 transition-colors">
          <span className="material-symbols-outlined text-base">arrow_back</span> Back to Profile
        </button>
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Settings</p>
        <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">Edit Profile</h1>
      </div>

      {/* Personal details */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-5">Personal Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
            <input name="name" type="text" value={form.name} onChange={handleChange}
              className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Phone</label>
            <input name="phone" type="tel" value={form.phone} disabled
              className="w-full px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface-variant font-medium outline-none opacity-60 cursor-not-allowed" />
            <p className="text-xs text-on-surface-variant mt-1">Phone cannot be changed</p>
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

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">Platform</label>
            <div className="flex gap-3 flex-wrap">
              {platformOptions.map(p => (
                <button key={p} onClick={() => toggle(p)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all
                    ${selected.includes(p) ? 'bg-primary text-on-primary shadow-blue' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Plan selection */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-5">Coverage Plan</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.id} onClick={() => setSelectedPlan(plan.name)}
              className={`relative rounded-xl p-5 cursor-pointer transition-all
                ${selectedPlan === plan.name
                  ? 'ring-2 ring-primary bg-surface-container-low'
                  : 'bg-surface-container hover:bg-surface-container-high'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Recommended
                </div>
              )}
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">{plan.name}</p>
              <p className="text-2xl font-extrabold tracking-tighter text-primary mb-1">
                ₹{plan.weeklyPrice}<span className="text-sm font-normal text-on-surface-variant">/wk</span>
              </p>
              <p className="text-xs text-on-surface-variant">Max: <strong className="text-on-surface">₹{plan.maxDailyPayout}/day</strong></p>
              {selectedPlan === plan.name && (
                <div className="mt-3 flex items-center gap-1 text-primary text-xs font-bold">
                  <span className="material-symbols-outlined text-sm" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <button onClick={handleSave}
        className={`flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-lg transition-all
          ${saved
            ? 'bg-[#0d6e35] text-white'
            : 'bg-primary text-on-primary shadow-blue active:scale-95'}`}>
        {saved
          ? <><span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span> Saved!</>
          : <>Save Changes <span className="material-symbols-outlined text-base">arrow_forward</span></>
        }
      </button>

    </div>
  )
}
