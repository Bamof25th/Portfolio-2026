# Portfolio — Aniket Baghel

React (Vite) implementation of the [Claude Design portfolio project](https://claude.ai/design/p/9f825780-a37c-4ded-98df-dcb19f196d01).

## Run

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # production build to dist/
```

## Pages

All four screens from the design project are implemented:

| Route      | Source            |
| ---------- | ----------------- |
| `/`        | `Home.dc.html`    |
| `/work`    | `Work.dc.html` (+ `CodeStats.dc.html`) |
| `/about`   | `About.dc.html`   |
| `/contact` | `Contact.dc.html` |

## Structure

- `src/index.css` — global styles + light/dark theme via CSS variables on `<body data-theme>` (persisted to `localStorage['ab-theme']`, light is default).
- `src/lib/motion.js` — `usePageMotion()`, a page-scoped port of the design's GSAP motion system (`data-anim`, `data-reveal`, `data-reveal-group`, `data-parallax`, `data-tilt`, `data-count`, `data-anim="timeline"`).
- `src/components/` — `Navbar` (sticky pill nav + theme toggle), `Footer`, `CodeStats`.
- `src/pages/` — one component per route.

`CodeStats` fetches live data on mount from two public APIs, exactly as the design does:

- `github-contributions-api.jogruber.de/v4/Bamof25th?y=last` — contribution calendar
- `leetcode-api-faisalshohag.vercel.app/BAM11` — solved counts, streaks, rank

Both degrade gracefully: GitHub falls back to a `ghchart.rshah.org` image, LeetCode to a link.

## Assets

All images and the resume are the real ones from the design project, copied from
the local export at `Downloads\Portfolio website redesign\`. The Claude Design API
caps file reads at 256 KiB, so most photos could not be pulled over the wire —
they came from that folder instead.

The two project screenshots were **not** loose files: the design stores them as
webp data URLs inside `.image-slots.state.json`, keyed by slot id. They were
extracted to:

- `slot-learnwithme.webp` ← slot `proj-learnwithme`
- `slot-quizzler.webp` ← slot `proj-quizzler`

### Known issue: image payload

`public/uploads/` is **~20 MB** — these are untouched camera originals:

| File | Size | Dimensions |
| --- | --- | --- |
| `DSC08761.JPG` | 8.8 MB | 6000 × 4000 |
| `IMG_20211227_152906.jpg` | 3.0 MB | 3472 × 4624 |
| `2024-12-28 16.14.55.jpg` | 2.5 MB | 3024 × 4032 |
| `2023-04-22 18.28.35.jpg` | 2.1 MB | 2268 × 4032 |
| `2023-11-12 22.16.13.jpg` | 2.0 MB | 4032 × 3024 |
| `DSC_0413-01-01.jpeg` | 0.9 MB | 1910 × 1910 |

The About gallery renders these in tiles a few hundred pixels wide, so they're
roughly 100× more pixels than needed and the page is slow on a cold load.
Worth resizing to ~1600px on the long edge and converting to webp before deploying.

(`DSC08761.JPG` also carries ~19 KB of zero padding after its JPEG end-of-image
marker. Harmless — decoders stop at the marker — but it's why a naive
"does the file end in FFD9" check will call it corrupt.)
