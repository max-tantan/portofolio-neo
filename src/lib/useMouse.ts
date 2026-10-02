import { useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

export function useMouse() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [enabled] = useState(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return fine && !reduced
  })

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const handle = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        x.set(event.clientX)
        y.set(event.clientY)
      })
    }

    window.addEventListener('pointermove', handle, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handle)
    }
  }, [enabled, x, y])

  return { x, y, enabled }
}
