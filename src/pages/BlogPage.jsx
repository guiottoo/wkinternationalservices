import Navbar from '../components/Navbar'
import Footer  from '../components/Footer'
import { T }   from '../i18n'

export default function BlogPage({ lang, setLang }) {
  const t = T[lang]

  return (
    <div className="blog-page">

      <Navbar lang={lang} setLang={setLang} logoDark />

      {/* ── Page title ── */}
      <div className="blog-page__header">
        <h1 className="blog-page__title">{t.blog}</h1>
      </div>

      {/* ── Posts ── */}
      <main className="blog-page__main">

        {/* Card — CONNECT CAST */}
        <a
          href="https://www.youtube.com/watch?v=RHU-jh2tJZw"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-card"
        >
          {/* Thumbnail */}
          <div className="blog-card__thumb">
            <img
              src="https://img.youtube.com/vi/RHU-jh2tJZw/maxresdefault.jpg"
              alt="CONNECT CAST"
              className="blog-card__thumb-img"
            />
            <div className="blog-card__play">
              <div className="blog-card__play-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M6 4l12 6-12 6V4z" fill="#0d0d0d"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="blog-card__body">
            <span className="blog-card__tag">{t.blogConnectTag}</span>
            <h2 className="blog-card__title">{t.blogConnectTitle}</h2>
            <p className="blog-card__desc">{t.blogConnectDesc}</p>
            <div className="blog-card__author">
              <div className="blog-card__avatar">WK</div>
              <span className="blog-card__author-name">Wilian Knoner Campos</span>
            </div>
          </div>
        </a>

      </main>

      <Footer lang={lang} />
    </div>
  )
}
