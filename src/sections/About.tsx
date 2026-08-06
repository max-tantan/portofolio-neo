import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, pop, stagger, staggerFast } from '../lib/motion'
import aboutData from '../data/about.json'

export function About() {
  return (
    <Section
      id={aboutData.section.id}
      index={aboutData.section.index}
      eyebrow={aboutData.section.eyebrow}
      title={aboutData.section.title}
      pattern={aboutData.section.pattern as SectionPattern}
    >
      <motion.div
        className="about"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div className="about__card card card--butter" variants={fadeUp}>
          <motion.div
            className="about__avatar pattern-checker"
            aria-hidden="true"
            variants={pop}
          >
            <span className="about__avatar-monogram">{aboutData.monogram}</span>
          </motion.div>
          {aboutData.bio.map((paragraph) => (
            <p key={paragraph} className="about__bio">
              {paragraph}
            </p>
          ))}
        </motion.div>

        <motion.div className="about__facts card card--mint" variants={fadeUp}>
          <h3 className="about__facts-title">{aboutData.funFactsTitle}</h3>
          <motion.ul
            className="about__facts-list"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            {aboutData.facts.map((fact) => (
              <motion.li key={fact} variants={fadeUp}>
                <span className="about__facts-bullet" aria-hidden="true" />
                {fact}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </Section>
  )
}
