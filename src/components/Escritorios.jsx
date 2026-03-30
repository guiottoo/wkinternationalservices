import { T } from '../i18n'

const OFFICES = [
  {
    city:     'São Paulo',
    state:    'SP',
    building: 'Avenida Paulista',
    address:  'Av. Paulista, 1471, Sala 317',
    cep:      'CEP: 01311-927 — Bela Vista, São Paulo — SP',
    tel:      '+55 (48) 99640-0540',
    telHref:  '+5548996400540',
    mapSrc:   'https://maps.google.com/maps?q=Av.+Paulista+1471+São+Paulo+SP+Brazil&output=embed&hl=pt',
  },
  {
    city:     'Florianópolis',
    state:    'SC',
    building: 'Edifício The Office Avenida',
    address:  'Av. Prof. Othon Gama D\'eça, 677, Sala 501',
    cep:      'CEP: 88015-240 — Centro, Florianópolis — SC',
    tel:      '+55 (48) 99640-0540',
    telHref:  '+5548996400540',
    mapSrc:   'https://maps.google.com/maps?q=Av.+Prof.+Othon+Gama+Deca+677+Florianopolis+SC+Brazil&output=embed&hl=pt',
  },
]

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M7.5 1C4.99 1 3 3 3 5.5c0 3.6 4.5 8.5 4.5 8.5S12 9.1 12 5.5C12 3 10.01 1 7.5 1zm0 6.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z"
        fill="currentColor" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M12.5 9.75l-2.5-.5a.75.75 0 0 0-.72.22l-1.2 1.2A9.19 9.19 0 0 1 3.83 6.42l1.2-1.2a.75.75 0 0 0 .22-.72l-.5-2.5A.75.75 0 0 0 4 1.5H2A.75.75 0 0 0 1.25 2.25C1.25 8.5 6.5 13.25 12.5 13.25a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 0-.75-.75z"
        fill="currentColor" />
    </svg>
  )
}

export default function Escritorios({ lang }) {
  const t = T[lang]

  return (
    <section className="section-offices">
      <div className="offices-container">
        <h2 className="offices-title" data-reveal>{t.officesTitle}</h2>

        <div className="offices-grid">
          {OFFICES.map((o, i) => (
            <div key={i} className="office-card" data-reveal data-delay={i}>
              <div className="office-card__info">
                <span className="office-card__state">{o.state}</span>
                <h3 className="office-card__city">{o.city}</h3>
                <p className="office-card__building">{o.building}</p>

                <div className="office-card__detail">
                  <PinIcon />
                  <span>
                    {o.address}
                    <br />
                    <span className="office-card__cep">{o.cep}</span>
                  </span>
                </div>

                <div className="office-card__detail">
                  <PhoneIcon />
                  <a href={`tel:${o.telHref}`} className="office-card__tel">
                    {o.tel}
                  </a>
                </div>
              </div>

              <div className="office-card__map">
                <iframe
                  title={o.city}
                  src={o.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
