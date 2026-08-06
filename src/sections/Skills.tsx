import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, spring, stagger, staggerFast } from '../lib/motion'
import skillsData from '../data/skills.json'

export function Skills() {
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
          <motion.div
            key={skill.name}
            className={`card skills__card ${skill.color}`}
            variants={fadeUp}
            whileHover={{
              y: -6,
              rotate: i % 2 === 0 ? -0.6 : 0.6,
              transition: spring,
            }}
          >
            <div className="skills__head">
              <h3>{skill.name}</h3>
              <span className="tag tag--ink">{skill.items.length} tools</span>
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
        ))}
      </motion.div>
    </Section>
  )
}
