import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { plans } from '../data/mockData'

export default function Coverage() {
  const [selected, setSelected] = useState('standard')
  const [billing, setBilling] = useState('weekly')
  const navigate = useNavigate()

  // ✅ Safety check
  if (!plans || plans.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        No plans available. Check mockData.js
      </div>
    )
  }

  // ✅ Handle select plan
  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan))
    navigate('/app/payment')
  }

  return (
    <div className="flex flex-col gap-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Insurance for Innovators
          </p>
          <h1 className="text-4xl lg:text-5xl font-extrabold">
            Protection for the<br />
            <span className="text-blue-600">Urban Delivery Partner.</span>
          </h1>
        </div>

        {/* BILLING */}
        <div className="inline-flex border rounded-lg overflow-hidden">
          {['Weekly', 'Monthly'].map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b.toLowerCase())}
              className={`px-6 py-2 text-sm font-bold
                ${billing === b.toLowerCase()
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelected(plan.id)}
            className={`rounded-xl p-6 cursor-pointer transition
              ${selected === plan.id
                ? 'border-2 border-blue-600 scale-105 shadow-lg'
                : 'border hover:shadow-md'
              }`}
          >

            {/* TAG */}
            {plan.popular && (
              <div className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full inline-block mb-2">
                Recommended
              </div>
            )}

            {/* NAME */}
            <h2 className="text-xl font-bold mb-2">
              {plan.name}
            </h2>

            {/* PRICE */}
            <p className="text-3xl font-bold mb-2">
              ₹{plan.weeklyPrice}
              <span className="text-sm text-gray-500">/week</span>
            </p>

            {/* PAYOUT */}
            <p className="text-sm text-gray-600 mb-4">
              Max payout: ₹{plan.maxDailyPayout}/day
            </p>

            {/* ✅ FIXED FEATURES (SAFE) */}
            <ul className="text-sm text-gray-600 mb-6 space-y-1">
              {(plan.features || []).map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleSelect(plan)
              }}
              className={`w-full py-2 rounded-lg font-semibold transition
                ${plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
            >
              Select Plan
            </button>

          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 border-t pt-6">
        {[
          { val: '99.9%', label: 'Claims Approval' },
          { val: '140+', label: 'Cities Covered' },
          { val: '~4min', label: 'Response Time' },
          { val: '₹2Cr+', label: 'Income Protected' },
        ].map((s, i) => (
          <div key={i}>
            <div className="text-2xl font-bold text-blue-600">
              {s.val}
            </div>
            <div className="text-xs text-gray-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}