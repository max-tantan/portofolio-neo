import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { popUp, stagger } from '../lib/motion'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com', color: 'btn--mint' },
  { label: 'LinkedIn', href: 'https://linkedin.com', color: 'btn--sky' },
  { label: 'Dribbble', href: 'https://dribbble.com', color: 'btn--lavender' },
  { label: 'Email', href: 'mailto:hello@example.com', color: 'btn--pink' },
]

export function Contact() {
  return (
    <Section
      id="contact"
      index="06"
      eyebrow="Let’s talk"
      title="Got an idea?"
      pattern="dots"
    >
      <motion.div
        className="contact"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.div className="contact__cta card card--ink" variants={popUp}>
          <h3>
            Let&rsquo;s build something
            <br />
            worth staring at.
          </h3>
          <p>
            Open for freelance work, collaborations, and the occasional
            rubber-duck debugging session.
          </p>
          <motion.a
            className="btn btn--butter"
            href="mailto:hello@example.com"
            whileHover={{ y: -3, x: -3 }}
            whileTap={{ y: 3, x: 3 }}
          >
            hello@example.com
          </motion.a>
        </motion.div>

        <div className="contact__side">
          <motion.p className="contact__label" variants={popUp}>
            Find me everywhere
          </motion.p>
          <motion.ul className="contact__links" variants={stagger}>
            {LINKS.map((link) => (
              <motion.li key={link.label} variants={popUp}>
                <motion.a
                  className={`btn ${link.color}`}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, x: -3 }}
                  whileTap={{ y: 3, x: 3 }}
                >
                  {link.label}
                  <span aria-hidden="true">&Nearr;</span>
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            className="contact__patch pattern-checker"
            aria-hidden="true"
            variants={popUp}
          />
        </div>
      </motion.div>
    </Section>
  )
}