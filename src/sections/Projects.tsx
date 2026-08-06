import { motion } from 'framer-motion'
import { Section } from '../components/Section'
import { fadeUp, spring, stagger, staggerFast } from '../lib/motion'

const PROJECTS = [
  {
    name: 'Candy Drop',
    year: '2025',
    color: 'card--pink',
    pattern: 'pattern-dots-pastel',
    blurb: 'A candy-delivery app with a sugar-rush checkout flow.',
    tags: ['React', 'TypeScript', 'R3F'],
  },
  {
    name: 'Blockchain Blocks',
    year: '2024',
    color: 'card--sky',
    pattern: 'pattern-checker',
    blurb: 'An interactive 3D explorer for public blockchain data.',
    tags: ['Three.js', 'WebGL', 'WebSocket'],
  },
  {
    name: 'Pick A Pastel',
    year: '2024',
    color: 'card--lavender',
    pattern: 'pattern-diagonal',
    blurb: 'A community palette generator with live previews.',
    tags: ['Vue', 'CSS Tokens', 'Node'],
  },
  {
    name: 'Marquee Mart',
    year: '2023',
    color: 'card--butter',
    pattern: 'pattern-dots',
    blurb: 'A playful storefront for limited-run merch drops.',
    tags: ['Next.js', 'Stripe', 'Supabase'],
  },
]

export function Projects() {
  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Things I built"
      title="Selected work"
      pattern="checker"
    >
      <motion.div
        className="projects"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {PROJECTS.map((project, i) => (
          <motion.article
            key={project.name}
            className={`card projects__card ${project.color}`}
            variants={fadeUp}
            whileHover={{
              y: -6,
              rotate: i % 2 === 0 ? 0.8 : -0.8,
              transition: spring,
            }}
          >
            <div className={`projects__thumb ${project.pattern}`} aria-hidden="true">
              <span>{project.year}</span>
            </div>
            <div className="projects__info">
              <h3>{project.name}</h3>
              <p>{project.blurb}</p>
              <motion.ul
                className="projects__tags"
                variants={staggerFast}
                initial="hidden"
                animate="visible"
              >
                {project.tags.map((tag) => (
                  <motion.li key={tag} variants={fadeUp}>
                    <span className="tag">{tag}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <a className="projects__link" href="#contact">
                Case study <span aria-hidden="true">&Nearr;</span>
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  )
}