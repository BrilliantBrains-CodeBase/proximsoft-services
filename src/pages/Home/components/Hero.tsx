import { useState, useEffect, useCallback, useRef } from 'react'
import { siteConfig } from '@/lib/content'

const AUTOPLAY_MS = 5000
const TRANSITION_MS = 620

interface SliderState {
  active: number
  leaving: number | null
  dir: 'next' | 'prev'
}

export default function Hero() {
  const { slides } = siteConfig.hero
  const [state, setState] = useState<SliderState>({ active: 0, leaving: null, dir: 'next' })
  const [paused, setPaused] = useState(false)
  const busy = useRef(false)

  const goTo = useCallback((fn: (c: number) => number, direction: 'next' | 'prev') => {
    if (busy.current) return
    busy.current = true
    setState(prev => ({ active: fn(prev.active), leaving: prev.active, dir: direction }))
    setTimeout(() => {
      setState(prev => ({ ...prev, leaving: null }))
      busy.current = false
    }, TRANSITION_MS)
  }, [])

  const next = useCallback(() => goTo(c => (c + 1) % slides.length, 'next'), [goTo, slides.length])
  const prev = useCallback(() => goTo(c => (c - 1 + slides.length) % slides.length, 'prev'), [goTo, slides.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next, paused])

  const { active, leaving, dir } = state

  function renderSlide(index: number, role: 'active' | 'leaving') {
    const slide = slides[index]
    const isDark = slide.variant === 'dark'
    const isLightLeft = slide.variant === 'light-left'
    const isCentered = slide.variant === 'centered'

    const enterCls = dir === 'next' ? 'slide-enter-right' : 'slide-enter-left'
    const leaveCls = dir === 'next' ? 'slide-leave-left' : 'slide-leave-right'
    const animCls = role === 'active' ? (leaving !== null ? enterCls : '') : leaveCls

    const slideClass = slide.id  // 'slide1' or 'slide2' — drives CSS image-part positioning

    return (
      <div
        key={index}
        className={`slide-inner ${slideClass} ${animCls}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        {/* Person cutout — absolutely positioned, bottom-anchored */}
        {slide.cutout && (
          <div className="image-part" aria-hidden="true">
            <img src={slide.cutout} alt="" />
          </div>
        )}

        {/* Spinning shape behind the cutout */}
        {slide.shape && (
          <div className="sl-shape" aria-hidden="true">
            <img src={slide.shape} alt="" />
          </div>
        )}

        <div className="slide-container mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12">
            {isDark ? (
              <div className="slide-text-wrap md:col-span-8">
                <span className="sl-eyebrow">{slide.eyebrow}</span>
                <h1 className="sl-title text-white">{slide.title}</h1>
                <p className="sl-desc text-white/90">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            ) : isLightLeft ? (
              <div className="slide-text-wrap md:col-span-6">
                <span className="sl-eyebrow">{slide.eyebrow}</span>
                <h1 className="sl-title text-(--color-text-primary)">{slide.title}</h1>
                <p className="sl-desc">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            ) : isCentered ? (
              <div className="slide-text-wrap slide-text-centered md:col-span-10 md:col-start-2">
                <span className="sl-eyebrow">{slide.eyebrow}</span>
                <h1 className="sl-title text-(--color-text-primary)">{slide.title}</h1>
                <p className="sl-desc">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            ) : (
              /* slide1: text on the right, cutout on the left */
              <div className="slide-text-wrap md:col-start-6 md:col-span-7">
                <span className="sl-eyebrow">{slide.eyebrow}</span>
                <h1 className="sl-title text-(--color-text-primary)">{slide.title}</h1>
                <p className="sl-desc">{slide.description}</p>
                <a href={slide.cta.href} className="readon">{slide.cta.text}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      id="rs-slider"
      className="rs-slider-11"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero slider"
    >
      {leaving !== null && renderSlide(leaving, 'leaving')}
      {renderSlide(active, 'active')}

      <button onClick={prev} className="slider-arrow slider-arrow-prev" aria-label="Previous slide">‹</button>
      <button onClick={next} className="slider-arrow slider-arrow-next" aria-label="Next slide">›</button>

      <div className="slider-dots" role="tablist" aria-label="Slide navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(() => i, i > active ? 'next' : 'prev')}
            className={`slider-dot-btn${i === active ? ' active' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
