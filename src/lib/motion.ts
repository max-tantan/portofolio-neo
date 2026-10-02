import type { Variants } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 22 },
  },
}

export const popUp: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 22 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 22 },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

export const spring = {
  type: 'spring',
  stiffness: 420,
  damping: 26,
} as const

export const magneticSpring = {
  stiffness: 320,
  damping: 21,
  mass: 0.45,
} as const

export const tiltSpring = {
  stiffness: 220,
  damping: 18,
  mass: 0.5,
} as const

export const wordReveal: Variants = {
  hidden: { y: '115%' },
  visible: {
    y: '0%',
    transition: { duration: 0.6, ease: EASE },
  },
}
