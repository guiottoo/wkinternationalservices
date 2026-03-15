import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import logoImg from '../assets/WKLOGOPNG.png'
import { LANGS, SERVICE_SLUGS, SERVICES, T } from '../i18n'

/* ── Chevron SVG ───────────────────────────────────────────────── */
function Chevron({ open }) {
  return (
    <svg
      className={`nav-chevron${open ? ' open' : ''}`}
      width="10" height="6" viewBox="0 0 10 6" fill="none"
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── ServicesDropdown ───────────────────────────────────────────── */
function ServicesDropdown({ lang }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const items = SERVICES[lang] || SERVICES.pt

  return (
    <div className="services-wrapper" ref={ref}>
      <button
        className="services-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {T[lang].services}
        <Chevron open={open} />
      </button>

      {open && (
        <div className="services-dropdown">
          {items.map((item, i) => (
            <a key={i} href={`#${SERVICE_SLUGS[i]}`} className="services-item"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── LangSelector ──────────────────────────────────────────────── */
function LangSelector({ lang, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const current = LANGS.find(l => l.code === lang)

  return (
    <div className="lang-selector" ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="lang-flag">{current.flag}</span>
        <span className="lang-code">{current.label}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox">
          {LANGS.map(l => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === lang}
              className={`lang-option${l.code === lang ? ' active' : ''}`}
              onClick={() => { onChange(l.code); setOpen(false) }}
            >
              <span className="lang-flag">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── HamburgerMenu ──────────────────────────────────────────────── */
function HamburgerMenu({ lang, onChange, t }) {
  const [open, setOpen]           = useState(false)
  const [servicesOpen, setSvcOpen] = useState(false)

  const close = () => { setOpen(false); setSvcOpen(false) }

  return (
    <div className="hamburger-wrapper">
      <button className="hamburger-btn" onClick={() => setOpen(true)} aria-label="Open menu">
        <span /><span /><span />
      </button>

      {open && createPortal(
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <img src={logoImg} alt="WK" className="mobile-menu-logo" />
            <button className="mobile-menu-close" onClick={close} aria-label="Close menu">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <nav className="mobile-menu-nav">
            <a href="#quem-somos" className="mobile-menu-item" onClick={close}>{t.whoWeAre}</a>

            <button
              className="mobile-menu-item mobile-svc-trigger"
              onClick={() => setSvcOpen(o => !o)}
            >
              {t.services}
              <Chevron open={servicesOpen} />
            </button>
            {servicesOpen && (
              <div className="mobile-svc-list">
                {(SERVICES[lang] || SERVICES.pt).map((item, i) => (
                  <a key={i} href={`#${SERVICE_SLUGS[i]}`} className="mobile-svc-item" onClick={close}>{item}</a>
                ))}
              </div>
            )}

            <a href="#nosso-time" className="mobile-menu-item" onClick={close}>{t.ourTeam}</a>
            <a href="#blog" className="mobile-menu-item" onClick={close}>{t.blog}</a>

            <div className="mobile-lang-row">
              <LangSelector lang={lang} onChange={onChange} />
            </div>
          </nav>

          <div className="mobile-menu-footer">
            <a href="#contato" className="mobile-menu-cta" onClick={close}>{t.contact}</a>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────────── */
export default function Navbar({ lang, setLang }) {
  const t = T[lang]

  return (
    <div className="nav-wrapper">
      <nav className="liquid-glass-nav">
        <a href="#"><img src={logoImg} alt="WK Logo" className="nav-logo" /></a>
        <div className="nav-links">
          <a href="#quem-somos" className="nav-link-item">{t.whoWeAre}</a>
          <ServicesDropdown lang={lang} />
          <a href="#nosso-time" className="nav-link-item">{t.ourTeam}</a>
          <a href="#blog" className="nav-link-item">{t.blog}</a>
          <LangSelector lang={lang} onChange={setLang} />
          <a href="#contato" className="nav-cta-link">{t.contact}</a>
        </div>
        <HamburgerMenu lang={lang} onChange={setLang} t={t} />
      </nav>
    </div>
  )
}
