import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { fadeUp, pop, stagger, staggerFast } from '../lib/motion'

const FACTS = [
  'Built my first website when I was 13',
  'Obsessed with pastel color palettes',
  'Can debug better after a strong coffee',
  'Favourite shape: the torus knot',
  'I sketch every interface before coding',
]

export function About() {
  return (
    <Section
      id="about"
      index="02"
      eyebrow="Who I am"
      title="About me"
      pattern="dots"
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
            <span className="about__avatar-monogram">F</span>
          </motion.div>
          <p className="about__bio">
            I&rsquo;m a frontend developer and designer with a weakness for
            chunky borders, loud typography, and soft candy colors. I turn
            messy ideas into memorable interfaces that feel a little bit
            playful and a lot deliberate.
          </p>
          <p className="about__bio">
            Outside code, I collect vintage keyboards, experiment with 3D
            tools, and take pictures of oddly shaped clouds.
          </p>
        </motion.div>

        <motion.div className="about__facts card card--mint" variants={fadeUp}>
          <h3 className="about__facts-title">Fun facts</h3>
          <motion.ul
            className="about__facts-list"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            {FACTS.map((fact) => (
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