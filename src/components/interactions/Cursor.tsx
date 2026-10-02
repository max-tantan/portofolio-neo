import { motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMouse } from '../../lib/useMouse'

export function Cursor() {
  const { x, y, enabled } = useMouse()
  const [hovering, setHovering] = useState(false)
  const [active, setActive] = useState(false)
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const over = (event: PointerEvent) => {
      const target = event.target as Element | null
      setHovering(
        !!target?.closest?.('a, button, [data-interactive], input, textarea, label'),
      )
    }
    const down = () => setActive(true)
    const up = () => setActive(false)
    document.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerdown', down, { passive: true })
    document.addEventListener('pointerup', up, { passive: true })
    return () => {
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <motion.div
      className="cursor-ring"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
      animate={{
        scale: active ? 0.8 : hovering ? 1.9 : 1,
        backgroundColor: hovering ? 'var(--mint)' : 'var(--pink)',
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    />
  )
}
