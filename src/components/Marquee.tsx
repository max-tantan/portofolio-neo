type MarqueeProps = {
  items: string[]
  className?: string
}

export function Marquee({ items, className = '' }: MarqueeProps) {
  const row = items.join(' * ')

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track">
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
      </div>
    </div>
  )
}