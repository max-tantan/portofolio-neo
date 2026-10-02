import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

type MarqueeProps = {
  items: string[]
  className?: string
  duration?: number
  reverse?: boolean
}

export function Marquee({
  items,
  className = '',
  duration = 22,
  reverse = false,
}: MarqueeProps) {
  const row = items.join(' * ')
  const x = useMotionValue(reverse ? '-50%' : '0%')
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    controls.current = animate(x, reverse ? ['-50%', '0%'] : ['0%', '-50%'], {
      duration,
      ease: 'linear',
      repeat: Infinity,
    })
    return () => controls.current?.stop()
  }, [x, duration, reverse, row, reduced])

  return (
    <div
      className={`marquee ${className}`}
      aria-hidden="true"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <motion.div className="marquee__track" style={{ x }}>
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
        <span className="marquee__row">{row}</span>
      </motion.div>
    </div>
  )
}
