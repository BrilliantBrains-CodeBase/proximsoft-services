import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

export default function Blog() {
  const { subTitle, headline, description, items } = siteConfig.blog

  return (
    <section id="blog" className="py-[var(--section-padding-y)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">

        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-12">
            <div className="md:w-5/12">
              <span className="sub-title-label">{subTitle}</span>
              <h2 className="section-title">{headline}</h2>
            </div>
            {description && (
              <p className="md:w-7/12 text-[var(--color-text-secondary)] leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.12}>
              <div className="blog-wrap">
                {/* Image with centered date badge at bottom */}
                <div className="img-part">
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <div className="blog-meta">
                    <ClockIcon /> {item.date}
                  </div>
                </div>

                {/* Content — ::before/::after domes live here */}
                <div className="content-part">
                  <h4 className="title">
                    <a href={item.href ?? '#'}>{item.title}</a>
                  </h4>
                  <p className="desc">{item.description}</p>
                  {/* + button — hidden below fold, rises on hover */}
                  <div className="btn-part">
                    <a href={item.href ?? '#'} aria-label={`Read more about ${item.title}`}>+</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"
      style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }}>
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  )
}
