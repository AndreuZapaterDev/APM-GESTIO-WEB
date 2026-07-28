import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Herramientas from './pages/Herramientas'
import Actualidad from './pages/Actualidad'
import Fiscal from './pages/servicios/Fiscal'
import Laboral from './pages/servicios/Laboral'
import Contable from './pages/servicios/Contable'

function App() {
  return (
    <div className="mx-auto flex min-h-svh w-[70vw] flex-col text-center">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/servicios/fiscal" element={<Fiscal />} />
        <Route path="/servicios/laboral" element={<Laboral />} />
        <Route path="/servicios/contable" element={<Contable />} />
        <Route path="/herramientas" element={<Herramientas />} />
        <Route path="/actualidad" element={<Actualidad />} />
      </Routes>
    </div>
  )
}

export default App
