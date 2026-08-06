import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { fadeUp, spring, stagger, staggerFast } from '../lib/motion'

const SKILLS = [
  {
    name: 'Frontend',
    color: 'card--pink',
    tag: 'tag--pink',
    items: ['TypeScript', 'React', 'Vite', 'CSS Grid'],
  },
  {
    name: 'Design',
    color: 'card--lavender',
    tag: 'tag--lavender',
    items: ['Figma', 'Design systems', 'Illustration', 'Branding'],
  },
  {
    name: '3D & Motion',
    color: 'card--sky',
    tag: 'tag--sky',
    items: ['Three.js', 'R3F', 'WebGL', 'Keyframes'],
  },
  {
    name: 'Backend',
    color: 'card--mint',
    tag: 'tag--mint',
    items: ['Node.js', 'PostgreSQL', 'REST APIs', 'Auth'],
  },
  {
    name: 'Tools',
    color: 'card--peach',
    tag: 'tag--peach',
    items: ['Git', 'Vite', 'ESLint', 'Figma Dev'],
  },
  {
    name: 'Soft skills',
    color: 'card--butter',
    tag: 'tag--butter',
    items: ['Communication', 'Mentoring', 'Timing', 'Fun'],
  },
]

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      eyebrow="What I bring"
      title="Skills"
      pattern="stripes"
    >
      <motion.div
        className="skills"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {SKILLS.map((skill, i) => (
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