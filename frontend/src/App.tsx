import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Servicios from './pages/Servicios'
import Herramientas from './pages/Herramientas'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/herramientas" element={<Herramientas />} />
      </Routes>
    </>
  )
}

export default App
