import Navbar  from '../components/Navbar'
import Contato  from '../components/Contato'
import Footer   from '../components/Footer'
import { T }    from '../i18n'

export default function ContactPage({ lang, setLang }) {
  const t = T[lang]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#06080a' }}>
      <Navbar lang={lang} setLang={setLang} />
      <Contato lang={lang} headline={`${t.heroLine1} ${t.heroLine2}`} subtitle={t.heroBody} sideGlobe showStats />
      <Footer  lang={lang} />
    </div>
  )
}
