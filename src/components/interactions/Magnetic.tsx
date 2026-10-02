import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { magneticSpring } from '../../lib/motion'

type MagneticProps = {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled] = useState(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)
  const x = useSpring(offsetX, magneticSpring)
  const y = useSpring(offsetY, magneticSpring)

  const handleMove = (event: PointerEvent) => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    offsetX.set(dx * strength)
    offsetY.set(dy * strength)
  }

  const handleLeave = () => {
    offsetX.set(0)
    offsetY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
}
