import { useState, useEffect } from 'react'
import Hero         from './components/Hero'
import OQueFazemos  from './components/OQueFazemos'
import QuemSomos    from './components/QuemSomos'
import Servicos     from './components/Servicos'
import Escritorios  from './components/Escritorios'
import Avaliacoes   from './components/Avaliacoes'
import Contato      from './components/Contato'
import Footer       from './components/Footer'
import ServicePage   from './pages/ServicePage'
import NossoTimePage from './pages/NossoTimePage'
import BlogPage      from './pages/BlogPage'
import { SERVICE_SLUGS } from './i18n'
import './App.css'
import './responsive.css'

const ALL_SLUGS = [...SERVICE_SLUGS, 'nosso-time', 'blog']

function getSlugFromHash() {
  const hash = window.location.hash.slice(1)
  return ALL_SLUGS.includes(hash) ? hash : null
}

export default function App() {
  const [lang, setLang] = useState('pt')
  const [slug, setSlug] = useState(getSlugFromHash)

  useEffect(() => {
    const onHashChange = () => setSlug(getSlugFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // Global scroll-reveal
  useEffect(() => {
    let raf = null
    const check = () => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top < window.innerHeight - 20 && bottom > 0) {
          const delay = Number(el.dataset.delay || 0) * 130
          setTimeout(() => el.classList.add('is-visible'), delay)
        }
      })
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = null; check() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Initial check after a tick (let React paint first)
    const t = setTimeout(check, 60)
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [slug])

  if (slug === 'nosso-time') return <NossoTimePage lang={lang} setLang={setLang} />
  if (slug === 'blog')       return <BlogPage      lang={lang} setLang={setLang} />
  if (slug)                  return <ServicePage   slug={slug} lang={lang} setLang={setLang} />

  return (
    <>
      <Hero        lang={lang} setLang={setLang} />
      <OQueFazemos lang={lang} />
      <QuemSomos   lang={lang} />
      <Servicos    lang={lang} />
      <Contato     lang={lang} />
      <Escritorios lang={lang} />
      <Avaliacoes  lang={lang} />
      <Footer      lang={lang} />
    </>
  )
}
