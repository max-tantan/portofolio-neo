import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { fadeIn, fadeUp, pop, spring, stagger } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'

const Hero3D = lazy(() =>
  import('../components/Hero3D').then((m) => ({ default: m.Hero3D })),
)

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
            <span className="hero__name" aria-label={hero.section.name}>
              {hero.section.name.split('').map((letter, i) => (
                <span key={i} className="hero__magnet">
                  {letter}
                </span>
              ))}
            </span>
          </motion.h1>
          <motion.p className="hero__lead" variants={fadeUp}>
            {hero.section.lead}
          </motion.p>
          <motion.div className="hero__actions" variants={fadeUp}>
            {hero.buttons.map((button) => (
              <a key={button.href} className={button.className} href={button.href}>
                {button.label}
              </a>
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
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  )
}
