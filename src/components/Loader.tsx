import { motion, type Variants } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const loader: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.04 } },
}

const pop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 19 },
  },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.16 } },
}

const star: Variants = {
  ...pop,
  visible: { ...pop.visible, rotate: 45 },
}

const nameUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.35 },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.16 } },
}

export function Loader() {
  const { content } = useLanguage()

  return (
    <motion.div
      className="loader"
      variants={loader}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="loader__stage" variants={loader}>
        <motion.span className="loader__star" variants={star} />
        {[1, 2, 3, 4].map((n) => (
          <motion.span
            key={n}
            className={`loader__sat loader__sat--${n}`}
            variants={pop}
          />
        ))}
      </motion.div>
      <motion.p className="loader__name" variants={nameUp}>
        {content.site.siteName}
      </motion.p>
    </motion.div>
  )
}
