import { useState } from 'react'
import { usePageMotion } from '../lib/motion.js'

const EMAIL = 'baghelab1312@gmail.com'

export default function Contact() {
  const pageRef = usePageMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  // No backend — hand the note to the visitor's own mail client.
  const send = () => {
    const subject = encodeURIComponent('Portfolio contact — ' + (name || 'someone new'))
    const body = encodeURIComponent(`${msg}\n\n— ${name}${email ? ' · ' + email : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <main ref={pageRef} className="page">
      <section className="page-intro" data-anim="hero">
        <p className="kicker">CONTACT</p>
        <h1>Say <span className="serif-accent">hello.</span></h1>
        <p>Roles, projects, or a question about something I built — I read everything.</p>
      </section>

      <section className="contact-grid" data-reveal-group="1">
        <div className="panel panel--details">
          <h2>Details</h2>
          <div className="details">
            <div>
              <p className="detail-label">EMAIL</p>
              <a className="detail-val" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div>
              <p className="detail-label">PHONE</p>
              <a className="detail-val" href="tel:+917974415736">+91 79744 15736</a>
            </div>
            <div>
              <p className="detail-label">LOCATION</p>
              <p className="detail-val">Bengaluru, Karnataka, India</p>
            </div>
            <div>
              <p className="detail-label">ELSEWHERE</p>
              <div className="detail-links">
                <a className="detail-val" href="https://github.com/Bamof25th" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a className="detail-val" href="https://www.linkedin.com/in/aniket-baghel10/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
          </div>
          <div className="rule" />
          <a
            className="resume-cta"
            href="/assets/Aniket-Baghel-Resume.pdf"
            download="Aniket-Baghel-Resume.pdf"
          >
            Download resume (PDF)
          </a>
          <p className="resume-note">One page. Straight to the point.</p>
        </div>

        <div className="panel">
          <h2>Write me a note</h2>
          <div className="field-row">
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Priya Sharma"
              />
            </div>
            <div className="field">
              <label htmlFor="c-email">Your email</label>
              <input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>
          </div>
          <div className="field field--msg">
            <label htmlFor="c-msg">Message</label>
            <textarea
              id="c-msg"
              rows={6}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Hi Aniket — we're building…"
            />
          </div>
          <button type="button" className="send-btn" onClick={send}>Send message →</button>
          <p className="send-note">
            Sending opens your mail app with the note pre-filled — no servers, no spam, just email.
          </p>
        </div>
      </section>
    </main>
  )
}
