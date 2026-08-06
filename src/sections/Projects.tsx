import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, spring, stagger, staggerFast } from '../lib/motion'
import projectsData from '../data/projects.json'

export function Projects() {
  return (
    <Section
      id={projectsData.section.id}
      index={projectsData.section.index}
      eyebrow={projectsData.section.eyebrow}
      title={projectsData.section.title}
      pattern={projectsData.section.pattern as SectionPattern}
    >
      <motion.div
        className="projects"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {projectsData.projects.map((project, i) => (
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
