import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { spring } from '../lib/motion'
import siteData from '../data/site.json'

const Sidebar3D = lazy(() =>
  import('./Sidebar3D').then((m) => ({ default: m.Sidebar3D })),
)

const NAV = siteData.nav

type NavLinkProps = {
  item: { id: string; label: string; index: string }
  active: boolean
  pillId: string
  animate?: boolean
  delay?: number
  onNavigate?: () => void
}

function NavLink({ item, active, pillId, animate, delay, onNavigate }: NavLinkProps) {
  return (
    <motion.a
      href={`#${item.id}`}
      className={`sidebar__link ${active ? 'is-active' : ''}`}
      onClick={onNavigate}
      initial={animate ? { x: -30, opacity: 0 } : false}
      animate={animate ? { x: 0, opacity: 1 } : undefined}
      transition={animate ? { ...spring, delay } : undefined}
      whileHover={{ x: -3, y: -3 }}
      whileTap={{ x: 0, y: 0 }}
    >
      {active && (
        <motion.span
          className="sidebar__link-pill"
          layoutId={pillId}
          transition={spring}
        />
      )}
      <span className="sidebar__link-index">{item.index}</span>
      <span className="sidebar__link-label">{item.label}</span>
    </motion.a>
  )
}

type SidebarProps = {
  active: string
}

export function Sidebar({ active }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
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
          <span className="sidebar__logo-name">{siteData.siteName}</span>
        </motion.a>

        <nav className="sidebar__nav" aria-label="Sections">
          {NAV.map((item, i) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              pillId="nav-pill"
              animate
              delay={0.25 + i * 0.05}
            />
          ))}
        </nav>

        <div className="sidebar-3d-wrap">
          <Suspense fallback={<div className="sidebar-3d sidebar-3d--loading" />}>
            <Sidebar3D />
          </Suspense>
        </div>
      </motion.aside>

      <motion.header
        className={`mobile-bar ${open ? 'is-open' : ''}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <a href="#hero" className="sidebar__logo mobile-bar__logo" onClick={close}>
          <span className="sidebar__logo-star" aria-hidden="true" />
          <span className="sidebar__logo-name">{siteData.siteName}</span>
        </a>
        <button
          type="button"
          className="hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-backdrop"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.nav
              className="drawer"
              aria-label="Sections"
              role="dialog"
              aria-modal="true"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={spring}
            >
              <button
                type="button"
                className="drawer__close"
                onClick={close}
                aria-label="Close menu"
              >
                &times;
              </button>
              <a href="#hero" className="sidebar__logo drawer__logo" onClick={close}>
                <span className="sidebar__logo-star" aria-hidden="true" />
                <span className="sidebar__logo-name">{siteData.siteName}</span>
              </a>
              <div className="drawer__nav">
                {NAV.map((item) => (
                  <NavLink
                    key={item.id}
                    item={item}
                    active={active === item.id}
                    pillId="drawer-pill"
                    onNavigate={close}
                  />
                ))}
              </div>
              <div className="sidebar-3d-wrap drawer__3d">
                <Suspense fallback={<div className="sidebar-3d sidebar-3d--loading" />}>
                  <Sidebar3D />
                </Suspense>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}