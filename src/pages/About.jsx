import { usePageMotion } from '../lib/motion.js'
import { Link } from 'react-router-dom'

const TOOLBOX = [
  { label: 'LANGUAGES', items: ['Java', 'JavaScript', 'TypeScript', 'SQL', 'C++'] },
  { label: 'FRAMEWORKS', items: ['Spring', 'Spring Boot', 'React.js', 'Next.js'] },
  { label: 'DATA, CLOUD & DEVOPS', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Jenkins', 'CI/CD', 'Git'] },
  { label: 'FOUNDATIONS', items: ['Data Structures & Algorithms', 'OOP', 'Operating Systems'] },
]

const EDUCATION = [
  {
    degree: 'PGDAC',
    org: 'Institute for Advanced Computing and Software Development',
    score: '85%',
    dates: 'FEB 2025 – AUG 2025',
  },
  {
    degree: 'B.Tech',
    org: 'Bhilai Institute of Technology, Durg',
    score: '8.56 CGPA',
    dates: 'AUG 2019 – JUN 2023',
  },
]

const HIGHLIGHTS = [
  {
    icon: '#1',
    green: false,
    title: 'Top-performing TA',
    text: 'Recognized among Coding Ninjas teaching assistants.',
  },
  {
    icon: '950',
    green: true,
    title: '950+ problems solved',
    text: 'Across platforms — 250+ of them on LeetCode.',
  },
  {
    icon: 'GC',
    green: false,
    title: 'Google Cloud Skills Boost',
    text: 'Program participant, 2022.',
  },
]

const POSTS = [
  {
    title: 'Rate-limiting the front door',
    text: 'What hardening a production login flow with rate limits and reCAPTCHA actually involves.',
  },
  {
    title: 'One quiz, four services',
    text: 'Carving a quiz platform into microservices without losing your mind — or your data.',
  },
  {
    title: 'Markdown → PDF, the hard parts',
    text: 'Multi-page rendering, page breaks, and other things jsPDF makes you earn.',
  },
]

export default function About() {
  const pageRef = usePageMotion()

  return (
    <main ref={pageRef} className="page">
      <section className="about-hero">
        <div data-anim="hero">
          <p className="kicker">ABOUT ME</p>
          <h1>Happiest when the whole system clicks.</h1>
          <div className="hero-copy">
            <p>
              I'm Aniket — a software engineer in Bengaluru. The moment I'm chasing is when a system
              finally clicks: the API is clean, the UI feels obvious, and nothing falls over on a
              Friday deploy.
            </p>
            <p>
              I got here the builder's way. A B.Tech in Durg, then a stint as a teaching assistant
              at Coding Ninjas — where debugging <strong>600+ student projects</strong> taught me
              more about broken code than any course could. Then a year as the sole frontend
              engineer at Trippyway, owning a React codebase end to end.
            </p>
            <p>
              In 2025 I doubled down on the backend with a PGDAC, then joined{' '}
              <strong>Sapiens</strong> to work on enterprise insurance platforms — production
              support, root-cause analysis, and a security upgrade that put rate limiting and
              reCAPTCHA in front of the login flow.
            </p>
            <p>
              Off the clock I grind DSA problems (<strong>950+ and counting</strong>) and build
              side projects like The Quizzler and MdToPdf — mostly to answer my own "but how does
              that actually work?"
            </p>
          </div>
        </div>
        <div className="portrait-wrap" data-anim="portrait">
          <div className="portrait-plate" data-anim-plate="1" />
          <div className="portrait-frame" data-anim-frame="1">
            <img
              data-parallax="1"
              src="/uploads/2024-12-28%2016.14.55.jpg"
              alt="Aniket in a kurta"
            />
          </div>
          <div className="portrait-badge" data-anim-badge="1">
            <span className="dot" />
            Bengaluru, IN
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title" data-reveal="rise">Toolbox</h2>
        <div className="toolbox-grid" data-reveal-group="1">
          {TOOLBOX.map((group) => (
            <div className="tool-card" key={group.label}>
              <p className="tool-label">{group.label}</p>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section split">
        <div>
          <h2 className="section-title" data-reveal="rise">Education</h2>
          <div className="stack" data-reveal-group="1">
            {EDUCATION.map((edu) => (
              <div className="edu-card" key={edu.degree}>
                <div className="edu-head">
                  <div>
                    <h3>{edu.degree}</h3>
                    <p className="edu-org">{edu.org}</p>
                  </div>
                  <span className="score-badge">{edu.score}</span>
                </div>
                <p className="edu-dates">{edu.dates}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-title" data-reveal="rise">Highlights</h2>
          <div className="stack" data-reveal-group="1">
            {HIGHLIGHTS.map((hl) => (
              <div className="hl-card" key={hl.title}>
                <div className={hl.green ? 'hl-icon hl-icon--green' : 'hl-icon'}>
                  <span>{hl.icon}</span>
                </div>
                <div>
                  <h3>{hl.title}</h3>
                  <p>{hl.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title section-title--tight" data-reveal="rise">Off the clock</h2>
        <p className="section-sub" data-reveal="rise">
          Trips, weddings, festivals — and the occasional mirror selfie.
        </p>
        <div className="gallery" data-reveal-group="1">
          <div className="ph ph--tall" data-tilt="1">
            <img src="/uploads/IMG_20211227_152906.jpg" alt="Fitting-room mirror selfie" />
            <div className="ph-caption ph-caption--split">
              <p>The occasional selfie</p>
              <p className="ph-tag">FIT CHECK</p>
            </div>
          </div>
          <div className="ph ph--wide" data-tilt="1">
            <img
              src="/uploads/DSC08761.JPG"
              alt="With the crew in Bengaluru"
              style={{ objectPosition: '70% 10%' }}
            />
            <div className="ph-caption ph-caption--split">
              <p>The crew</p>
              <p className="ph-tag">BENGALURU</p>
            </div>
          </div>
          <div className="ph" data-tilt="1">
            <img src="/uploads/DSC_0413-01-01.jpeg" alt="College days" />
            <div className="ph-caption">
              <p>College days</p>
            </div>
          </div>
          <div className="ph" data-tilt="1">
            <img src="/uploads/2023-11-12%2022.16.13.jpg" alt="Diwali at home" />
            <div className="ph-caption">
              <p>Diwali at home</p>
            </div>
          </div>
          <div className="note-card">
            <p className="note-label">MEANWHILE</p>
            <div>
              <p className="note-quote">
                Cricket on Sundays, street food always, one trip every few months.
              </p>
              <p className="note-by">— the non-negotiables</p>
            </div>
          </div>
          <div className="ph" data-tilt="1">
            <img
              src="/uploads/2023-04-22%2018.28.35.jpg"
              alt="Festive kurta portrait at a wedding venue"
              style={{ objectPosition: '50% 30%' }}
            />
            <div className="ph-caption">
              <p>Wedding season</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div data-reveal="rise" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
          <h2 className="section-title section-title--tight" style={{ margin: 0 }}>Writing</h2>
        </div>
        <p className="section-sub" data-reveal="rise">
          Notes I'm turning into posts — all drawn from real work.
        </p>
        <div className="writing-grid" data-reveal-group="1">
          {POSTS.map((post) => (
            <div className="post-card" key={post.title}>
              <span className="draft-badge">DRAFT</span>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta" data-reveal="pop">
        <div>
          <h2>That's the short version.</h2>
          <p>For the rest — the projects, the war stories — just ask.</p>
        </div>
        <Link to="/contact" className="cta-btn">Get in touch →</Link>
      </section>
    </main>
  )
}
