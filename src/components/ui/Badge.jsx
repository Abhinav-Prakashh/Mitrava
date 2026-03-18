const variants = {
  red:    'bg-error-container text-error',
  yellow: 'bg-[#fff3cd] text-[#92600a]',
  green:  'bg-[#d4f5e2] text-[#0d6e35]',
  blue:   'bg-surface-container-low text-primary',
  ghost:  'bg-surface-container text-on-surface-variant',
}

export default function Badge({ label, color = 'blue', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${variants[color]} ${className}`}>
      {label}
    </span>
  )
}
