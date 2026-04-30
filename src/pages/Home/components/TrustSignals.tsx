import { useEffect, useRef, useState } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

/** Counts up from 0 to target once in view */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current = Math.min(current + increment, target)
            setCount(Math.round(current))
            if (current >= target) clearInterval(timer)
          }, 1800 / steps)
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function TrustSignals() {
  const a = siteConfig.trust
  const d = siteConfig.aboutDark

  return (
    <section id="about">
      {/* ── About style5: text+counters left, about11.png right ── */}
      <div id="rs-about" className="bg-white overflow-visible">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-[var(--section-padding-y)]">
          <div className="rs-about-5 grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: sub-title + heading + description + counters */}
            <AnimatedSection className="pt-8">
              <span className="sub-title-label">{a.subTitle}</span>
              <h2 className="section-title mb-4">{a.headline}</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">{a.description}</p>

              <div className="counter-wrap">
                {a.stats.map((stat, i) => (
                  <div key={stat.label} className="content-part">
                    <div className="counter-part">
                      <div className="rs-count thousand">
                        <Counter target={stat.value} />
                      </div>
                      <div className="counter-title">{stat.label}</div>
                    </div>
                    <div className="desc-text">{a.statDescriptions[i]}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right: about11.png with morphin blob — pulled up so blob overlaps counter area */}
            <AnimatedSection delay={0.15} className="about-img-col" style={{ marginTop: '-90px' }}>
              <div className="relative flex justify-center md:justify-end">
                {/* accent morphin blob behind the image */}
                <div
                  className="morphin-blob"
                  style={{ width: 420, height: 420, right: 30, bottom: 20 }}
                  aria-hidden="true"
                />
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  className="relative z-10 w-full max-w-130 object-contain"
                  loading="lazy"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* ── About style6: dark bg, about11-2.png left, text+video right ── */}
      <div className="rs-about-6 py-(--section-padding-y)">
        <div className="inner mx-auto max-w-max-width px-6">
          <div className="grid gap-12 lg:gap-16 items-center">

            {/* Text + video */}
            <AnimatedSection>
              <span className="sub-title-label">{d.subTitle}</span>
              <h2 className={`section-title waving-line white mb-6`} style={{ color: '#ffffff' }}>
                {d.headline}
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">{d.description}</p>

              <div className="flex items-center gap-5">
                <a
                  href={d.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-play-btn"
                  aria-label="Watch company video"
                >
                  ▶
                </a>
                <div>
                  <p
                    className="text-white font-semibold leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem' }}
                  >
                    Take a Tour<br />About Our Company
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
