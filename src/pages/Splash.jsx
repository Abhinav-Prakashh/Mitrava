import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold tracking-tighter text-primary">Mitrava</div>
          <nav className="hidden md:flex items-center gap-8">
            {['Plans','Claims','Support'].map(n => (
              <a key={n} href="#" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')} className="text-sm font-semibold text-on-surface-variant px-4 py-2 hover:bg-surface-container-high rounded-lg transition-colors">
              Login
            </button>
            <button onClick={() => navigate('/onboarding')} className="bg-primary text-on-primary text-sm font-semibold px-6 py-2.5 rounded-lg shadow-blue transition-transform active:scale-95">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10">

        {/* Hero */}
        <section className="py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Parametric Income Coverage
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tighter text-on-surface leading-[1.05] mb-6">
              Income Shield for<br />
              <span className="text-primary">Urban Delivery</span>
            </h1>
            <p className="text-on-surface-variant text-lg font-medium leading-relaxed mb-10 max-w-xl">
              Precision-engineered parametric insurance for Zomato and Swiggy delivery partners. Automatic payouts when weather or disruptions hit. Zero paperwork.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/onboarding')} className="bg-primary text-on-primary font-bold px-8 py-4 rounded-lg shadow-blue transition-transform active:scale-95 flex items-center gap-2">
                Get Started <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button className="text-primary font-semibold px-6 py-4 hover:bg-surface-container-low rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats card */}
          <div className="relative hidden lg:block">
            <div className="bg-surface-container-low rounded-xl p-10 text-center">
              <div className="text-6xl font-extrabold tracking-tighter text-primary mb-2">₹2.4Cr+</div>
              <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Income Protected</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-surface-container-lowest rounded-xl p-5 shadow-soft">
              <div className="text-2xl font-extrabold text-on-surface">~4.2 min</div>
              <div className="text-xs text-on-surface-variant font-medium">Avg. payout time</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 border-t border-surface-container">
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Why Mitrava</p>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tighter text-on-surface mb-10">Built for the gig economy.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: 'bolt', title: 'Instant Payouts', desc: 'Claims triggered automatically when thresholds are breached. No filing required.' },
              { icon: 'shield', title: 'Zero Paperwork', desc: 'Your zone, your weather, your coverage — all handled by our parametric engine.' },
              { icon: 'analytics', title: 'AI Risk Pricing', desc: 'Weekly premiums dynamically priced by your zone\'s disruption history.' },
            ].map(f => (
              <div key={f.title} className="bg-surface-container-low hover:bg-surface-container-high transition-colors rounded-xl p-6 group">
                <span className="material-symbols-outlined text-primary text-2xl mb-4 block group-hover:scale-110 transition-transform">{f.icon}</span>
                <div className="text-sm font-bold uppercase tracking-wider text-on-surface mb-2">{f.title}</div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="my-16 bg-primary rounded-xl p-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tighter text-on-primary mb-3">Ready to protect your income?</h2>
          <p className="text-on-primary/75 font-medium mb-8">Join thousands of delivery partners already covered.</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => navigate('/onboarding')} className="bg-surface-container-lowest text-primary font-bold px-8 py-4 rounded-lg transition-transform active:scale-95">
              Get Started Now
            </button>
            <button className="border-2 border-on-primary/30 text-on-primary font-bold px-8 py-4 rounded-lg hover:bg-on-primary/10 transition-colors">
              View Plans
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-surface-container px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="text-lg font-extrabold tracking-tighter text-primary mb-1">Mitrava</div>
            <p className="text-xs text-on-surface-variant uppercase tracking-wider">© 2026 Mitrava Insurance. Secure coverage for delivery partners.</p>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            {['Privacy Policy','Terms of Service','Claims Center','FAQ'].map(l => (
              <a key={l} href="#" className="hover:text-primary transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
