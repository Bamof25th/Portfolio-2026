import { Link } from 'react-router-dom'
import { usePageMotion } from '../lib/motion.js'
import CodeStats from '../components/CodeStats.jsx'

const PROJECTS = [
  {
    eyebrow: 'MARRIAGE BIODATA STUDIO · LIVE',
    title: 'Parichay',
    bullets: [
      'Handcrafted biodata templates in six Indian languages, with a live preview that composes itself as you type.',
      'Crisp A4 PDF download, free and with no sign-up — details never leave the browser.',
      'Built and run solo, end to end — product, design, engineering and deployment.',
    ],
    tags: ['6 languages', 'Client-side PDF', 'No sign-up', '100% private'],
    links: [{ href: 'https://parichays.in/', label: 'Visit parichays.in ↗' }],
    note: '· source private',
    img: { src: '/uploads/pasted-1784205132923-0.png', alt: 'Parichay — marriage biodata studio', pos: '0% 30%' },
  },
  {
    eyebrow: 'AI STUDY TOOL · OPEN SOURCE',
    title: 'LearnWithMe',
    bullets: [
      'Upload a PDF and get an AI-generated quiz — 20 random questions per attempt, scored at the end with full solutions.',
      'GitHub OAuth plus email/password sign-in, backed by JWT in an httpOnly cookie.',
      'pdf-parse extracts the source text on the way in; jsPDF turns your results into a downloadable report on the way out.',
    ],
    tags: ['Next.js 14', 'MongoDB', 'Mongoose', 'OpenAI API', 'JWT', 'jsPDF'],
    links: [{ href: 'https://github.com/Bamof25th/learnwithme-next', label: 'Code on GitHub ↗' }],
    img: { src: '/uploads/slot-learnwithme.webp', alt: 'LearnWithMe — AI-generated quiz from a PDF' },
    flip: true,
    altMedia: true,
  },
  {
    eyebrow: 'MICROSERVICES PLATFORM · JUL 2025',
    title: 'The Quizzler',
    bullets: [
      'Separate Spring Boot services for users, quizzes, result processing and leaderboards — wired together with Spring Cloud.',
      'JWT authentication and role-based authorisation with Spring Security.',
      'React 19 + Vite frontend, integrated end to end with the services behind it.',
    ],
    tags: ['Java', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'React 19', 'MongoDB', 'MySQL'],
    links: [{ href: 'https://github.com/Bamof25th?tab=repositories', label: 'Code on GitHub ↗' }],
    img: { src: '/uploads/slot-quizzler.webp', alt: 'The Quizzler — microservices quiz platform' },
  },
  {
    eyebrow: 'WEB APP · MAY 2025',
    title: 'MdToPdf',
    bullets: [
      'Real-time Markdown preview that renders as you type — upload a .md file or write by hand.',
      'Multi-page PDF generation with proper formatting, built on jsPDF and html2canvas — no server round-trips.',
      'Clean, mobile-friendly interface styled with Tailwind CSS.',
    ],
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'jsPDF'],
    links: [
      { href: 'https://md-to-pdf-alpha.vercel.app/', label: 'Try it live ↗' },
      { href: 'https://github.com/Bamof25th/MdToPdf', label: 'Code on GitHub ↗' },
    ],
    img: { src: '/uploads/pasted-1784205205971-0.png', alt: 'MdToPdf — Markdown to PDF converter', pos: '50% 0%' },
    flip: true,
    altMedia: true,
  },
  {
    eyebrow: 'DEVELOPER Q&A PLATFORM · LIVE',
    title: 'CodeOverflow',
    bullets: [
      'A Stack Overflow for coders — ask a question, post answers, vote on what helped, and save the good ones to a collection.',
      'Rich TinyMCE editor with Prism-highlighted code blocks, plus tag pages, global search, community profiles and a jobs board.',
      'GitHub sign-in through NextAuth v5, MongoDB behind Mongoose, and every mutation running as a Next.js server action.',
    ],
    tags: ['Next.js 14', 'TypeScript', 'MongoDB', 'NextAuth v5', 'shadcn/ui', 'Tailwind CSS'],
    links: [
      { href: 'https://code-overflow-nu.vercel.app/', label: 'Try it live ↗' },
      { href: 'https://github.com/Bamof25th/codeOverflow', label: 'Code on GitHub ↗' },
    ],
    img: { src: '/uploads/codeoverflow.png', alt: 'CodeOverflow — developer Q&A platform', pos: '50% 0%' },
  },
]

const TIMELINE = [
  {
    date: 'SEP 2025 – FEB 2026 · BANGALORE',
    role: 'Associate Software Engineer',
    org: '@ Sapiens',
    body: 'Backend modules for an enterprise insurance platform. Shipped a security upgrade that put rate limiting and Google reCAPTCHA in front of the login flow, and handled production support with proper root-cause analysis — all inside a cross-functional Agile team.',
  },
  {
    date: 'MAR 2024 – DEC 2024 · REMOTE',
    role: 'Web Application Developer',
    org: '@ Trippyway',
    body: 'Sole frontend engineer — designed, built and maintained the entire React + Redux frontend. Reusable component library, REST API integrations, and a round of performance work that made the whole app feel faster.',
    alt: true,
  },
  {
    date: 'OCT 2023 – FEB 2024 · REMOTE',
    role: 'Web Dev Teaching Assistant',
    org: '@ Coding Ninjas',
    body: 'On the assessment and project-review team for the MERN curriculum. Resolved 600+ technical issues across backend APIs, databases, auth and debugging — and got recognized as a top-performing TA for it.',
    last: true,
  },
]

function ProjectMedia({ p }) {
  return (
    <div className={p.altMedia ? 'proj-media proj-media--alt' : 'proj-media'}>
      {p.img ? (
        <img src={p.img.src} alt={p.img.alt} style={{ objectPosition: p.img.pos }} />
      ) : (
        <div className="slot">{p.slot}</div>
      )}
    </div>
  )
}

function ProjectBody({ p }) {
  return (
    <div className="proj-body">
      <p className="eyebrow">{p.eyebrow}</p>
      <h2>{p.title}</h2>
      <div className="bullets">
        {p.bullets.map((b) => (
          <div className="bullet" key={b}>
            <p>{b}</p>
          </div>
        ))}
      </div>
      <div className="tags">
        {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
      <p className="proj-links">
        {p.links.map((l) => (
          <a href={l.href} target="_blank" rel="noreferrer" key={l.href}>{l.label}</a>
        ))}
        {p.note && <span className="note">{p.note}</span>}
      </p>
    </div>
  )
}

export default function Work() {
  const pageRef = usePageMotion()

  return (
    <main ref={pageRef} className="page">
      <section className="page-intro" data-anim="hero">
        <p className="kicker">SELECTED PROJECTS + EXPERIENCE</p>
        <h1>Work</h1>
        <p>
          Recent projects — built end to end, from data model to UI — plus where I've been along
          the way.
        </p>
      </section>

      {PROJECTS.map((p, i) => (
        <section
          className={[
            'proj',
            p.flip ? 'proj--flip' : '',
            i === 0 ? 'proj--first' : '',
          ].filter(Boolean).join(' ')}
          data-reveal="card"
          key={p.title}
        >
          {p.flip ? (
            <>
              <ProjectBody p={p} />
              <ProjectMedia p={p} />
            </>
          ) : (
            <>
              <ProjectMedia p={p} />
              <ProjectBody p={p} />
            </>
          )}
        </section>
      ))}

      <a
        className="more-gh"
        data-reveal="rise"
        href="https://github.com/Bamof25th"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <h3>More on GitHub</h3>
          <p>Experiments, course work and everything in between.</p>
        </div>
        <span>github.com/Bamof25th ↗</span>
      </a>

      <section className="section">
        <h2 className="section-title" style={{ marginBottom: 36 }} data-reveal="rise">
          Where I've been
        </h2>
        <div className="timeline" data-anim="timeline">
          {TIMELINE.map((t) => (
            <div className="tl-entry" key={t.org}>
              <div className="tl-rail">
                <span className={t.alt ? 'tl-dot tl-dot--alt' : 'tl-dot'} data-dot="1" />
                {!t.last && <span className="tl-line" data-rail="1" />}
              </div>
              <div className={t.last ? 'tl-body tl-body--last' : 'tl-body'}>
                <p className="tl-date">{t.date}</p>
                <h3>
                  {t.role} <span className="at">{t.org}</span>
                </h3>
                <p>{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 100 }} data-reveal="rise">
        <CodeStats />
      </div>

      <section className="cta" data-reveal="pop">
        <div>
          <h2>Want the full story behind a project?</h2>
          <p>Happy to walk through the architecture, the trade-offs, or the bugs.</p>
        </div>
        <Link to="/contact" className="cta-btn">Ask me →</Link>
      </section>
    </main>
  )
}
