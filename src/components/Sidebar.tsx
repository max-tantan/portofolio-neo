import { AnimatePresence, motion } from 'framer-motion'
import { lazy, Suspense, useEffect, useState } from 'react'
import { fadeUp, spring, stagger } from '../lib/motion'
import { useLanguage } from '../hooks/useLanguage'
import { LanguageToggle } from './LanguageToggle'

const Sidebar3D = lazy(() =>
  import('./Sidebar3D').then((m) => ({ default: m.Sidebar3D })),
)

type NavLinkProps = {
  item: { id: string; label: string; index: string }
  active: boolean
  pillId: string
  animate?: boolean
  ready?: boolean
  delay?: number
  onNavigate?: () => void
}

function NavLink({
  item,
  active,
  pillId,
  animate,
  ready = true,
  delay,
  onNavigate,
}: NavLinkProps) {
  const shouldAnimate = animate && ready
  return (
    <motion.a
      href={`#${item.id}`}
      className={`sidebar__link ${active ? 'is-active' : ''}`}
      onClick={onNavigate}
      initial={shouldAnimate ? { x: -30, opacity: 0 } : false}
      animate={shouldAnimate ? { x: 0, opacity: 1 } : undefined}
      transition={shouldAnimate ? { ...spring, delay } : undefined}
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
  ready?: boolean
}

export function Sidebar({ active, ready = true }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const { content } = useLanguage()
  const siteData = content.site
  const NAV = siteData.nav
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
        animate={ready ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
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

        <nav className="sidebar__nav" aria-label={siteData.ui.sections}>
          {NAV.map((item, i) => (
            <NavLink
              key={item.id}
              item={item}
              active={active === item.id}
              pillId="nav-pill"
              animate
              ready={ready}
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
        animate={ready ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <a href="#hero" className="sidebar__logo mobile-bar__logo" onClick={close}>
          <span className="sidebar__logo-star" aria-hidden="true" />
          <span className="sidebar__logo-name">{siteData.siteName}</span>
        </a>
        <div className="mobile-bar__actions">
          <LanguageToggle compact />
          <button
            type="button"
            className="hamburger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? siteData.ui.closeMenu : siteData.ui.openMenu}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
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
              aria-label={siteData.ui.sections}
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
                aria-label={siteData.ui.closeMenu}
              >
                &times;
              </button>
              <a href="#hero" className="sidebar__logo drawer__logo" onClick={close}>
                <span className="sidebar__logo-star" aria-hidden="true" />
                <span className="sidebar__logo-name">{siteData.siteName}</span>
              </a>
              <motion.div
                className="drawer__nav"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {NAV.map((item) => (
                  <motion.div key={item.id} variants={fadeUp}>
                    <NavLink
                      item={item}
                      active={active === item.id}
                      pillId="drawer-pill"
                      onNavigate={close}
                    />
                  </motion.div>
                ))}
              </motion.div>
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