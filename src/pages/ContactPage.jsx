import Navbar  from '../components/Navbar'
import Contato  from '../components/Contato'
import Footer   from '../components/Footer'

export default function ContactPage({ lang, setLang }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#06080a' }}>
      <Navbar lang={lang} setLang={setLang} />
      <Contato lang={lang} sideGlobe />
      <Footer  lang={lang} />
    </div>
  )
}
