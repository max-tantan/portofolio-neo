import { motion } from 'framer-motion'
import { Section, type SectionPattern } from '../components/Section'
import { fadeUp, popUp, spring, stagger, staggerFast } from '../lib/motion'
import { TiltCard } from '../components/interactions/TiltCard'
import { useLanguage } from '../hooks/useLanguage'

export function Projects() {
  const { content } = useLanguage()
  const projectsData = content.projects
  const featured = projectsData.featured

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
        <TiltCard
          className={`card projects__card projects__card--featured ${featured.color}`}
          max={6}
        >
          <motion.article
            className="projects__inner projects__inner--featured"
            variants={fadeUp}
            whileHover={{
              y: -5,
              rotate: -0.8,
              transition: spring,
            }}
          >
            <div
              className={`projects__thumb projects__thumb--featured ${featured.pattern}`}
              aria-hidden="true"
            >
              <span>{featured.year}</span>
            </div>
            <div className="projects__info projects__info--featured">
              <motion.div className="projects__meta" variants={staggerFast}>
                <motion.span className="projects__flag" variants={fadeUp}>
                  {featured.flag}
                </motion.span>
                <span className="projects__award-wrap">
                  <motion.span className="projects__award" variants={popUp}>
                    {featured.award}
                  </motion.span>
                </span>
              </motion.div>
              <h3>{featured.name}</h3>
              <p>{featured.blurb}</p>
              <ul className="projects__highlights">
                {featured.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <motion.ul className="projects__tags" variants={staggerFast}>
                {featured.tags.map((tag) => (
                  <motion.li key={tag} variants={fadeUp}>
                    <span className="tag">{tag}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <a className="projects__link" href="#contact">
                {content.site.ui.caseStudy} <span aria-hidden="true">&Nearr;</span>
              </a>
            </div>
          </motion.article>
        </TiltCard>
        {projectsData.projects.map((project, i) => (
          <TiltCard
            key={project.name}
            className={`card projects__card ${project.color}`}
            max={6}
          >
            <motion.article
              className="projects__inner"
              variants={fadeUp}
              whileHover={{
                y: -5,
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
                  {content.site.ui.caseStudy} <span aria-hidden="true">&Nearr;</span>
                </a>
              </div>
            </motion.article>
          </TiltCard>
        ))}
      </motion.div>
    </Section>
  )
}
