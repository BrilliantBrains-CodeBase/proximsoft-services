import { useState, useEffect, useCallback } from 'react'
import { siteConfig } from '@/lib/content'

const AUTOPLAY_MS = 5000

export default function Testimonials() {
  const { subTitle, headline, description, items, quoteIcon } = siteConfig.testimonials
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [perView, setPerView] = useState(2)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setPerView(mq.matches ? 2 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const totalDots = Math.ceil(items.length / perView)
  const next = useCallback(() => setActive((p) => (p + 1) % totalDots), [totalDots])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next, paused])

  // Slice items for the active page
  const visible = items.slice(active * perView, active * perView + perView)

  return (
    <section
      id="testimonials"
      className="rs-testi-9"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-(--section-padding-y)">

        {/* Two-col header */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-14">
          <div className="md:w-5/12">
            <span className="sub-title-label">{subTitle}</span>
            <h2 className="section-title">{headline}</h2>
          </div>
          {description && (
            <p className="md:w-7/12 text-[var(--color-text-secondary)] leading-relaxed text-lg">
              {description}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {visible.map((item, i) => (
            <div key={`${item.name}-${active}-${i}`} className="testi-wrap">
              {/* Floating quote icon — absolutely positioned at top center */}
              <div className="icon-part">
                {quoteIcon
                  ? <img src={quoteIcon} alt="" aria-hidden="true" />
                  : <QuoteIconSvg />
                }
              </div>

              {/* White card box */}
              <div className="wraping">
                <p className="desc">{item.text}</p>
                <div className="posted-by">
                  <div className="avatar">
                    {item.avatar
                      ? <img src={item.avatar} alt={item.name} loading="lazy" />
                      : <InitialAvatar name={item.name} />
                    }
                  </div>
                  <div className="info">
                    <h4 className="name">{item.name}</h4>
                    {item.role && <span className="designation">{item.role}</span>}
                    <ul className="ratings" aria-label="Rating">
                      <li aria-hidden="true">★</li>
                      <li aria-hidden="true">★</li>
                      <li aria-hidden="true">★</li>
                      <li aria-hidden="true">★</li>
                      <li aria-hidden="true" style={{ opacity: 0.35 }}>★</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pill dots navigation */}
        <div className="testi-dots" role="tablist" aria-label="Testimonial navigation">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial set ${i + 1}`}
              onClick={() => setActive(i)}
              className={`testi-pill-dot${i === active ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function QuoteIconSvg() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 40V24.444C0 10.37 7.111 2.074 21.333 0l2.223 3.556C16.741 5.037 13.037 9.037 12.444 16H22.222V40H0zm29.778 0V24.444C29.778 10.37 36.889 2.074 51.111 0l2.223 3.556C46.519 5.037 42.815 9.037 42.222 16H52V40H29.778z" fill="#F5A623"/>
    </svg>
  )
}

function InitialAvatar({ name }: { name: string }) {
  return (
    <div style={{
      width: 65, height: 65, borderRadius: 5,
      background: 'var(--color-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: '1.5rem'
    }}>
      {name.charAt(0)}
    </div>
  )
}
