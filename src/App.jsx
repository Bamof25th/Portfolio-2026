import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

// Home is the landing page, so it ships in the main bundle. The rest are
// split into their own chunks and fetched on navigation.
const Work = lazy(() => import('./pages/Work.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))

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
      <Suspense fallback={<div className="page" style={{ minHeight: '70vh' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
