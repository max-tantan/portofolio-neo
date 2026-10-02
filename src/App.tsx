import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { LanguageToggle } from './components/LanguageToggle'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { LanguageProvider } from './context/LanguageProvider'
import { useLanguage } from './hooks/useLanguage'
import { useScrollSpy } from './hooks/useScrollSpy'
import { Cursor } from './components/interactions/Cursor'
import { ScrollProgress } from './components/interactions/ScrollProgress'
import { Magnetic } from './components/interactions/Magnetic'
import './styles/index.css'

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
]

function AppContent() {
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const active = useScrollSpy(SECTION_IDS)
  const { content } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <div className="app">
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <ScrollProgress />
      <Cursor />
      <Sidebar active={active} ready={!loading} />
      <LanguageToggle className="lang-toggle--floating" />
      <main className="main">
        <Hero ready={!loading} />
        <Marquee items={content.site.marqueeStack} className="marquee--top" />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Marquee items={content.site.marqueeTalk} className="marquee--mid" />
        <Contact />
        <footer className="app-footer">
          <span className="app-footer__meta">
            © {new Date().getFullYear()} {content.site.siteName}
          </span>
          <p className="app-footer__text">{content.site.footer}</p>
          <Magnetic strength={0.3}>
            <a className="app-footer__top" href="#hero">
              Top <span aria-hidden="true">↑</span>
            </a>
          </Magnetic>
        </footer>
      </main>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <AppContent />
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
