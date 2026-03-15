import { useCallback, useEffect, useRef, useState } from 'react'
import { SERVICE_CARDS, T } from '../i18n'

/* ── Layout constants — must match CSS ──────────────────────────── */
const CARD_W = 300   // .svc-card width
const CARD_G = 16    // flex gap

/*
  scroll math (left-aligned):
    card[i] is at scroll position:  i * (CARD_W + CARD_G)
    getClosest at scrollLeft X:     round(X / (CARD_W + CARD_G))
*/

/* ── Nav chevrons ───────────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Single service card ─────────────────────────────────────────── */
function ServiceCard({ card, active, ctaLabel }) {
  return (
    <article
      className={`svc-card${active ? ' svc-card--active' : ''}`}
      style={{ background: card.bg }}
    >
      {card.img && <img src={card.img} alt="" className="svc-card__img" />}
      <div className="svc-card__noise" />
      <div className="svc-card__gradient" />

      <div className="svc-card__content">
        <div className="svc-card__body">
          <h3 className="svc-card__title">{card.title}</h3>
          <p className="svc-card__mini">{card.mini}</p>
          <p className="svc-card__desc">{card.desc}</p>
          <a href={`#${card.slug}`} className="svc-card__cta">{ctaLabel}</a>
        </div>
      </div>
    </article>
  )
}

/* ── Servicos section ────────────────────────────────────────────── */
export default function Servicos({ lang }) {
  const t      = T[lang]
  const cards  = SERVICE_CARDS[lang] || SERVICE_CARDS.pt
  const count  = cards.length

  const trackRef  = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  /* Snap to card[idx] using pure math — no DOM offsetLeft needed */
  const scrollToIdx = useCallback((idx) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(count - 1, idx))
    setActiveIdx(clamped)
    track.scrollTo({ left: clamped * (CARD_W + CARD_G), behavior: 'smooth' })
  }, [count])

  /* Detect closest card from current scrollLeft */
  const getClosest = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    const ideal = Math.round(track.scrollLeft / (CARD_W + CARD_G))
    return Math.max(0, Math.min(count - 1, ideal))
  }, [count])

  /* Guarantee track starts at scrollLeft=0 without touching isSnapping */
  useEffect(() => {
    const track = trackRef.current
    if (track) track.scrollLeft = 0
  }, [])

  /* Update active highlight while programmatic scroll animates */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => setActiveIdx(getClosest())
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [getClosest])

  const goPrev = () => scrollToIdx(activeIdx - 1)
  const goNext = () => scrollToIdx(activeIdx + 1)

  return (
    <section className="section-svc">

      <div className="svc-header">
        <h2 className="svc-header__title" data-reveal>{t.services}</h2>
        <p className="svc-header__sub" data-reveal data-delay="1">{t.servicesTagline}</p>
        <span className="svc-header__nav-hint" data-reveal data-delay="2">← → {t.svcNav}</span>
      </div>

      <div className="svc-carousel-wrapper">

        <button
          className="svc-nav__btn svc-nav__btn--prev"
          onClick={goPrev}
          disabled={activeIdx === 0}
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>

        <div className="svc-track" ref={trackRef}>
          <div className="svc-track__spacer" />
          {cards.map((card, i) => (
            <div key={i} data-reveal data-delay={i}>
              <ServiceCard
                card={card}
                active={i === activeIdx}
                ctaLabel={t.svcCta}
              />
            </div>
          ))}
          <div className="svc-track__spacer" />
        </div>

        <button
          className="svc-nav__btn svc-nav__btn--next"
          onClick={goNext}
          disabled={activeIdx === count - 1}
          aria-label="Próximo"
        >
          <ChevronRight />
        </button>

      </div>
    </section>
  )
}
