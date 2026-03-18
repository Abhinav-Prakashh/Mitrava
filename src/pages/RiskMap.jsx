import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { weather } from '../data/mockData'

const weatherItems = [
  { icon: 'rainy',       val: weather.rain.value, label: weather.rain.label, level: weather.rain.level, color: 'red'    },
  { icon: 'thermometer', val: weather.temp.value, label: weather.temp.label, level: weather.temp.level, color: 'green'  },
  { icon: 'air',         val: weather.aqi.value,  label: weather.aqi.label,  level: weather.aqi.level,  color: 'yellow' },
]

export default function RiskMap() {
  return (
    <div className="flex flex-col gap-8">

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Live Updates</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-on-surface">
            Regional Risk<br /><span className="text-primary">Density.</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
          <span className="material-symbols-outlined text-primary text-base">location_on</span>
          <span className="text-sm font-bold text-on-surface">{weather.city}</span>
          <span className="material-symbols-outlined text-on-surface-variant text-base">expand_more</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Map takes 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Map placeholder */}
          <div className="relative rounded-xl overflow-hidden bg-surface-container-low h-96 lg:h-[480px]"
            style={{
              backgroundImage:`linear-gradient(rgba(0,86,210,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,86,210,0.04) 1px,transparent 1px)`,
              backgroundSize:'40px 40px',
            }}
          >
            {/* Risk blobs */}
            <div className="absolute rounded-full opacity-35 bg-red-500"    style={{width:180,height:180,top:110,left:210}} />
            <div className="absolute rounded-full opacity-35 bg-yellow-400" style={{width:130,height:130,top:65,right:130}} />
            <div className="absolute rounded-full opacity-35 bg-green-500"  style={{width:110,height:110,bottom:90,left:90}} />
            <div className="absolute rounded-full opacity-35 bg-green-500"  style={{width:100,height:100,top:45,left:65}} />

            {/* Map pins */}
            <div className="absolute text-3xl drop-shadow-md" style={{top:118,left:225}}>📍</div>
            <div className="absolute text-2xl drop-shadow-md" style={{top:58,right:138}}>📍</div>
            <div className="absolute text-2xl drop-shadow-md" style={{bottom:98,left:98}}>📍</div>

            {/* Floating label */}
            <div className="absolute bottom-4 right-4 bg-surface-container-lowest rounded-xl px-4 py-3 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-wider text-error mb-0.5">⚠ High Risk Zone</p>
              <p className="text-xs text-on-surface-variant">Your current area</p>
            </div>

            {/* City badge */}
            <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
              <p className="text-sm font-bold text-primary">📍 {weather.city}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-6">
            {[
              {color:'bg-green-500', label:'Safe Zone'},
              {color:'bg-yellow-400',label:'Medium Risk'},
              {color:'bg-red-500',   label:'High Risk'},
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${l.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weather sidebar */}
        <div className="flex flex-col gap-4">
          <Card label={`Weather Today · ${weather.city}`}>
            <div className="flex flex-col gap-3">
              {weatherItems.map(w => (
                <div key={w.label} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-primary text-2xl">{w.icon}</span>
                  <div className="flex-1">
                    <p className="text-base font-extrabold tracking-tighter text-on-surface">{w.val}</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{w.label}</p>
                  </div>
                  <Badge label={w.level} color={w.color} />
                </div>
              ))}
            </div>
          </Card>

          <Card label="Disruption Forecast">
            <p className="text-xs text-on-surface-variant font-medium mb-4">Next 24 hours</p>
            {[
              { time: 'Tonight 8PM',  event: 'Rain may intensify', risk: 'High'   },
              { time: 'Tomorrow 6AM', event: 'AQI likely moderate', risk: 'Medium' },
              { time: 'Tomorrow 2PM', event: 'Conditions improve',  risk: 'Low'    },
            ].map(f => (
              <div key={f.time} className="flex items-center justify-between py-3 border-b border-surface-container last:border-0">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{f.time}</p>
                  <p className="text-sm font-semibold text-on-surface">{f.event}</p>
                </div>
                <Badge label={f.risk} color={f.risk === 'High' ? 'red' : f.risk === 'Medium' ? 'yellow' : 'green'} />
              </div>
            ))}
          </Card>

          <button className="w-full py-4 bg-primary text-on-primary font-bold rounded-lg shadow-blue transition-transform active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">shield</span>
            Activate Protection
          </button>
        </div>

      </div>
    </div>
  )
}
