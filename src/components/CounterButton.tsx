import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { spring } from '../lib/motion'

type CounterButtonProps = {
  className?: string
}

export function CounterButton({ className = '' }: CounterButtonProps) {
  const [count, setCount] = useState(0)
  const [shake, setShake] = useState(0)
  const motionValue = useMotionValue(1)
  const scale = useSpring(motionValue, { stiffness: 600, damping: 18 })

  useEffect(() => {
    if (shake > 0) {
      const timer = setTimeout(() => setShake(0), 300)
      return () => clearTimeout(timer)
    }
  }, [shake])

  const handleChange = (delta: number) => {
    setCount((c) => Math.max(0, c + delta))
    setShake((s) => s + 1)
    motionValue.set(0.86)
    requestAnimationFrame(() => motionValue.set(1))
  }

  return (
    <motion.div
      className={`counter ${className}`}
      animate={shake > 0 ? { rotate: [0, -2, 2, -1.5, 1.5, 0] } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.button
        type="button"
        className="counter__btn counter__btn--minus"
        style={{ scale }}
        onClick={() => handleChange(-1)}
        whileTap={{ y: 3, x: 3 }}
        aria-label="Decrement counter"
      >
        −
      </motion.button>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          className="counter__value"
          initial={{ y: -14, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 14, opacity: 0, scale: 0.8 }}
          transition={spring}
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <motion.button
        type="button"
        className="counter__btn"
        style={{ scale }}
        onClick={() => handleChange(1)}
        whileTap={{ y: 3, x: 3 }}
        aria-label="Increment counter"
      >
        +
      </motion.button>
    </motion.div>
  )
}
