import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { popUp, stagger } from '../lib/motion'
import { Magnetic } from '../components/interactions/Magnetic'
import { useLanguage } from '../hooks/useLanguage'

export function Contact() {
  const { content } = useLanguage()
  const contactData = content.contact
  const siteData = content.site

  return (
    <Section
      id={contactData.section.id}
      index={contactData.section.index}
      eyebrow={contactData.section.eyebrow}
      title={contactData.section.title}
      pattern={contactData.section.pattern as SectionPattern}
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
            {contactData.cta.title.map((line, i) => (
              <span key={line}>
                {line}
                {i < contactData.cta.title.length - 1 && <br />}
              </span>
            ))}
          </h3>
          <p>{contactData.cta.body}</p>
          <Magnetic strength={0.35}>
            <a className="btn btn--butter" href={`mailto:${siteData.email}`}>
              {siteData.email}
            </a>
          </Magnetic>
        </motion.div>

        <div className="contact__side">
          <motion.p className="contact__label" variants={popUp}>
            {contactData.label}
          </motion.p>
          <motion.ul className="contact__links" variants={stagger}>
            {contactData.links.map((link) => (
              <motion.li key={link.label} variants={popUp}>
                <Magnetic strength={0.35}>
                  <a
                    className={`btn ${link.color}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label}
                    <span aria-hidden="true">&Nearr;</span>
                  </a>
                </Magnetic>
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
