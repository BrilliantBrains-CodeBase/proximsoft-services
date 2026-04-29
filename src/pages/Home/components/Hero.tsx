import { useState, useEffect, useCallback } from 'react'
import { siteConfig } from '@/lib/content'

const AUTOPLAY_MS = 5000

export default function Hero() {
  const { slides } = siteConfig.hero
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next, paused])

  const slide = slides[active]
  const isDark = slide.variant === 'dark'
  const isLightLeft = slide.variant === 'light-left'

  return (
    <section
      id="rs-slider"
      className="rs-slider-11"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero slider"
    >
      {/* ── Active slide ── */}
      <div
        className={`slide-inner ${isDark ? 'slide2' : 'slide1'}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        {isDark && <div className="slide2-overlay" aria-hidden="true" />}

        <div className="slide-container mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12">
            {isDark ? (
              <div className="slide-text-wrap md:col-span-8">
                <h1 className="sl-title text-white">{slide.title}</h1>
                <p className="sl-desc text-white/90">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            ) : isLightLeft ? (
              <div className="slide-text-wrap md:col-span-6">
                <h1 className="sl-title text-(--color-text-primary)">{slide.title}</h1>
                <p className="sl-desc text-text-secondary">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            ) : (
              <div className="slide-text-wrap md:col-start-6 md:col-span-7">
                <h1 className="sl-title text-(--color-text-primary)">{slide.title}</h1>
                <p className="sl-desc text-text-secondary">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Prev / Next arrows ── */}
      <button onClick={prev} className="slider-arrow slider-arrow-prev" aria-label="Previous slide">‹</button>
      <button onClick={next} className="slider-arrow slider-arrow-next" aria-label="Next slide">›</button>

      {/* ── Dots ── */}
      <div className="slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`slider-dot-btn${i === active ? ' active' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
