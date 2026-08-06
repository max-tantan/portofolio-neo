import { MotionConfig } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { Marquee } from './components/Marquee'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { useScrollSpy } from './hooks/useScrollSpy'
import './App.css'

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
]

const STACK_MARQUEE = ['React', 'TypeScript', 'Three.js', 'WebGL', 'Vite', 'Figma', 'CSS Grid', 'Animation']
const TALK_MARQUEE = ['Open for work', 'Let’s build something bold', 'Say hi', 'Pastel forever']

function App() {
  const active = useScrollSpy(SECTION_IDS)

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <Sidebar active={active} />
        <main className="main">
          <Hero />
          <Marquee items={STACK_MARQUEE} className="marquee--top" />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Marquee items={TALK_MARQUEE} className="marquee--mid" />
          <Contact />
          <footer className="app-footer">Built with brute force, pastel energy & too much coffee</footer>
        </main>
      </div>
    </MotionConfig>
  )
}

export default App