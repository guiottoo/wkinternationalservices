import Navbar  from '../components/Navbar'
import Contato  from '../components/Contato'
import Footer   from '../components/Footer'
import { T }    from '../i18n'
import teamImg  from '../assets/TIMEWK.jpg'
import imgWilian  from '../assets/wilian.jpg'
import imgMatheus from '../assets/matheus.jpg'
import imgLuciana from '../assets/luciana.jpg'
import imgVitoria from '../assets/vitoria.jpg'
import imgPedro   from '../assets/pedro.jpg'

const MEMBERS = [
  { name: 'Wilian Knoner Campos',  roleKey: 'roleDirector',      bg: 'linear-gradient(160deg, #0f2027 0%, #203a43 55%, #2c5364 100%)', img: imgWilian  },
  { name: 'Matheus Berger Severo', roleKey: 'roleGerente',       bg: 'linear-gradient(160deg, #0d0d1a 0%, #1a1a3e 55%, #2a2a6e 100%)', img: imgMatheus },
  { name: 'Luciana Pena',          roleKey: 'roleConsultora',    bg: 'linear-gradient(160deg, #001a0d 0%, #003d1f 55%, #00592d 100%)', img: imgLuciana },
  { name: 'Vitória Guarnieri',     roleKey: 'roleConsultoraAdm', bg: 'linear-gradient(160deg, #1a0e00 0%, #3d2200 55%, #6b3a00 100%)', img: imgVitoria },
  { name: 'Marina Casagrande',     roleKey: 'roleAdvogada',      bg: 'linear-gradient(160deg, #0d1a1a 0%, #1a3d3d 55%, #1a5959 100%)', img: null       },
  { name: 'Pedro Welter Henkes',   roleKey: 'roleAssessor',      bg: 'linear-gradient(160deg, #1a0008 0%, #3d0016 55%, #6b0028 100%)', img: imgPedro   },
]

export default function EquipePage({ lang, setLang }) {
  const t = T[lang]

  return (
    <div className="team-page">

      {/* ── Navbar (sits directly on white+dots background) ── */}
      <Navbar lang={lang} setLang={setLang} logoDark />

      {/* ── Hero ── */}
      <div className="team-page__hero">
        <div className="team-page__hero-content">
          <h1 className="team-page__title" data-reveal>{t.equipe}</h1>
          <p className="team-page__sub" data-reveal data-delay="1">{t.equipeSub}</p>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="team-page__body">

        {/* Group card */}
        <div className="team-card team-card--group" data-reveal>
          <img src={teamImg} alt="Equipe WK" className="team-card__img" />
          <div className="team-card__gradient" />
          <div className="team-card__info">
            <span className="team-card__role">WK International Services</span>
            <h2 className="team-card__name">{t.ourTeam}</h2>
          </div>
        </div>

        {/* Individual cards — 2 per row, 5th centered */}
        <div className="team-cards-grid">
          {MEMBERS.map((m, i) => (
            <div
              key={i}
              className="team-card"
              style={{ background: m.bg }}
              data-reveal
              data-delay={i}
            >
              {m.img && <img src={m.img} alt={m.name} className="team-card__img" />}
              <div className="team-card__noise" />
              <div className="team-card__gradient" />
              <div className="team-card__info">
                <span className="team-card__role">{t[m.roleKey]}</span>
                <h3 className="team-card__name">{m.name}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Contact + Footer ── */}
      <Contato lang={lang} />
      <Footer  lang={lang} />

    </div>
  )
}
