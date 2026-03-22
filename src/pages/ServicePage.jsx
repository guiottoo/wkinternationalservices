import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'
import { SERVICE_CARDS, SERVICE_PAGE_DATA, T } from '../i18n'
import estudanteBg       from '../assets/estudante-bgtitle.png'
import imobiliarioBg     from '../assets/imobiliario-bgtitle.png'
import naturalizacaoBg   from '../assets/naturalizacao-bgtitle.png'
import nomadeBg          from '../assets/nomadigital-bgtitle.png'
import tradJurBg         from '../assets/tradjur-bgtitle.png'
import aposentadoriaBg   from '../assets/aposetados-bgtitle.png'
import turistaBg         from '../assets/vistoturista-bgtitle.png'
import reuniaoBg         from '../assets/residence-bgtitle.png'
import acordosBg         from '../assets/residencia-acordos-tratados-bgtitle.png'

const SLUG_BG = {
  'visto-estudante':       estudanteBg,
  'visto-investidor':      imobiliarioBg,
  'naturalizacao':         naturalizacaoBg,
  'nomade-digital':        nomadeBg,
  'cnh-cpf':               tradJurBg,
  'visto-aposentadoria':   aposentadoriaBg,
  'visto-turista':         turistaBg,
  'reuniao-familiar':      reuniaoBg,
  'acordos-tratados':      acordosBg,
}

const BENEFIT_ICONS = [
  /* check */
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10.5l4 4 8-8" stroke="#6e9ef0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,
  /* shield */
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L3 5.5v5c0 4.2 3 7 7 8 4-1 7-3.8 7-8v-5L10 2z" stroke="#6e9ef0" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>,
  /* globe */
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7.5" stroke="#6e9ef0" strokeWidth="1.6"/>
    <path d="M2.5 10h15M10 2.5c-2 2.5-3 4.8-3 7.5s1 5 3 7.5M10 2.5c2 2.5 3 4.8 3 7.5s-1 5-3 7.5" stroke="#6e9ef0" strokeWidth="1.6"/>
  </svg>,
  /* star */
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2.5l2.2 4.7 5.1.5-3.8 3.5 1.2 5.1L10 13.8l-4.7 2.5 1.2-5.1L2.7 7.7l5.1-.5L10 2.5z" stroke="#6e9ef0" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>,
]

export default function ServicePage({ slug, lang, setLang }) {
  const cards    = SERVICE_CARDS[lang]    || SERVICE_CARDS.pt
  const allData  = SERVICE_PAGE_DATA[lang] || SERVICE_PAGE_DATA.pt
  const card     = cards.find(c => c.slug === slug)
  const pageData = allData?.[slug]
  const t        = T[lang]

  if (!card || !pageData) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9f9f9', display: 'flex',
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: 'rgba(0,0,0,0.4)', margin: 0 }}>Página não encontrada.</p>
        <a href="#" style={{ color: '#0d0d0d', fontSize: '0.85rem' }}>← Voltar</a>
      </div>
    )
  }

  return (
    <div className="svc-page">

      {/* ── Navbar + Hero with optional background ── */}
      <div
        className={`svc-page__top${SLUG_BG[slug] ? ' svc-page__top--bg' : ''}`}
        style={SLUG_BG[slug] ? {
          backgroundImage: `url(${SLUG_BG[slug]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        {SLUG_BG[slug] && <div className="svc-page__top-overlay" />}
        <Navbar lang={lang} setLang={setLang} />
        <div className="svc-page__hero">
          <div className="svc-page__hero-content">
            <h1 className="svc-page__title" data-reveal>{card.title}</h1>
            <p className="svc-page__subtitle" data-reveal data-delay="1">{pageData.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── 3 Stat Cards ── */}
      <div className="svc-page__stats">
        <div className="svc-stats-inner">
          {pageData.stats.map((s, i) => (
            <div key={i} className="svc-stat-card" data-reveal data-delay={i}>
              <div className="svc-stat-card__value">{s.value}</div>
              <div className="svc-stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Requirements (alternating timeline) ── */}
      <div className="svc-page__requirements">
        <div className="svc-section-inner">
          <h2 className="svc-section__title" data-reveal>{t.svcRequirements}</h2>
          <div className="svc-req-timeline">
            {pageData.requirements.map((r, i) => (
              <div key={i} className={`svc-req-block svc-req-block--${i % 2 === 0 ? 'left' : 'right'}`}>
                {i % 2 === 0 ? (
                  <>
                    <div className="svc-req-block__card" data-reveal data-delay={i}>
                      <span className="svc-req-block__num">{String(i + 1).padStart(2, '0')}</span>
                      <p className="svc-req-block__text">{r}</p>
                    </div>
                    <div className="svc-req-block__center">
                      <div className="svc-req-block__dot" />
                    </div>
                    <div className="svc-req-block__spacer" />
                  </>
                ) : (
                  <>
                    <div className="svc-req-block__spacer" />
                    <div className="svc-req-block__center">
                      <div className="svc-req-block__dot" />
                    </div>
                    <div className="svc-req-block__card" data-reveal data-delay={i}>
                      <span className="svc-req-block__num">{String(i + 1).padStart(2, '0')}</span>
                      <p className="svc-req-block__text">{r}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
            <div className="svc-req-timeline__line" />
          </div>
        </div>
      </div>

      {/* ── Benefits Grid ── */}
      <div className="svc-page__benefits">
        <div className="svc-section-inner">
          <h2 className="svc-section__title" data-reveal>{t.svcBenefits}</h2>
          <div className="svc-benefits-grid">
            {pageData.benefits.map((b, i) => (
              <div key={i} className="svc-benefit-card" data-reveal data-delay={i}>
                <div className="svc-benefit-card__icon">{BENEFIT_ICONS[i % BENEFIT_ICONS.length]}</div>
                <p className="svc-benefit-card__text">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Contact CTA ── */}
      <div className="svc-page__cta-section">
        <div className="svc-cta-inner" data-reveal>
          <h2 className="svc-page__cta-title">{pageData.contactTitle}</h2>
          <p className="svc-page__cta-subtitle">{pageData.contactSubtitle}</p>
          <a href="#contato-pagina" className="svc-page__cta-btn">
            {t.contact} →
          </a>
        </div>
      </div>

      <Footer lang={lang} />

    </div>
  )
}
