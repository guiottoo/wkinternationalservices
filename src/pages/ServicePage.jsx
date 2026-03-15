import Navbar from '../components/Navbar'
import { SERVICE_CARDS, T } from '../i18n'

/* ── Back arrow SVG ──────────────────────────────────────────────── */
function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── ServicePage ─────────────────────────────────────────────────── */
export default function ServicePage({ slug, lang, setLang }) {
  const cards = SERVICE_CARDS[lang] || SERVICE_CARDS.pt
  const card  = cards.find(c => c.slug === slug)
  const t     = T[lang]

  /* Fallback — slug not found */
  if (!card) {
    return (
      <div style={{ minHeight: '100vh', background: '#080a0d', display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>Página não encontrada.</p>
        <a href="#" style={{ color: '#fff', fontSize: '0.85rem' }}>← Voltar</a>
      </div>
    )
  }

  return (
    <div className="svc-page">

      {/* ── Top: dark band with navbar ── */}
      <div className="svc-page__top">
        <Navbar lang={lang} setLang={setLang} />

        {/* Gradient hero using card.bg */}
        <div className="svc-page__hero" style={{ background: card.bg }}>
          <div className="svc-page__hero-overlay" />
          <div className="svc-page__hero-content">
            <a href="#" className="svc-page__back">
              <ArrowLeft /> {t.svcBack}
            </a>
            <span
              className="svc-card__badge"
              style={{
                background:  card.accent + '33',
                borderColor: card.accent + '66',
                color:       card.accent,
              }}
            >
              {card.category}
            </span>
            <h1 className="svc-page__title">{card.title}</h1>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="svc-page__body">
        <p className="svc-page__desc">{card.desc}</p>
        <div>
          <a
            href="mailto:wkinternationalservicesbr@gmail.com"
            className="btn-cta"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            {t.contact}
          </a>
        </div>
      </main>

    </div>
  )
}
