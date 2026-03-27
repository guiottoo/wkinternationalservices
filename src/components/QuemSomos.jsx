import { T } from '../i18n'

export default function QuemSomos({ lang }) {
  const t = T[lang]

  return (
    <section id="quem-somos" className="section-earth section-quem">
      <div className="section2-container">
        <div className="section2-body">
          <div className="section2-left" data-reveal data-delay="1">
            <h2 className="section2-title">{t.s3Title}</h2>
            <p className="section2-sub">{t.s3Sub}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
