import { useEffect, useRef, useState } from 'react'
import br04Img from '../assets/br-04.png'
import { T } from '../i18n'

/* ── Count-up hook ──────────────────────────────────────────────── *
 * Animates from 0 → target only once when triggered.               *
 * Returns the current display value.                               */
function useCountUp(target, triggered, duration = 1600) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!triggered) return
    let raf
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [triggered, target, duration])

  return count
}

/* ── Parses "+500" → { prefix: "+", num: 500 } ─────────────────── */
function parseStat(val) {
  const prefix = val.startsWith('+') ? '+' : ''
  const num    = parseInt(val.replace('+', ''), 10)
  return { prefix, num }
}

/* ── Single animated stat card ──────────────────────────────────── */
function StatCard({ rawVal, label, triggered, delay = 0 }) {
  const { prefix, num } = parseStat(rawVal)
  const count = useCountUp(num, triggered)

  return (
    <div className="stat-card" data-reveal data-delay={delay}>
      <span className="stat-value">{prefix}{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

/* ── O que Fazemos ──────────────────────────────────────────────── */
export default function OQueFazemos({ lang }) {
  const t          = T[lang]
  const statsRef   = useRef(null)
  const [triggered, setTriggered] = useState(false)

  // Fire count-up once when the stats row enters the viewport
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="quem-somos" className="section-earth">
      <div className="section2-container">

        {/* Stats row — animated counters */}
        <div className="stats-row" ref={statsRef}>
          <StatCard rawVal={t.stat1Val} label={t.stat1Label} triggered={triggered} delay={0} />
          <StatCard rawVal={t.stat2Val} label={t.stat2Label} triggered={triggered} delay={1} />
          <StatCard rawVal={t.stat3Val} label={t.stat3Label} triggered={triggered} delay={2} />
        </div>

        {/* Quem Somos: text (left) / Photo (right) */}
        <div className="section2-body">
          <div className="section2-left" data-reveal data-delay="0">
            <h2 className="section2-title">{t.s3Title}</h2>
            {t.s3Sub.split('\n').map((p, i) => (
              <p key={i} className="section2-sub">{p}</p>
            ))}
          </div>
          <div className="section2-right" data-reveal data-delay="1">
            <img src={br04Img} alt="" className="section2-photo" />
          </div>
        </div>

      </div>
    </section>
  )
}
