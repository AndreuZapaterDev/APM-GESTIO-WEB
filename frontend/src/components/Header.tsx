import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { FileText, Users, BarChart3, Home, Building2, Briefcase, Wrench, Newspaper } from 'lucide-react'
import logo from '../assets/APMGESTIO_LOGO.png'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
]

function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [servicesHover, setServicesHover] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linksBefore = [
    { to: '/', label: t('nav.inicio'), icon: Home },
    { to: '/quienes-somos', label: t('nav.quienesSomos'), icon: Building2 },
  ]
  const linksAfter = [
    { to: '/herramientas', label: t('nav.herramientas'), icon: Wrench },
    { to: '/actualidad', label: t('nav.actualidad'), icon: Newspaper },
  ]
  const serviceLinks = [
    { to: '/servicios/fiscal', label: t('servicios.fiscal.title'), icon: FileText },
    { to: '/servicios/laboral', label: t('servicios.laboral.title'), icon: Users },
    { to: '/servicios/contable', label: t('servicios.contable.title'), icon: BarChart3 },
  ]
  const servicesActive = location.pathname.startsWith('/servicios')

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `inline-flex items-center gap-1.5 border-b-2 pb-1 font-medium text-neutral-950 no-underline transition-colors hover:text-accent ${
      isActive ? 'border-accent text-accent' : 'border-transparent'
    }`

  const langButtonClass = (code: string) =>
    `rounded-full border px-2.5 py-1 text-sm font-semibold transition-colors ${
      i18n.resolvedLanguage === code
        ? 'border-accent bg-accent text-white'
        : 'border-border text-neutral-950 hover:border-accent'
    }`

  const closeMenu = () => {
    setMenuOpen(false)
    setServicesOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b-2 border-accent p-4 transition-all duration-300 ${
        scrolled ? 'bg-white/75 shadow-soft backdrop-blur-lg' : 'bg-white'
      }`}
    >
      <div className="flex items-center justify-between">
        <img src={logo} alt="APM Gestió" className="h-14 w-auto" />

        <nav className="hidden items-center lg:flex lg:gap-8">
          {linksBefore.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesHover(true)}
            onMouseLeave={() => setServicesHover(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setServicesHover(false)
            }}
          >
            <button
              type="button"
              onFocus={() => setServicesHover(true)}
              className={`inline-flex items-center gap-1.5 border-b-2 pb-1 font-medium transition-colors hover:text-accent ${
                servicesActive ? 'border-accent text-accent' : 'border-transparent text-neutral-950'
              }`}
            >
              <Briefcase size={16} strokeWidth={1.75} />
              {t('nav.servicios')}
            </button>
            <AnimatePresence>
              {servicesHover && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 z-10 mt-3 w-60 origin-top -translate-x-1/2 rounded-xl bg-white p-2 shadow-soft-lg"
                >
                  <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-border bg-white" />
                  {serviceLinks.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium no-underline transition-colors hover:bg-neutral-50 hover:text-accent ${
                          isActive ? 'text-accent' : 'text-neutral-950'
                        }`
                      }
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      {label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {linksAfter.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex lg:gap-1">
          {languages.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              className={langButtonClass(code)}
              onClick={() => i18n.changeLanguage(code)}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-6 bg-neutral-950 transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span className={`block h-0.5 w-6 bg-neutral-950 transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span
            className={`block h-0.5 w-6 bg-neutral-950 transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="flex flex-col items-center gap-4 pt-6">
              {linksBefore.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'} className={navLinkClass} onClick={closeMenu}>
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </NavLink>
              ))}

              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1.5 border-b-2 pb-1 font-medium transition-colors hover:text-accent ${
                    servicesActive ? 'border-accent text-accent' : 'border-transparent text-neutral-950'
                  }`}
                  onClick={() => setServicesOpen((open) => !open)}
                >
                  <Briefcase size={16} strokeWidth={1.75} />
                  {t('nav.servicios')}
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col items-center gap-3 pt-3">
                        {serviceLinks.map(({ to, label, icon: Icon }) => (
                          <NavLink
                            key={to}
                            to={to}
                            className="flex items-center gap-2 font-medium text-neutral-950 no-underline transition-colors hover:text-accent"
                            onClick={closeMenu}
                          >
                            <Icon size={16} strokeWidth={1.75} />
                            {label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {linksAfter.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} end={to === '/'} className={navLinkClass} onClick={closeMenu}>
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="flex justify-center gap-1 pt-4">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={langButtonClass(code)}
                  onClick={() => i18n.changeLanguage(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
