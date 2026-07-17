import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/motion.js'

const navLinkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')

export default function Navbar({ theme, onToggleTheme }) {
  const navRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    // Staging: nav settles in from above
    const tween = gsap.from(navRef.current, { y: -30, opacity: 0, duration: .75, ease: 'power3.out' })
    return () => tween.revert()
  }, [])

  return (
    <header className="site-header">
      <nav ref={navRef} className="nav">
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
