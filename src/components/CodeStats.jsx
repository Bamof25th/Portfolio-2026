import { useEffect, useState } from 'react'

const GH_USER = 'Bamof25th'
const LC_USER = 'BAM11'

const LEVELS = [0, 30, 52, 76, 100]

/** Current / longest / total active days from LeetCode's submissionCalendar. */
function streaks(cal) {
  const days = new Set(
    Object.keys(cal || {})
      .filter((k) => cal[k] > 0)
      .map((k) => Math.floor(+k / 86400)),
  )
  const today = Math.floor(Date.now() / 86400000)
  let d = days.has(today) ? today : today - 1
  let cur = 0
  while (days.has(d)) { cur++; d-- }

  let max = 0
  let run = 0
  let prev = null
  for (const x of [...days].sort((a, b) => a - b)) {
    run = prev !== null && x === prev + 1 ? run + 1 : 1
    if (run > max) max = run
    prev = x
  }
  return { cur, max, active: days.size }
}

export default function CodeStats() {
  const [gh, setGh] = useState(null)
  const [ghErr, setGhErr] = useState(false)
  const [lc, setLc] = useState(null)
  const [lcErr, setLcErr] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('gh ' + r.status))))
      .then((d) => alive && setGh(d))
      .catch(() => alive && setGhErr(true))
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${LC_USER}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('lc ' + r.status))))
      .then((d) => alive && setLc(d))
      .catch(() => alive && setLcErr(true))
    return () => { alive = false }
  }, [])

  let ghDays = []
  if (gh && Array.isArray(gh.contributions)) {
    const first = gh.contributions[0]
    const pad = first ? new Date(first.date + 'T00:00:00Z').getUTCDay() : 0
    ghDays = Array.from({ length: pad }, () => ({ bg: 'transparent', tip: '' })).concat(
      gh.contributions.map((c) => ({
        bg:
          c.count === 0
            ? 'color-mix(in srgb, var(--ink) 8%, transparent)'
            : `color-mix(in oklab, var(--a) ${LEVELS[Math.min(c.level, 4)]}%, var(--card))`,
        tip: `${c.count}${c.count === 1 ? ' contribution on ' : ' contributions on '}${c.date}`,
      })),
    )
  }
  const ghTotalNum = gh ? Object.values(gh.total || {}).reduce((a, b) => a + b, 0) : null

  let cal = lc ? lc.submissionCalendar : null
  if (typeof cal === 'string') {
    try { cal = JSON.parse(cal) } catch { cal = null }
  }
  const st = lc ? streaks(cal) : null
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0) + '%'
  const lbl = (a, b) => `${a ?? 0} / ${b ?? 0}`

  const bars = [
    { key: 'easy', name: 'Easy', label: lc ? lbl(lc.easySolved, lc.totalEasy) : '— / —', w: lc ? pct(lc.easySolved, lc.totalEasy) : '0%' },
    { key: 'med', name: 'Medium', label: lc ? lbl(lc.mediumSolved, lc.totalMedium) : '— / —', w: lc ? pct(lc.mediumSolved, lc.totalMedium) : '0%' },
    { key: 'hard', name: 'Hard', label: lc ? lbl(lc.hardSolved, lc.totalHard) : '— / —', w: lc ? pct(lc.hardSolved, lc.totalHard) : '0%' },
  ]

  const lcUrl = `https://leetcode.com/u/${LC_USER}/`

  return (
    <div>
      <div className="cs-head">
        <p className="cs-kicker">
          <span className="pulse" />
          LIVE FROM GITHUB × LEETCODE
        </p>
        <h2>Proof of work</h2>
      </div>

      <div className="cs-grid">
        <div className="cs-card">
          <div className="cs-card-head">
            <h3>GitHub</h3>
            <a className="cs-handle" href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer">
              @{GH_USER} ↗
            </a>
          </div>
          <div className="cs-total">
            <p className="cs-big">{ghTotalNum === null ? '—' : ghTotalNum.toLocaleString('en-US')}</p>
            <p>contributions in the last year</p>
          </div>
          {gh && (
            <div className="cs-graph">
              <div className="cs-cal">
                {ghDays.map((d, i) => (
                  <span key={i} style={{ background: d.bg }} title={d.tip} />
                ))}
              </div>
            </div>
          )}
          {!gh && !ghErr && <p className="cs-pending">Loading contribution graph…</p>}
          {ghErr && (
            <img
              src={`https://ghchart.rshah.org/D95E3B/${GH_USER}`}
              alt="GitHub contribution chart"
              style={{ width: '100%', marginTop: 4 }}
            />
          )}
        </div>

        <div className="cs-card cs-card--lc">
          <div className="cs-card-head">
            <h3>LeetCode</h3>
            <a className="cs-handle" href={lcUrl} target="_blank" rel="noreferrer">
              @{LC_USER} ↗
            </a>
          </div>
          <div className="cs-stats">
            <div>
              <p className="cs-big">{st ? String(st.cur) : '—'}</p>
              <p>day streak</p>
            </div>
            <div>
              <p className="cs-big cs-big--plain">{lc ? (lc.totalSolved ?? 0).toLocaleString('en-US') : '—'}</p>
              <p>problems solved</p>
            </div>
            <div>
              <p className="cs-big cs-big--plain">{st ? String(st.max) : '—'}</p>
              <p>longest streak</p>
            </div>
          </div>
          <div className="cs-bars">
            {bars.map((b) => (
              <div key={b.key}>
                <div className="cs-bar-head">
                  <span>{b.name}</span>
                  <span>{b.label}</span>
                </div>
                <div className="cs-track">
                  <div className={`cs-fill cs-fill--${b.key}`} style={{ width: b.w }} />
                </div>
              </div>
            ))}
          </div>
          {lc && (
            <p className="cs-note">
              Global rank #{lc.ranking ? lc.ranking.toLocaleString('en-US') : '—'} · {st ? st.active : '—'} active days this year
            </p>
          )}
          {lcErr && (
            <p className="cs-note">
              Couldn't reach LeetCode just now —{' '}
              <a href={lcUrl} target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>
                see the profile directly ↗
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
