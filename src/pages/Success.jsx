import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Success() {
  const { state } = useNavigate()
  const { state: paymentData } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!paymentData?.txnId) navigate('/app/home')
  }, [])

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#d4f5e2] flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-4xl text-[#0d6e35]"
              style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#0d6e35] mb-2">Payment Successful</p>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">You're covered.</h1>
          <p className="text-on-surface-variant font-medium mt-2">
            Your {paymentData?.plan} Shield is now active.
          </p>
        </div>

        {/* Receipt */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-soft mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-4">Receipt</p>
          {[
            { k: 'Transaction ID', v: paymentData?.txnId,               vc: 'font-mono text-xs'    },
            { k: 'Plan',           v: `${paymentData?.plan} Shield`,     vc: ''                     },
            { k: 'Amount Paid',    v: `₹${paymentData?.amount}/week`,    vc: 'text-primary font-extrabold text-lg tracking-tighter' },
            { k: 'Max Payout',     v: `₹${paymentData?.payout}/day`,     vc: ''                     },
            { k: 'Date',           v: paymentData?.date,                 vc: ''                     },
            { k: 'Status',         v: 'Success',                         vc: 'text-[#0d6e35]'       },
          ].map(row => (
            <div key={row.k} className="flex justify-between items-center py-3 border-b border-surface-container last:border-0 text-sm">
              <span className="text-on-surface-variant font-medium">{row.k}</span>
              <span className={`font-bold text-on-surface ${row.vc}`}>{row.v}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <button onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-surface-container-low text-on-surface font-bold text-sm rounded-lg hover:bg-surface-container-high transition-colors">
            <span className="material-symbols-outlined text-base">receipt_long</span>
            Receipt
          </button>
          <button onClick={() => navigate('/app/home')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-on-primary font-bold text-sm rounded-lg shadow-blue transition-transform active:scale-95">
            <span className="material-symbols-outlined text-base">home</span>
            Dashboard
          </button>
        </div>

      </div>
    </div>
  )
}
