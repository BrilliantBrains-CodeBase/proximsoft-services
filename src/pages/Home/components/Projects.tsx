import { useState, useEffect, useCallback } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

const AUTOPLAY_MS = 5000

export default function Projects() {
  const { subTitle, headline, description, items } = siteConfig.projects
  const perView = 3
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = items.length

  const next = useCallback(() => setActive((p) => (p + 1) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [next, paused])

  // visible items (with wrap-around)
  const visible = Array.from({ length: perView }, (_, i) => items[(active + i) % total])

  return (
    <section className="project-section-bg">
      {/* Top part with header — large bottom padding so cards overlap */}
      <div className="top-part py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8">
              <div className="md:w-5/12">
                <span className="sub-title-label">{subTitle}</span>
                <h2 className="section-title">{headline}</h2>
              </div>
              {description && (
                <p className="md:w-7/12 text-text-secondary leading-relaxed">{description}</p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Wrappin — negative margin pulls cards up over top-part */}
      <div
        className="wrappin"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {visible.map((item, i) => (
              <AnimatedSection key={`${item.title}-${active}-${i}`} delay={i * 0.1}>
                <div className="project-wrap">
                  <div className="img-part">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                  <div className="project-content-part">
                    <h4 className="title">
                      <a href={item.href ?? '#'}>{item.title}</a>
                    </h4>
                    <span className="category">
                      <a href={item.href ?? '#'}>{item.category}</a>
                    </span>
                  </div>
                  <div className="project-btn-part">
                    <a href={item.href ?? '#'} aria-label={`View ${item.title}`}>›</a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
