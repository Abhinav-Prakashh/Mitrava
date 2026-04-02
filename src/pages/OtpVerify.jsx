import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerUser } from '../useUser'

export default function OtpVerify() {
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const profileData = location.state?.profile

  useEffect(() => {
    if (!profileData) { navigate('/onboarding'); return }
  }, [])

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleInput = (val, index) => {
    if (!/^\d?$/.test(val)) return
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    setError('')
    if (val && index < 3) document.getElementById(`otp-${index + 1}`)?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0)
      document.getElementById(`otp-${index - 1}`)?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 4) { setError('Enter the complete 4-digit OTP'); return }
    if (code !== '1234') { setError('Invalid OTP. Use 1234 for demo.'); return }

    setLoading(true)
    setError('')

    // Register user in Supabase
    const { user, error: dbError } = await registerUser(profileData)

    if (dbError) {
      // If duplicate phone — user might already exist, just proceed
      console.warn('Register error:', dbError.message)
    }

    // Save to localStorage
    if (user) {
      localStorage.setItem('mitrava_user_id', user.id)
    }
    localStorage.setItem('userProfile', JSON.stringify(profileData))
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}')
    localStorage.setItem('user', JSON.stringify({ ...existingUser, onboarded: true }))

    setLoading(false)
    navigate('/plan')
  }

  const handleResend = () => {
    if (timer > 0) return
    setTimer(30)
    setOtp(['', '', '', ''])
    setError('')
    document.getElementById('otp-0')?.focus()
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <button onClick={() => navigate('/onboarding')}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            BACK <span className="material-symbols-outlined text-base">arrow_back</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 py-10 grid lg:grid-cols-[280px_1fr] gap-12">

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-6">Application Progress</p>
          <div className="flex flex-col gap-4 mb-8">
            {[
              { num: '01', label: 'Personal',     sub: 'COMPLETED',    done: true  },
              { num: '02', label: 'Verification', sub: 'CURRENT STEP', done: false },
              { num: '03', label: 'Coverage',     sub: 'FINAL STEP',   done: false },
            ].map((s, i) => (
              <div key={s.num} className={`flex items-center gap-4 ${i > 1 ? 'opacity-40' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${s.done ? 'bg-[#0d6e35] text-white' : i === 1 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                  {s.done
                    ? <span className="material-symbols-outlined text-base" style={{fontVariationSettings:"'FILL' 1"}}>check</span>
                    : s.num}
                </div>
                <div>
                  <div className={`text-sm font-bold ${i === 1 ? 'text-primary' : s.done ? 'text-[#0d6e35]' : 'text-on-surface'}`}>{s.label}</div>
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
              Your OTP is valid for 10 minutes. Never share it with anyone including Mitrava support.
            </p>
          </div>
        </aside>

        {/* OTP Form */}
        <div className="max-w-md">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface mb-3">Verify your number.</h1>
          <p className="text-on-surface-variant font-medium mb-2">We sent a 4-digit OTP to</p>
          <p className="text-on-surface font-bold text-lg mb-10">+91 {profileData?.phone || ''}</p>

          <div className="flex gap-4 mb-6">
            {otp.map((digit, i) => (
              <input key={i} id={`otp-${i}`} type="text" inputMode="numeric"
                maxLength={1} value={digit}
                onChange={e => handleInput(e.target.value, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                autoFocus={i === 0}
                className={`w-16 h-16 text-center text-2xl font-extrabold tracking-tighter rounded-xl
                  bg-surface-container-highest outline-none transition-all border-b-2
                  ${digit ? 'border-primary bg-surface-container-lowest' : 'border-transparent'}
                  focus:border-primary focus:bg-surface-container-lowest`} />
            ))}
          </div>

          {error && (
            <p className="text-sm text-error font-medium mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>{error}
            </p>
          )}

          <p className="text-xs text-on-surface-variant mb-6 bg-surface-container-low rounded-lg px-4 py-3">
            💡 Demo mode — use OTP <strong>1234</strong>
          </p>

          <button onClick={handleVerify} disabled={loading}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 w-full mb-6 disabled:opacity-70">
            {loading
              ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Registering...</>
              : <>Verify & Continue <span className="material-symbols-outlined text-base">arrow_forward</span></>}
          </button>

          <div className="text-center">
            {timer > 0
              ? <p className="text-sm text-on-surface-variant">Resend OTP in <strong>{timer}s</strong></p>
              : <button onClick={handleResend} className="text-sm text-primary font-bold hover:underline">Resend OTP</button>}
          </div>
        </div>
      </main>
    </div>
  )
}
