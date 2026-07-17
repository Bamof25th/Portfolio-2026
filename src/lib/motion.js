import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.config({ nullTargetWarn: false })

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Page-scoped port of the design project's ABMotion (motion.js).
 * Attach the returned ref to the page root; every [data-*] motion
 * attribute inside it gets wired up on mount and reverted on unmount.
 */
export function usePageMotion() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return

    const cleanups = []
    const $ = (sel) => Array.from(ref.current.querySelectorAll(sel))

    const ctx = gsap.context(() => {
      // Overlapping action: hero children cascade with slow-out easing
      $('[data-anim="hero"]').forEach((el) => {
        gsap.from(el.children, { y: 36, opacity: 0, duration: .95, ease: 'power3.out', stagger: .11, delay: .05 })
      })

      // Follow-through: portrait rises, plate over-rotates and settles, badge pops late
      $('[data-anim="portrait"]').forEach((el) => {
        const plate = el.querySelector('[data-anim-plate]')
        const frame = el.querySelector('[data-anim-frame]')
        const badge = el.querySelector('[data-anim-badge]')
        const tl = gsap.timeline({ delay: .18 })
        if (frame) tl.from(frame, { y: 48, opacity: 0, duration: 1.05, ease: 'power3.out' }, 0)
        if (plate) tl.from(plate, { opacity: 0, rotation: '+=7', scale: .93, duration: 1.15, ease: 'back.out(1.5)' }, .08)
        if (badge) tl.from(badge, { scale: 0, opacity: 0, y: 10, duration: .65, ease: 'back.out(2.4)' }, .6)
      })

      // Secondary action: slow parallax drift inside portrait frames
      $('[data-parallax]').forEach((img) => {
        gsap.set(img, { scale: 1.12 })
        gsap.fromTo(img, { yPercent: -4 }, {
          yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: img.parentElement || img, start: 'top bottom', end: 'bottom top', scrub: .5 },
        })
      })

      // Scroll reveals — rise / card / pop (anticipation via slight scale)
      $('[data-reveal]').forEach((el) => {
        const kind = el.getAttribute('data-reveal')
        const st = { trigger: el, start: 'top 88%', once: true }
        if (kind === 'pop') gsap.from(el, { y: 26, opacity: 0, scale: .955, duration: .85, ease: 'back.out(1.4)', scrollTrigger: st })
        else if (kind === 'card') gsap.from(el, { y: 52, opacity: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: st })
        else gsap.from(el, { y: 36, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: st })
      })

      $('[data-reveal-group]').forEach((el) => {
        gsap.from(el.children, {
          y: 36, opacity: 0, scale: .97, duration: .85, ease: 'power3.out', stagger: .09,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        })
      })

      // Timing: numbers count up when they enter.
      // The tween writes to the same textContent it reads its target from, and
      // gsap.context().revert() restores styles but not text — so cache the
      // authored value or a re-run (StrictMode, remount) reads back the
      // mid-animation "0" and counts 0 -> 0 forever.
      $('[data-count]').forEach((el) => {
        const raw = el.dataset.countRaw ?? el.textContent.trim()
        el.dataset.countRaw = raw
        const m = raw.match(/[0-9,]+/)
        if (!m) return
        const num = parseFloat(m[0].replace(/,/g, ''))
        const pre = raw.slice(0, m.index)
        const suf = raw.slice(m.index + m[0].length)
        const o = { v: 0 }
        gsap.to(o, {
          v: num, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          onUpdate: () => { el.textContent = pre + Math.round(o.v).toLocaleString('en-US') + suf },
        })
        cleanups.push(() => { el.textContent = raw })
      })

      // Timeline: dots pop, entries slide, rails draw downward
      $('[data-anim="timeline"]').forEach((root) => {
        Array.from(root.children).forEach((entry) => {
          const dot = entry.querySelector('[data-dot]')
          const rail = entry.querySelector('[data-rail]')
          const body = entry.children[1]
          const tl = gsap.timeline({ scrollTrigger: { trigger: entry, start: 'top 85%', once: true } })
          if (dot) tl.from(dot, { scale: 0, duration: .55, ease: 'back.out(2.6)' }, 0)
          if (body) tl.from(body, { x: 30, opacity: 0, duration: .85, ease: 'power3.out' }, .1)
          if (rail) tl.from(rail, { scaleY: 0, transformOrigin: '50% 0%', duration: 1, ease: 'power2.inOut' }, .18)
        })
      })

      // Appeal: gentle 3D tilt following the cursor
      $('[data-tilt]').forEach((card) => {
        gsap.set(card, { transformPerspective: 700 })
        const rx = gsap.quickTo(card, 'rotationX', { duration: .55, ease: 'power2.out' })
        const ry = gsap.quickTo(card, 'rotationY', { duration: .55, ease: 'power2.out' })
        const sc = gsap.quickTo(card, 'scale', { duration: .45, ease: 'power2.out' })
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          ry(((e.clientX - r.left) / r.width - .5) * 6)
          rx(((e.clientY - r.top) / r.height - .5) * -6)
          sc(1.015)
        }
        const onLeave = () => { rx(0); ry(0); sc(1) }
        card.addEventListener('pointermove', onMove)
        card.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          card.removeEventListener('pointermove', onMove)
          card.removeEventListener('pointerleave', onLeave)
        })
      })
    }, ref)

    const t = setTimeout(() => ScrollTrigger.refresh(), 900)
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad, { once: true })

    return () => {
      clearTimeout(t)
      window.removeEventListener('load', onLoad)
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return ref
}
