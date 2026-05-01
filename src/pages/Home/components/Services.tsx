import { Link } from 'react-router-dom'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

export default function Services() {
  const { subTitle, headline, description, items } = siteConfig.services

  return (
    <section id="services" className="service-section-bg">
      <div className="inner py-[var(--section-padding-y)]">
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
                <div className="service-wrap">
                  {/* Image + icon overlapping bottom edge */}
                  <div className="img-part">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="svc-icon-part" aria-hidden="true">
                      {item.icon === 'fa-diamond'    && <DiamondIcon />}
                      {item.icon === 'fa-sitemap'    && <SitemapIcon />}
                      {item.icon === 'fa-line-chart' && <ChartIcon />}
                    </div>
                  </div>

                  {/* Content — ::before/::after domes live here */}
                  <div className="content-part">
                    <h4 className="title">
                      <Link to={item.href ?? '/services'}>{item.title}</Link>
                    </h4>
                    <p className="desc">{item.description}</p>
                    {/* + button — hidden below fold, rises on hover */}
                    <div className="btn-part">
                      <Link to={item.href ?? '/services'} aria-label={`Learn more about ${item.title}`}>+</Link>
                    </div>
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

function DiamondIcon() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
      <polygon points="16,2 30,12 16,30 2,12" />
    </svg>
  )
}
function SitemapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <rect x="9" y="1" width="6" height="4" rx="1"/>
      <rect x="1" y="9" width="6" height="4" rx="1"/>
      <rect x="17" y="9" width="6" height="4" rx="1"/>
      <rect x="9" y="19" width="6" height="4" rx="1"/>
      <line x1="12" y1="5" x2="12" y2="9" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="4" y1="13" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="20" y1="13" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="12" y1="16" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="4" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 18 8 12 13 15 21 6"/>
    </svg>
  )
}
