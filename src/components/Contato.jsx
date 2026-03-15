import { useState } from 'react'
import { T } from '../i18n'
import imigrantesImg from '../assets/imigrantes.png'

export default function Contato({ lang }) {
  const t = T[lang]
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/wkinternationalservicesbr@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[WK Site] Mensagem de ${form.name}`,
          nome: form.name,
          email: form.email,
          telefone: form.phone,
          mensagem: form.message,
        }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contato" className="section-contact">

      {/* ── Top: headline left + image right ── */}
      <div className="contact-top">
        <div className="contact-left" data-reveal>
          <span className="contact-badge">{t.contactBadge}</span>
          <h2 className="contact-headline">{t.contactHeadline}</h2>
          <p className="contact-sub">{t.contactSub}</p>
          <p className="contact-free">{t.contactFree}</p>
          <p className="contact-langs">{t.contactLangs}</p>
        </div>

        <div className="contact-top-right" data-reveal data-delay="1">
          <img src={imigrantesImg} alt="" className="contact-img" />
        </div>
      </div>

      {/* ── Form card ── */}
      <div className="contact-form-card" data-reveal data-delay="2">
        <div className="contact-form-inner">
          {status === 'sent' ? (
            <div className="contact-form-success">
              <span className="contact-form-success__icon">✓</span>
              <p>{t.contactFormSuccess}</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="contact-form-grid">

                {/* Name */}
                <div className="contact-form__row">
                  <label className="contact-form__label">{t.contactFormName}</label>
                  <input
                    className="contact-form__input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Email */}
                <div className="contact-form__row">
                  <label className="contact-form__label">{t.contactFormEmail}</label>
                  <input
                    className="contact-form__input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                {/* Phone – full width */}
                <div className="contact-form__row contact-form-grid__full">
                  <label className="contact-form__label">{t.contactFormPhone}</label>
                  <input
                    className="contact-form__input"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                {/* Message – full width */}
                <div className="contact-form__row contact-form-grid__full">
                  <label className="contact-form__label">{t.contactFormMsg}</label>
                  <textarea
                    className="contact-form__input contact-form__textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                  />
                </div>

              </div>

              {status === 'error' && (
                <p className="contact-form__error">{t.contactFormError}</p>
              )}

              <button
                className="contact-form__submit"
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? '...' : t.contactFormSend}
              </button>

            </form>
          )}
        </div>
      </div>

    </section>
  )
}
