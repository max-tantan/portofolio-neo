import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { tiltSpring } from '../../lib/motion'

type TiltCardProps = {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
}

export function TiltCard({
  children,
  className = '',
  max = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled] = useState(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const sRotateX = useSpring(rotateX, tiltSpring)
  const sRotateY = useSpring(rotateY, tiltSpring)
  const sGlowX = useSpring(glowX, tiltSpring)
  const sGlowY = useSpring(glowY, tiltSpring)

  const transform = useMotionTemplate`perspective(900px) rotateX(${sRotateX}deg) rotateY(${sRotateY}deg)`
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${sGlowX}% ${sGlowY}%, rgba(255,255,255,0.3), transparent 45%)`

  const handleMove = (event: PointerEvent) => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width
    const ny = (event.clientY - rect.top) / rect.height
    rotateX.set((0.5 - ny) * max * 2)
    rotateY.set((nx - 0.5) * max * 2)
    glowX.set(nx * 100)
    glowY.set(ny * 100)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt-card ${className}`}
      style={{ transform }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
      {glare && (
        <motion.div
          className="tilt-card__glare"
          style={{ background: glareBg }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}
