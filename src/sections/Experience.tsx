import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { fadeUp, spring, stagger } from '../lib/motion'

const JOBS = [
  {
    role: 'Lead Frontend Engineer',
    org: 'Pastel Studio',
    period: '2023 — Now',
    color: 'card--pink',
    dot: 'bg--pink',
    points: [
      'Lead a team of 4 shipping playful marketing sites.',
      'Built a shared design system used across 12 products.',
      'Cut bundle size 40% with smarter tooling choices.',
    ],
  },
  {
    role: 'Creative Developer',
    org: 'Bright Agency',
    period: '2021 — 2023',
    color: 'card--sky',
    dot: 'bg--sky',
    points: [
      'Shipped 20+ WebGL experiences for global brands.',
      'Introduced a 3D asset pipeline that halved render time.',
    ],
  },
  {
    role: 'Frontend Developer',
    org: 'Tiny Startups Co.',
    period: '2020 — 2021',
    color: 'card--lavender',
    dot: 'bg--lavender',
    points: [
      'Built responsive dashboards from figma to deploy.',
      'Mentored junior devs and ran weekly code reviews.',
    ],
  },
]

export function Experience() {
  return (
    <Section
      id="experience"
      index="05"
      eyebrow="Where I’ve been"
      title="Experience"
      pattern="diagonal"
    >
      <motion.ol
        className="timeline"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {JOBS.map((job, i) => (
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