import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, spring, stagger } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'

export function Experience() {
  const { content } = useLanguage()
  const experienceData = content.experience

  return (
    <Section
      id={experienceData.section.id}
      index={experienceData.section.index}
      eyebrow={experienceData.section.eyebrow}
      title={experienceData.section.title}
      pattern={experienceData.section.pattern as SectionPattern}
    >
      <motion.ol
        className="timeline"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {experienceData.jobs.map((job, i) => (
          <motion.li
            key={job.role}
            className="timeline__item"
            variants={fadeUp}
            whileHover={{ x: 8, transition: spring }}
          >
            <span className="timeline__num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={`card timeline__card ${job.color}`}>
              <div className="timeline__head">
                <span className={`timeline__dot ${job.dot}`} aria-hidden="true" />
                <h3>{job.role}</h3>
                <span className="tag tag--ink">{job.period}</span>
              </div>
              <p className="timeline__org">{job.org}</p>
              <ul className="timeline__points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  )
}
