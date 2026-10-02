import { animate, motion, useMotionValue } from 'framer-motion'
import { EASE, spring } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'

type LanguageToggleProps = {
  className?: string
  compact?: boolean
}

export function LanguageToggle({ className = '', compact = false }: LanguageToggleProps) {
  const { lang, toggle } = useLanguage()
  const rotateY = useMotionValue(0)

  const handleClick = () => {
    toggle()
    rotateY.set(0)
    animate(rotateY, 360, { duration: 0.55, ease: EASE })
  }

  return (
    <motion.button
      type="button"
      className={`lang-toggle ${compact ? 'lang-toggle--compact' : ''} ${className}`}
      onClick={handleClick}
      aria-label={lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Beralih ke English'}
      whileHover={{ y: -3, x: -3 }}
      whileTap={{ y: 3, x: 3 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ rotateY, transformPerspective: 600 }}
      transition={spring}
    >
      {lang === 'en' ? 'ID' : 'EN'}
    </motion.button>
  )
}
