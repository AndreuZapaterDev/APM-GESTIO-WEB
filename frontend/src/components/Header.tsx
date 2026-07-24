import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/APMGESTIO_LOGO.png'
import './Header.css'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'ca', label: 'CA' },
  { code: 'en', label: 'EN' },
]

function Header() {
  const { t, i18n } = useTranslation()

  const links = [
    { to: '/', label: t('nav.inicio') },
    { to: '/quienes-somos', label: t('nav.quienesSomos') },
    { to: '/servicios', label: t('nav.servicios') },
    { to: '/herramientas', label: t('nav.herramientas') },
  ]

  return (
    <header className="site-header">
      <img src={logo} alt="APM Gestión" className="site-logo" />
      <nav className="site-nav">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="lang-switcher">
        {languages.map(({ code, label }) => (
          <button
            key={code}
            type="button"
            className={i18n.resolvedLanguage === code ? 'active' : undefined}
            onClick={() => i18n.changeLanguage(code)}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  )
}

export default Header
