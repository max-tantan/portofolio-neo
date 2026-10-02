import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'framer-motion'
import { lazy, Suspense, useEffect, useRef, type MutableRefObject, type PointerEvent, type RefObject } from 'react'
import { fadeIn, fadeUp, pop, spring, stagger } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'
import { useMouse } from '../lib/useMouse'
import { Magnetic } from '../components/interactions/Magnetic'
import { CountUp } from '../components/interactions/CountUp'

const Hero3D = lazy(() =>
  import('../components/Hero3D').then((m) => ({ default: m.Hero3D })),
)

type LetterGroup = {
  ref: RefObject<HTMLSpanElement | null>
  x: MotionValue<number>
  y: MotionValue<number>
}

type MagnetLetterProps = {
  letter: string
  index: number
  group: MutableRefObject<Map<number, LetterGroup>>
}

function MagnetLetter({ letter, index, group }: MagnetLetterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(useMotionValue(0), {
    stiffness: 300,
    damping: 20,
    mass: 0.4,
  })
  const y = useSpring(useMotionValue(0), {
    stiffness: 300,
    damping: 20,
    mass: 0.4,
  })

  useEffect(() => {
    const map = group.current
    map.set(index, { ref, x, y })
    return () => {
      map.delete(index)
    }
  }, [group, index, x, y])

  return (
    <motion.span
      ref={ref}
      className="hero__magnet"
      style={{ x, y }}
      aria-hidden="true"
    >
      {letter}
    </motion.span>
  )
}

function MagnetName({ name }: { name: string }) {
  const letters = useRef(new Map<number, LetterGroup>())
  const { enabled } = useMouse()
  const reduced = useReducedMotion()

  const handleMove = (event: PointerEvent) => {
    if (!enabled || reduced) return
    const { clientX, clientY } = event
    letters.current.forEach(({ ref, x, y }) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const dx = clientX - (rect.left + rect.width / 2)
      const dy = clientY - (rect.top + rect.height / 2)
      const dist = Math.hypot(dx, dy)
      const radius = Math.max(rect.width * 2.4, 72)
      const pull = Math.max(0, 1 - dist / radius)
      x.set(dx * pull * 0.38)
      y.set(dy * pull * 0.38)
    })
  }

  const reset = () => {
    letters.current.forEach(({ x, y }) => {
      x.set(0)
      y.set(0)
    })
  }

  return (
    <motion.span
      className="hero__name"
      aria-label={name}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {name.split('').map((letter, i) => (
        <MagnetLetter key={`${letter}-${i}`} letter={letter} index={i} group={letters} />
      ))}
    </motion.span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const { content } = useLanguage()
  const hero = content.hero

  return (
    <motion.section
      id="hero"
      className="hero"
      variants={stagger}
      initial="hidden"
      animate={ready ? 'visible' : 'hidden'}
    >
      <div className="hero__main">
        <motion.div className="hero__copy" variants={stagger}>
          <motion.p className="hero__eyebrow" variants={fadeUp}>
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            {hero.section.eyebrow}
          </motion.p>
          <motion.h1 className="hero__title" variants={fadeUp}>
            {hero.section.title}
            <MagnetName name={hero.section.name} />
          </motion.h1>
          <motion.p className="hero__lead" variants={fadeUp}>
            {hero.section.lead}
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            {hero.buttons.map((button) => (
              <Magnetic key={button.href} strength={0.32}>
                <a className={button.className} href={button.href}>
                  {button.label}
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" variants={fadeIn}>
          {hero.stickers.map((sticker, i) => (
            <motion.div
              key={sticker.label}
              className={sticker.className}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0, rotate: i === 0 ? 24 : -24 }}
              animate={{ opacity: 1, scale: 1, rotate: i === 0 ? 6 : -7 }}
              transition={{ ...spring, delay: i === 0 ? 0.55 : 0.7 }}
            >
              {sticker.label}
            </motion.div>
          ))}
          <Suspense
            fallback={<div className="hero-3d hero-3d--loading" aria-hidden="true" />}
          >
            <Hero3D />
          </Suspense>
        </motion.div>
      </div>

      <motion.ul className="hero__stats" variants={stagger}>
        {hero.stats.map((stat) => (
          <motion.li key={stat.label} variants={pop}>
            <strong>
              <CountUp value={stat.value} />
            </strong>
            <span>{stat.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}
