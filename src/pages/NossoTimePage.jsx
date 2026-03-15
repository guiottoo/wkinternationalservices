import Navbar from '../components/Navbar'
import Footer  from '../components/Footer'
import { T }   from '../i18n'

export default function NossoTimePage({ lang, setLang }) {
  const t = T[lang]

  return (
    <div style={{ minHeight: '100vh', background: '#06080a', display: 'flex', flexDirection: 'column' }}>

      {/* ── Navbar ── */}
      <div style={{ background: '#06080a' }}>
        <Navbar lang={lang} setLang={setLang} />
      </div>

      {/* ── Hero band ── */}
      <div style={{
        padding: '80px 28px 72px',
        background: 'linear-gradient(160deg, #0f2027 0%, #203a43 55%, #2c5364 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 16,
      }}>
        <span style={{
          display: 'inline-block',
          padding: '6px 18px',
          background: 'rgba(110,158,240,0.14)',
          border: '1px solid rgba(110,158,240,0.38)',
          color: '#6e9ef0',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.13em',
          textTransform: 'uppercase',
          borderRadius: 999,
        }}>
          {t.ourTeam}
        </span>
        <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, margin: 0, letterSpacing: '-0.03em' }}>
          {t.ourTeam}
        </h1>
      </div>

      {/* ── Content placeholder ── */}
      <main style={{
        flex: 1,
        maxWidth: 900,
        margin: '80px auto',
        padding: '0 28px',
        color: 'rgba(255,255,255,0.55)',
        textAlign: 'center',
        fontSize: '1.1rem',
        lineHeight: 1.7,
      }}>
        <p>Em breve — conheça o time de especialistas por trás da WK.</p>
        <a href="#" style={{ color: '#6e9ef0', fontSize: '0.9rem', textDecoration: 'none', marginTop: 32, display: 'inline-block' }}>
          ← Voltar
        </a>
      </main>

      <Footer lang={lang} />
    </div>
  )
}
