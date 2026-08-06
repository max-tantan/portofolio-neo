import { motion } from 'framer-motion'
import { spring } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'

type LanguageToggleProps = {
  className?: string
  compact?: boolean
}

export function LanguageToggle({ className = '', compact = false }: LanguageToggleProps) {
  const { lang, toggle } = useLanguage()

  return (
    <motion.button
      type="button"
      className={`lang-toggle ${compact ? 'lang-toggle--compact' : ''} ${className}`}
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Beralih ke English'}
      whileHover={{ y: -3, x: -3 }}
      whileTap={{ y: 3, x: 3 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={spring}
    >
      {lang === 'en' ? 'ID' : 'EN'}
    </motion.button>
  )
}
