import { T, REVIEW_TEXTS } from '../i18n'

import av1 from '../assets/av1.png'
import av2 from '../assets/av2.png'
import av3 from '../assets/av3.png'
import av4 from '../assets/av4.png'
import av5 from '../assets/av5.png'
import av6 from '../assets/av6.png'

/* ── Star SVG ──────────────────────────────────────────────────── */
function Stars() {
  return (
    <div className="review-stars" aria-label="5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f5c518">
          <path d="M8 1l1.854 3.756L14 5.517l-3 2.923.708 4.13L8 10.5l-3.708 2.07L5 8.44 2 5.517l4.146-.761L8 1z" />
        </svg>
      ))}
    </div>
  )
}

/* ── Google logo mark ─────────────────────────────────────────── */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
    </svg>
  )
}

/* ── Review static data (img / name / country) ─────────────────── */
const REVIEW_META = [
  { img: av1, name: 'Natalia Volkova', country: '🇷🇺 Rússia'    },
  { img: av2, name: 'Carlos Mendoza',  country: '🇦🇷 Argentina' },
  { img: av3, name: 'Priya Sharma',    country: '🇮🇳 Índia'     },
  { img: av4, name: 'Aleksei Petrov',  country: '🇷🇺 Rússia'    },
  { img: av5, name: 'Sofia Chen',      country: '🇨🇳 China'     },
  { img: av6, name: 'Marco Rossi',     country: '🇮🇹 Itália'    },
]

/* ── ReviewCard ───────────────────────────────────────────────── */
function ReviewCard({ review, delay }) {
  return (
    <article className="review-card" data-reveal data-delay={delay}>
      <div className="review-card__top">
        <img src={review.img} alt={review.name} className="review-avatar" />
        <div className="review-card__meta">
          <span className="review-name">{review.name}</span>
          <span className="review-country">{review.country}</span>
        </div>
        <div className="review-card__google">
          <GoogleMark />
        </div>
      </div>
      <Stars />
      <p className="review-text">"{review.text}"</p>
    </article>
  )
}

/* ── Avaliacoes section ───────────────────────────────────────── */
export default function Avaliacoes({ lang }) {
  const t = T[lang]
  const texts = REVIEW_TEXTS[lang] || REVIEW_TEXTS.pt
  const reviews = REVIEW_META.map((meta, i) => ({ ...meta, text: texts[i] }))

  return (
    <section className="section-avaliacoes">
      <div className="avaliacoes-container">

        <div className="avaliacoes-header" data-reveal>
          <span className="avaliacoes-badge">{t.reviewsBadge}</span>
          <h2 className="avaliacoes-title">{t.reviewsTitle}</h2>
          <p className="avaliacoes-sub">{t.reviewsSub}</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <ReviewCard key={i} review={r} delay={i % 3} />
          ))}
        </div>

      </div>
    </section>
  )
}
