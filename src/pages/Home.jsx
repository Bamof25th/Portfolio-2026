import { Link } from 'react-router-dom'
import { usePageMotion } from '../lib/motion.js'
import CinematicHero from '../components/CinematicHero.jsx'

const MARQUEE = 'JAVA  ·  SPRING BOOT  ·  REACT  ·  NEXT.JS  ·  TYPESCRIPT  ·  MONGODB  ·  POSTGRESQL  ·  MYSQL  ·  AWS  ·  JENKINS  ·  GIT  ·  '

const STATS = [
  { num: '2+', label: 'years shipping production code' },
  { num: '950+', label: 'DSA problems solved across platforms' },
  { num: '600+', label: 'technical issues debugged for students as a TA' },
]

const FEATURED = [
  {
    eyebrow: 'LIVE PRODUCT · PARICHAYS.IN',
    title: 'Parichay',
    body: 'A marriage biodata studio — handcrafted templates in six Indian languages, a live preview, and free A4 PDFs that never leave the browser.',
    tags: ['6 languages', 'Client-side PDF', 'No sign-up'],
    img: { src: '/uploads/parichay.webp', alt: 'Parichay — marriage biodata studio', pos: '50% 20%' },
  },
  {
    eyebrow: 'AI STUDY TOOL · OPEN SOURCE',
    title: 'LearnWithMe',
    body: 'Upload a PDF, get an AI-generated quiz — 20 random questions, instant scoring with solutions, and results you can download as a PDF.',
    tags: ['Next.js 14', 'MongoDB', 'OpenAI API', 'JWT'],
    img: { src: '/uploads/slot-learnwithme.webp', alt: 'LearnWithMe — AI-generated quiz from a PDF' },
    alt: true,
  },
  {
    eyebrow: 'MICROSERVICES · 2025',
    title: 'The Quizzler',
    body: 'A quiz platform split into clean microservices — users, quizzes, results and leaderboards — locked down with JWT auth and role-based access.',
    tags: ['Java', 'Spring Boot', 'Spring Cloud', 'React 19', 'MongoDB'],
    img: { src: '/uploads/slot-quizzler.webp', alt: 'The Quizzler — microservices quiz platform' },
  },
  {
    eyebrow: 'WEB APP · 2025',
    title: 'MdToPdf',
    body: 'Markdown in, polished multi-page PDFs out — with a live preview, .md uploads and proper formatting, entirely in the browser.',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'jsPDF'],
    img: { src: '/uploads/mdtopdf.webp', alt: 'MdToPdf — Markdown to PDF converter', pos: '50% 0%' },
    alt: true,
  },
  {
    eyebrow: 'DEVELOPER Q&A · LIVE',
    title: 'CodeOverflow',
    body: 'A Stack Overflow for coders — questions, answers, votes and tags, with a rich editor and syntax-highlighted code blocks.',
    tags: ['Next.js 14', 'TypeScript', 'MongoDB', 'NextAuth'],
    img: { src: '/uploads/codeoverflow.webp', alt: 'CodeOverflow — developer Q&A platform', pos: '50% 0%' },
  },
  {
    eyebrow: 'FULL-STACK · OPEN SOURCE',
    title: 'MangaVerse',
    body: 'A full-stack manga reader on the MangaDex API — a clean vertical reader with bookmarks and history, on a stateless Spring Boot backend with Redis + RTK Query caching.',
    tags: ['Spring Boot 3', 'React 18', 'TypeScript', 'Redis', 'Docker'],
    img: { src: '/uploads/mangaverse.webp', alt: 'MangaVerse — full-stack manga reading platform', pos: '50% 0%' },
    alt: true,
  },
]

const BRING = [
  {
    title: 'Backend depth',
    body: 'Microservices, REST APIs, auth flows and data modeling with Spring Boot, MySQL, PostgreSQL and MongoDB.',
  },
  {
    title: 'Frontend care',
    body: 'React and Next.js interfaces built from reusable components — fast, responsive and genuinely pleasant to use.',
    alt: true,
  },
  {
    title: 'Production mindset',
    body: 'Root-cause analysis, rate limiting, CI/CD pipelines. I like software that survives contact with real users.',
  },
]

export default function Home() {
  const pageRef = usePageMotion()

  return (
    <>
      <CinematicHero />
      <main ref={pageRef} className="page">
        <div className="marquee" data-reveal="rise">
        <div className="marquee-track">
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </div>
      </div>

      <section className="stat-grid" data-reveal-group="1">
        {STATS.map((s) => (
          <div className="stat-card" data-tilt="1" key={s.num}>
            <p className="stat-num" data-count="1">{s.num}</p>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-head" data-reveal="rise">
          <h2>Featured work</h2>
          <Link to="/work">All projects →</Link>
        </div>
        <div className="feat-grid" data-reveal-group="1">
          {FEATURED.map((p) => (
            <Link to="/work" className="feat-card" key={p.title}>
              <div className={p.alt ? 'feat-media feat-media--alt' : 'feat-media'}>
                {p.img ? (
                  <img src={p.img.src} alt={p.img.alt} loading="lazy" decoding="async" style={{ objectPosition: p.img.pos }} />
                ) : (
                  <div className="slot">{p.slot}</div>
                )}
              </div>
              <div className="feat-body">
                <p className="eyebrow">{p.eyebrow}</p>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="tags">
                  {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal="rise">What I bring</h2>
        <div className="bring-grid" data-reveal-group="1">
          {BRING.map((b) => (
            <div className="bring-card" key={b.title}>
              <div className={b.alt ? 'bring-icon bring-icon--alt' : 'bring-icon'}>
                <span />
              </div>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta" data-reveal="pop">
        <div>
          <h2>Have a role or a project in mind?</h2>
          <p>My inbox is friendly. Tell me what you're building.</p>
        </div>
        <Link to="/contact" className="cta-btn">Let's talk →</Link>
      </section>
      </main>
    </>
  )
}
