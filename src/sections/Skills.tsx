import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, spring, stagger, staggerFast } from '../lib/motion'
import { TiltCard } from '../components/interactions/TiltCard'
import { useLanguage } from '../hooks/useLanguage'

export function Skills() {
  const { content } = useLanguage()
  const skillsData = content.skills

  return (
    <Section
      id={skillsData.section.id}
      index={skillsData.section.index}
      eyebrow={skillsData.section.eyebrow}
      title={skillsData.section.title}
      pattern={skillsData.section.pattern as SectionPattern}
    >
      <motion.div
        className="skills"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {skillsData.skills.map((skill, i) => (
          <TiltCard
            key={('id' in skill && skill.id) ? String(skill.id) : `${skillsData.section.id}-skill-${i}`}
            className={`card skills__card ${skill.color}`}
            max={7}
          >
            <motion.div
              className="skills__inner"
              variants={fadeUp}
              whileHover={{
                y: -5,
                rotate: i % 2 === 0 ? -0.6 : 0.6,
                transition: spring,
              }}
            >
              <div className="skills__head">
                <h3>{skill.name}</h3>
                <span className="tag tag--ink">
                  {skill.items.length} {content.site.ui.tools}
                </span>
              </div>
              <motion.ul
                className="skills__list"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {skill.items.map((item) => (
                  <motion.li key={item} variants={fadeUp}>
                    <span className={`tag ${skill.tag}`}>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </TiltCard>
        ))}
      </motion.div>
    </Section>
  )
}
