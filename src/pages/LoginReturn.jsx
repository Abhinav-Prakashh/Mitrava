import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUserByPhone } from '../useUser'

export default function LoginReturn() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [step, setStep] = useState(1)
  const [timer, setTimer] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleSendOtp = async () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number')
      return
    }
    setLoading(true)
    setError('')
    // In production: trigger real OTP via SMS API
    // For demo: just move to step 2
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      setTimer(30)
    }, 800)
  }

  const handleOtpInput = (val, index) => {
    if (!/^\d?$/.test(val)) return
    const newOtp = [...otp]
    newOtp[index] = val
    setOtp(newOtp)
    setError('')
    if (val && index < 3) document.getElementById(`login-otp-${index + 1}`)?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0)
      document.getElementById(`login-otp-${index - 1}`)?.focus()
  }

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < 4) { setError('Enter the complete 4-digit OTP'); return }
    if (code !== '1234') { setError('Invalid OTP. Use 1234 for demo.'); return }

    setLoading(true)
    setError('')

    // Check Supabase if phone is registered
    const { user, error: dbError } = await checkUserByPhone(phone)

    if (dbError || !user) {
      // Not registered — send to onboarding
      localStorage.setItem('user', JSON.stringify({ phone, onboarded: false }))
      navigate('/onboarding')
      return
    }

    // Registered — save to localStorage and go home
    localStorage.setItem('mitrava_user_id', user.id)
    localStorage.setItem('user', JSON.stringify({ phone, onboarded: true }))
    localStorage.setItem('userProfile', JSON.stringify({
      name: user.full_name,
      phone: user.phone,
      city: user.city,
      zone: user.delivery_zone,
    }))
    setLoading(false)
    navigate('/app/home')
  }

  const handleResend = () => {
    if (timer > 0) return
    setOtp(['', '', '', ''])
    setTimer(30)
    setError('')
    document.getElementById('login-otp-0')?.focus()
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-base">arrow_back</span> Back
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {step === 1 && (
            <>
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">Welcome back.</h1>
              <p className="text-on-surface-variant font-medium mb-10">Enter your registered phone number to continue.</p>

              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Phone Number</label>
              <div className="flex gap-3 mb-4">
                <div className="px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm font-bold text-on-surface-variant flex-shrink-0">+91</div>
                <input type="tel" maxLength={10} value={phone}
                  onChange={e => { setPhone(e.target.value.replace(/\D/g, '')); setError('') }}
                  placeholder="98765 43210"
                  onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                  className="flex-1 px-4 py-3.5 bg-surface-container-highest rounded-lg text-sm text-on-surface font-medium outline-none focus:bg-surface-container-lowest border-b-2 border-transparent focus:border-primary transition-all" />
              </div>

              {error && <p className="text-sm text-error font-medium mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-base">error</span>{error}</p>}

              <p className="text-xs text-on-surface-variant mb-6 bg-surface-container-low rounded-lg px-4 py-3">
                💡 Demo mode — use any 10-digit number, OTP is <strong>1234</strong>
              </p>

              <button onClick={handleSendOtp} disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 disabled:opacity-70">
                {loading
                  ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Sending...</>
                  : <>Send OTP <span className="material-symbols-outlined text-base">arrow_forward</span></>}
              </button>

              <p className="text-center text-sm text-on-surface-variant mt-6">
                New to Mitrava?{' '}
                <button onClick={() => navigate('/onboarding')} className="text-primary font-bold hover:underline">Get Started</button>
              </p>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">Verify your number.</h1>
              <p className="text-on-surface-variant font-medium mb-2">We sent a 4-digit OTP to</p>
              <p className="text-on-surface font-bold text-lg mb-10">+91 {phone}</p>

              <div className="flex gap-4 mb-4">
                {otp.map((digit, i) => (
                  <input key={i} id={`login-otp-${i}`} type="text" inputMode="numeric"
                    maxLength={1} value={digit}
                    onChange={e => handleOtpInput(e.target.value, i)}
                    onKeyDown={e => handleKeyDown(e, i)}
                    autoFocus={i === 0}
                    className={`w-16 h-16 text-center text-2xl font-extrabold tracking-tighter rounded-xl
                      bg-surface-container-highest outline-none transition-all border-b-2
                      ${digit ? 'border-primary bg-surface-container-lowest' : 'border-transparent'}
                      focus:border-primary focus:bg-surface-container-lowest`} />
                ))}
              </div>

              {error && <p className="text-sm text-error font-medium mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-base">error</span>{error}</p>}

              <p className="text-xs text-on-surface-variant mb-6 bg-surface-container-low rounded-lg px-4 py-3">
                💡 Demo mode — use OTP <strong>1234</strong>
              </p>

              <button onClick={handleVerify} disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 disabled:opacity-70 mb-4">
                {loading
                  ? <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Verifying...</>
                  : <>Verify & Login <span className="material-symbols-outlined text-base">arrow_forward</span></>}
              </button>

              <div className="text-center">
                <button onClick={() => setStep(1)} className="text-sm text-on-surface-variant hover:text-on-surface mr-4">← Change number</button>
                {timer > 0
                  ? <span className="text-sm text-on-surface-variant">Resend in <strong>{timer}s</strong></span>
                  : <button onClick={handleResend} className="text-sm text-primary font-bold hover:underline">Resend OTP</button>}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
