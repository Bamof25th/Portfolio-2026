import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { prefersReducedMotion } from '../lib/motion.js'

const SYS = { fontFamily: 'system-ui, sans-serif' }

const SCENES = [
  { label: 'Golden Hour', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4' },
  { label: 'Still Water', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4' },
  { label: 'Deep Woods', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4' },
  { label: 'Quiet Dawn', src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4' },
]

const OVERLAY_PNG = 'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png'

// Quick-hit proof points pinned to the bottom edge (always white per spec).
const STATS = ['2+ Years shipping production', '950+ DSA problems solved', '600+ Issues debugged as TA', 'Intentional-first design']

export default function CinematicHero() {
  const sectionRef = useRef(null)
  const videoRefs = useRef([])
  const [activeVideo, setActiveVideo] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Only videos the visitor has actually selected get a `src` — so the page
  // downloads ONE clip on load instead of all four at once.
  const [loaded, setLoaded] = useState(() => new Set([0]))
  const [inView, setInView] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)
  const [reduce] = useState(() => prefersReducedMotion())

  // The site nav is `position: sticky`, so it reserves space at the very top.
  // Pull the hero up by exactly that height so the video sits edge-to-edge
  // behind the floating nav pill without adding scroll below the fold.
  useLayoutEffect(() => {
    const header = document.querySelector('.site-header')
    const apply = () => {
      const h = header ? header.offsetHeight : 0
      if (sectionRef.current) sectionRef.current.style.marginTop = `-${h}px`
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [])

  // Pause playback when the hero scrolls off-screen or the tab is backgrounded,
  // so a hidden video isn't burning CPU/battery decoding frames.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    io.observe(el)
    const onVis = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Play only the active clip; keep every other one paused.
  useEffect(() => {
    const shouldPlay = !reduce && inView && tabVisible
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === activeVideo && shouldPlay) {
        const p = v.play()
        if (p && p.catch) p.catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [activeVideo, inView, tabVisible, reduce, loaded])

  const switchTo = (i) => {
    if (i === activeVideo || isTransitioning) return
    setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    setActiveVideo(i)
    setIsTransitioning(true)
    // Cooldown matches the 1000ms crossfade so clicks can't stack mid-fade.
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  // "Deep Woods" is a bright scene — flip the hero copy to dark ink for contrast.
  const isDark = activeVideo === 2
  const fg = isDark ? '#182C41' : '#ffffff'

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-svh overflow-hidden bg-black"
    >
      {/* ---- video layer ---- */}
      {SCENES.map((s, i) => (
        <video
          key={s.src}
          ref={(el) => (videoRefs.current[i] = el)}
          src={loaded.has(i) ? s.src : undefined}
          muted
          loop
          playsInline
          preload={loaded.has(i) ? 'auto' : 'none'}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            i === activeVideo ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* ---- transparent PNG overlay (train-bob) ---- */}
      <img
        src={OVERLAY_PNG}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        className={`pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover ${
          reduce ? '' : 'animate-train-bob'
        }`}
      />

      {/* ---- content layer ---- */}
      <div
        className="relative z-[2] flex min-h-svh flex-col px-5 pt-20 pb-8 sm:px-8 sm:pt-24 lg:px-12"
        style={{ color: fg, transition: 'color 700ms ease' }}
      >
        {/* hero content, centered in the remaining space */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div
            className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
            style={SYS}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Full-stack engineer · open to new roles
          </div>

          <h1 className="mt-6 max-w-4xl font-serifhero text-4xl italic leading-[1.1] sm:text-5xl md:text-7xl lg:text-[5.5rem]">
            I build web apps that are easy to use —<br />
            and hard to break.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed opacity-80 sm:text-base" style={SYS}>
            Full-stack engineer across Spring Boot microservices and React frontends — currently
            hardening login flows and shipping backend modules for enterprise insurance at Sapiens.
          </p>

          {/* CTA pill (liquid glass) */}
          <div className="liquid-glass mt-5 flex items-center gap-1 rounded-full p-1.5" style={SYS}>
            <Link
              to="/work"
              className="rounded-full px-5 py-2.5 text-sm text-current opacity-90 transition-opacity hover:opacity-100"
            >
              See my work
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#182C41] transition-colors hover:bg-white/90"
            >
              Let’s talk
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* video switcher */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            style={SYS}
          >
            {SCENES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => switchTo(i)}
                aria-pressed={i === activeVideo}
                className={`whitespace-nowrap rounded-full border border-solid px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-sm transition-all duration-300 sm:text-sm ${
                  i === activeVideo
                    ? 'border-transparent bg-white text-[#182C41] opacity-100 shadow-lg shadow-black/20'
                    : 'border-white/20 bg-white/10 text-current opacity-70 hover:bg-white/20 hover:opacity-100'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* bottom stats — always white */}
        <div
          className="flex flex-wrap items-center justify-center gap-y-1 text-center text-xs text-white/70 sm:text-sm"
          style={SYS}
        >
          {STATS.map((s, i) => (
            <span key={s} className="flex items-center">
              {s}
              {i < STATS.length - 1 && <span className="mx-3 hidden text-white/30 sm:inline">|</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
