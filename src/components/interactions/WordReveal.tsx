import { motion } from 'framer-motion'
import { EASE } from '../../lib/motion'

type WordRevealProps = {
  text: string
  className?: string
}

export function WordReveal({ text, className = '' }: WordRevealProps) {
  const words = text.split(' ')

  return (
    <span className={`word-reveal ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="word-reveal__mask"
          style={{ marginRight: i < words.length - 1 ? '0.28em' : undefined }}
          aria-hidden="true"
        >
          <motion.span
            className="word-reveal__word"
            initial={{ y: '115%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
