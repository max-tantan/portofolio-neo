import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger } from '../lib/motion'

type SectionProps = {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  pattern?: 'stripes' | 'dots' | 'checker' | 'diagonal' | 'noise'
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
  return (
    <motion.section
      id={id}
      className="section"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div className="section__head" variants={fadeUp}>
        <span className="section__index">{index}</span>
        <div>
          <p className="section__eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <span className={`pattern-${pattern}`} aria-hidden="true" />
      </motion.div>
      <div className="section__body">{children}</div>
    </motion.section>
  )
}