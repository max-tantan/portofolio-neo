import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, pop, spring, stagger, staggerFast } from '../lib/motion'
import { TiltCard } from '../components/interactions/TiltCard'
import { CounterButton } from '../components/CounterButton'
import { useLanguage } from '../hooks/useLanguage'
import avatarSrc from '../assets/foto/foto.png'

export function About() {
  const { content } = useLanguage()
  const about = content.about

  return (
    <Section
      id={about.section.id}
      index={about.section.index}
      eyebrow={about.section.eyebrow}
      title={about.section.title}
      pattern={about.section.pattern as SectionPattern}
    >
      <motion.div
        className="about"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <TiltCard className="card card--butter about__card" max={3} glare={false}>
          <motion.div variants={fadeUp}>
            <motion.div
              className="about__avatar pattern-checker"
              variants={pop}
              whileHover={{ scale: 1.06, rotate: 2 }}
              whileTap={{ scale: 0.96 }}
              transition={spring}
            >
              <img
                className="about__avatar-img"
                src={avatarSrc}
                alt={about.avatar.alt}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
            {about.bio.map((paragraph) => (
              <p key={paragraph} className="about__bio">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </TiltCard>

        <TiltCard className="card card--mint about__card" max={3} glare={false}>
          <motion.div variants={fadeUp}>
            <h3 className="about__facts-title">{about.funFactsTitle}</h3>
            <motion.ul
              className="about__facts-list"
              variants={staggerFast}
              initial="hidden"
              animate="visible"
            >
              {about.facts.map((fact) => (
                <motion.li key={fact} variants={fadeUp}>
                  <span className="about__facts-bullet" aria-hidden="true" />
                  {fact}
                </motion.li>
              ))}
            </motion.ul>
            <CounterButton />
          </motion.div>
        </TiltCard>
      </motion.div>
    </Section>
  )
}
