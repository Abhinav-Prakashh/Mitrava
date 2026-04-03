import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Load Razorpay script dynamically
function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Payment() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  const plan = state || JSON.parse(localStorage.getItem('userPlan') || '{}')

  // If no plan data redirect back
  useEffect(() => {
    if (!state?.weeklyPrice) navigate('/plan')
  }, [])

  const handlePayment = async () => {
    setLoading(true)
    setError('')

    const loaded = await loadRazorpay()
    if (!loaded) {
      setError('Failed to load payment gateway. Check your internet connection.')
      setLoading(false)
      return
    }

    const options = {
      // ✅ Razorpay TEST key — replace with live key in production
      key: 'rzp_test_SZ4drmwe840tNl',

      // Amount in paise (₹1 = 100 paise)
      amount: (plan.weeklyPrice || 49) * 100,

      currency: 'INR',
      name: 'Mitrava',
      description: `${plan.name || 'Standard'} Income Shield — Weekly Plan`,

      image: '/icons/icon-192.png',

      prefill: {
        name: profile.name || '',
        contact: profile.phone ? `+91${profile.phone}` : '',
      },

      theme: {
        color: '#0056D2',
      },

      modal: {
        ondismiss: () => {
          setLoading(false)
        },
      },

      handler: function (response) {
        // ✅ Payment successful — Razorpay returns payment_id
        const paymentData = {
          plan: plan.name || 'Standard',
          amount: plan.weeklyPrice || 49,
          payout: plan.maxDailyPayout || 500,
          txnId: response.razorpay_payment_id,
          date: new Date().toLocaleString(),
          method: 'Razorpay',
        }

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem('paymentHistory') || '[]')
        existing.push(paymentData)
        localStorage.setItem('paymentHistory', JSON.stringify(existing))
        localStorage.setItem('userPlan', JSON.stringify(paymentData))

        navigate('/success', { state: paymentData })
      },
    }

    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', function (response) {
      setError(`Payment failed: ${response.error.description}`)
      setLoading(false)
    })

    rzp.open()
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate('/plan')}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-6 transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span> Back to Plans
          </button>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Checkout</p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">Payment Summary</h1>
        </div>

        {/* Plan summary card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft mb-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">Selected Plan</p>
              <p className="text-xl font-extrabold tracking-tighter text-on-surface">⚡ {plan.name || 'Standard'} Shield</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-extrabold tracking-tighter text-primary">₹{plan.weeklyPrice || 49}</p>
              <p className="text-xs text-on-surface-variant">/ week</p>
            </div>
          </div>

          {[
            { k: 'Coverage',      v: `₹${plan.maxDailyPayout || 500}/day max payout` },
            { k: 'Billing',       v: 'Weekly — auto-renews every 7 days'             },
            { k: 'Coverage for',  v: profile.name || 'You'                            },
            { k: 'Zone',          v: `${profile.zone}, ${profile.city}`               },
          ].map(row => (
            <div key={row.k} className="flex justify-between items-center py-3 border-b border-surface-container last:border-0 text-sm">
              <span className="text-on-surface-variant font-medium">{row.k}</span>
              <span className="font-bold text-on-surface">{row.v}</span>
            </div>
          ))}
        </div>

        {/* Test mode notice */}
        <div className="bg-surface-container-low rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-base mt-0.5">info</span>
          <div>
            <p className="text-xs font-bold text-on-surface mb-1">Test Mode Active</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Use card <strong>4111 1111 1111 1111</strong>, any future expiry, any CVV. No real money will be charged.
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-error-container rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-base">error</span>
            <p className="text-sm text-error font-medium">{error}</p>
          </div>
        )}

        {/* Pay button */}
        <button onClick={handlePayment} disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-primary text-on-primary font-bold py-4 rounded-lg shadow-blue transition-transform active:scale-95 disabled:opacity-70 mb-3">
          {loading
            ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Opening Razorpay...</>
            : <><span className="material-symbols-outlined text-base">lock</span> Pay ₹{plan.weeklyPrice || 49} via Razorpay</>
          }
        </button>

        <p className="text-center text-xs text-on-surface-variant flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-base">verified_user</span>
          Secured by Razorpay · 256-bit encryption
        </p>

      </div>
    </div>
  )
}
