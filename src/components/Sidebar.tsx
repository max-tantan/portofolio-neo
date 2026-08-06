import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { spring } from '../lib/motion'

const Sidebar3D = lazy(() =>
  import('./Sidebar3D').then((m) => ({ default: m.Sidebar3D })),
)

const NAV = [
  { id: 'hero', label: 'Home', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'experience', label: 'Experience', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
]

type SidebarProps = {
  active: string
}

export function Sidebar({ active }: SidebarProps) {
  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ...spring, delay: 0.1 }}
    >
      <motion.a
        href="#hero"
        className="sidebar__logo"
        whileHover={{ x: -3, y: -3 }}
        whileTap={{ x: 0, y: 0 }}
      >
        <span className="sidebar__logo-star" aria-hidden="true" />
        <span className="sidebar__logo-name">Fatanala</span>
      </motion.a>

      <nav className="sidebar__nav" aria-label="Sections">
        {NAV.map((item, i) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            className={`sidebar__link ${active === item.id ? 'is-active' : ''}`}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...spring, delay: 0.25 + i * 0.05 }}
            whileHover={{ x: -3, y: -3 }}
            whileTap={{ x: 0, y: 0 }}
          >
            {active === item.id && (
              <motion.span
                className="sidebar__link-pill"
                layoutId="nav-pill"
                transition={spring}
              />
            )}
            <span className="sidebar__link-index">{item.index}</span>
            <span className="sidebar__link-label">{item.label}</span>
          </motion.a>
        ))}
      </nav>

      <motion.div
        className="sidebar-3d-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.7 }}
      >
        <Suspense fallback={<div className="sidebar-3d sidebar-3d--loading" />}>
          <Sidebar3D />
        </Suspense>
      </motion.div>
    </motion.aside>
  )
}