import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ab-theme') || 'light')

  useEffect(() => {
    document.body.dataset.theme = theme
    try {
      localStorage.setItem('ab-theme', theme)
    } catch {
      /* private mode */
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}
