import earthSideImg from '../assets/earthside.png'
import { T } from '../i18n'
import Navbar from './Navbar'

export default function Hero({ lang, setLang }) {
  const t = T[lang]

  return (
    <section className="section-hero">
      {/* Navbar lives inside section-hero so hero-right spans the full viewport */}
      <Navbar lang={lang} setLang={setLang} />

      <div className="hero-layout">
        <div className="hero-left">
          <h1 className="hero-title" data-reveal>
            {t.heroLine1}<br />{t.heroLine2}
          </h1>
          <p className="hero-subtitle" data-reveal data-delay="1">
            <strong>{t.heroBold}</strong>{' '}{t.heroBody}
          </p>
          <a href="#contato" className="btn-cta" data-reveal data-delay="2">{t.learnMore}</a>
        </div>
      </div>

      <div className="hero-right">
        <img src={earthSideImg} alt="Earth" className="earthside-img" />
      </div>
    </section>
  )
}
