import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { fadeIn, fadeUp, pop, spring, stagger } from '../lib/motion'

const Hero3D = lazy(() =>
  import('../components/Hero3D').then((m) => ({ default: m.Hero3D })),
)

const STATS = [
  { value: '4+', label: 'years crafting' },
  { value: '32', label: 'projects shipped' },
  { value: '12', label: 'happy clients' },
  { value: '∞', label: 'curious mind' },
]

export function Hero() {
  return (
    <motion.section
      id="hero"
      className="hero"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <div className="hero__main">
        <motion.div className="hero__copy" variants={stagger}>
          <motion.p className="hero__eyebrow" variants={fadeUp}>
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            Available for new projects
          </motion.p>
          <motion.h1 className="hero__title" variants={fadeUp}>
            Hello!
            <br />
            I&rsquo;m <span className="hero__name card--butter">Fatanala</span>
          </motion.h1>
          <motion.p className="hero__lead" variants={fadeUp}>
            Creative developer who shapes bold ideas into playful, pastel
            interfaces — with a pinch of 3D magic.
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            <a className="btn btn--ink" href="#projects">
              See my work
            </a>
            <a className="btn btn--butter" href="#contact">
              Say hi
            </a>
          </motion.div>
        </motion.div>

        <motion.div className="hero__visual" variants={fadeIn}>
          <motion.div
            className="hero__sticker card--peach"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0, rotate: 24 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ ...spring, delay: 0.55 }}
          >
            Frontend Dev
          </motion.div>
          <motion.div
            className="hero__sticker hero__sticker--back card--mint"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0, rotate: -24 }}
            animate={{ opacity: 1, scale: 1, rotate: -7 }}
            transition={{ ...spring, delay: 0.7 }}
          >
            UI/UX
          </motion.div>
          <Suspense
            fallback={<div className="hero-3d hero-3d--loading" aria-hidden="true" />}
          >
            <Hero3D />
          </Suspense>
        </motion.div>
      </div>

      <motion.ul className="hero__stats" variants={stagger}>
        {STATS.map((stat) => (
          <motion.li key={stat.label} variants={pop}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}