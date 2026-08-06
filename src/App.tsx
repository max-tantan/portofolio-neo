import { MotionConfig } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
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
  const active = useScrollSpy(SECTION_IDS)
  const { content } = useLanguage()

  return (
    <div className="app">
      <Sidebar active={active} />
      <LanguageToggle className="lang-toggle--floating" />
      <main className="main">
        <Hero />
        <Marquee items={content.site.marqueeStack} className="marquee--top" />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Marquee items={content.site.marqueeTalk} className="marquee--mid" />
        <Contact />
        <footer className="app-footer">{content.site.footer}</footer>
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
