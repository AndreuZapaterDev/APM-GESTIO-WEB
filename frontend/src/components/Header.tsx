import { NavLink } from 'react-router-dom'
import logo from '../assets/APMGESTIO_LOGO.png'
import './Header.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/herramientas', label: 'Herramientas' },
]

function Header() {
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
    </header>
  )
}

export default Header
