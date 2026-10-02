import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE } from '../../lib/motion'

type CountUpProps = {
  value: string
  duration?: number
}

export function CountUp({ value, duration = 1.5 }: CountUpProps) {
  const match = value.match(/^(-?\d+(?:[.,]\d+)?)(.*)$/)
  const target = match ? parseFloat(match[1].replace(',', '.')) : null
  const suffix = match ? match[2] : value
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(target === null ? value : '0')

  useEffect(() => {
    if (target === null || !inView) return
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) => {
        setDisplay(String(Math.round(latest)))
      },
    })
    return () => controls.stop()
  }, [inView, target, duration])

  return (
    <motion.span ref={ref} className="count-up">
      {display}
      {suffix}
    </motion.span>
  )
}
