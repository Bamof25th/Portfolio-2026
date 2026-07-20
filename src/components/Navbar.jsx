import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion.js'

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

export default function Navbar({ theme, onToggleTheme }) {
  const navRef = useRef(null)
  const { pathname } = useLocation()
  const [overHero, setOverHero] = useState(pathname === '/')

  useEffect(() => {
    if (prefersReducedMotion()) return
    // Staging: nav settles in from above
    const tween = gsap.from(navRef.current, { y: -30, opacity: 0, duration: .75, ease: 'power3.out' })
    return () => tween.revert()
  }, [])

  // On home, the nav floats over the dark cinematic hero — go transparent/white
  // there, then settle into the solid pill as the hero scrolls away.
  useEffect(() => {
    if (pathname !== '/') {
      setOverHero(false)
      return
    }
    const onScroll = () => setOverHero(window.scrollY < window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <header className="site-header">
      <nav ref={navRef} className={overHero ? 'nav nav--over-hero' : 'nav'}>
        <Link to="/" className="nav-brand">
          aniket<span className="dot">.</span>
        </Link>
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
        <NavLink to="/work" className={navLinkClass}>Work</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
        <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        <button type="button" className="theme-btn" onClick={onToggleTheme}>
          <span className="dot" />
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <a
          href="/assets/Aniket-Baghel-Resume.pdf"
          download="Aniket-Baghel-Resume.pdf"
          className="resume-btn"
        >
          Resume
        </a>
      </nav>
    </header>
  )
}
