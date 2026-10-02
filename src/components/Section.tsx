import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { fadeUp, stagger } from '../lib/motion'
import { WordReveal } from './interactions/WordReveal'

export type SectionPattern = 'stripes' | 'dots' | 'checker' | 'diagonal' | 'noise'

type SectionProps = {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  pattern?: SectionPattern
  children: ReactNode
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  pattern = 'dots',
  children,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const patternY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const indexY = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <motion.section
      ref={ref}
      id={id}
      className="section"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="section__head" variants={fadeUp}>
        <motion.span
          className="section__index-wrap"
          style={reduced ? undefined : { y: indexY }}
        >
          <span className="section__index">{index}</span>
        </motion.span>
        <div>
          <p className="section__eyebrow">{eyebrow}</p>
          <h2>{typeof title === 'string' ? <WordReveal text={title} /> : title}</h2>
        </div>
        <motion.span
          className="section__pattern-wrap"
          style={reduced ? undefined : { y: patternY }}
        >
          <span className={`pattern-${pattern}`} aria-hidden="true" />
        </motion.span>
      </motion.div>
      <div className="section__body">{children}</div>
    </motion.section>
  )
}
