export default function Card({ title, label, children, className = '', onClick }) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-xl p-6 shadow-soft ${onClick ? 'cursor-pointer hover:bg-surface-container-low transition-colors' : ''} ${className}`}
      onClick={onClick}
    >
      {(title || label) && (
        <div className="mb-5">
          {label && <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1">{label}</p>}
          {title && <h3 className="text-base font-bold text-on-surface">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )
}
