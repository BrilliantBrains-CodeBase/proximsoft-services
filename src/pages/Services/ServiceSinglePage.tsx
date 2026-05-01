import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'
import servicesData from '@/data/services.json'

export default function ServiceSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { services } = servicesData

  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return (
      <>
        <Helmet><title>Service Not Found — {siteConfig.name}</title></Helmet>
        <div className="services-breadcrumb">
          <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
            <h1 className="services-breadcrumb-title">Service Not Found</h1>
          </div>
        </div>
        <div className="py-[var(--section-padding-y)] text-center">
          <p className="text-[var(--color-text-secondary)] mb-6">
            The service page you're looking for doesn't exist or may have been moved.
          </p>
          <Link className="readon" to="/services">Back to Services</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{service.bannerTitle} — {siteConfig.name}</title>
        <meta name="description" content={service.shortDescription} />
      </Helmet>

      {/* Breadcrumb banner */}
      <div className="services-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="services-breadcrumb-title">{service.bannerTitle}</h1>
          <nav className="services-breadcrumb-nav" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true"> / </span>
            <span>{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="service-single-layout">


            {/* Left column — main content */}
            <div className="service-single-main">
              <AnimatedSection>

                <h2 className="service-single-headline">{service.headline}</h2>

                <p className="service-single-body">{service.bodyParagraph1}</p>

                {/* Bullet list */}
                <ul className="service-bullet-list">
                  {service.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>

                {/* Progress circles */}
                <div className="progress-circles">
                  {service.progressCircles.map((circle, i) => (
                    <div key={i} className="progress-circle">
                      <div className="progress-circle-ring">
                        <span className="progress-circle-value">{circle.value}</span>
                      </div>
                      <div className="progress-circle-label">{circle.label}</div>
                    </div>
                  ))}
                </div>

                <p className="service-single-body">{service.bodyParagraph2}</p>

                {/* Testimonial */}
                <div className="service-testimonial">
                  <QuoteIcon />
                  <p className="service-testimonial-quote">{service.testimonial.quote}</p>
                  <div className="service-testimonial-author">
                    <div className="service-testimonial-avatar">
                      {service.testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="service-testimonial-name">{service.testimonial.name}</div>
                      <div className="service-testimonial-title">{service.testimonial.title}</div>
                    </div>
                  </div>
                </div>

              </AnimatedSection>
            </div>

            {/* Right column — sidebar */}
            <aside className="service-single-sidebar">

              {/* Service navigation list */}
              <ul className="service-nav-list">
                {services.map((s) => (
                  <li key={s.slug} className={s.slug === slug ? 'active' : ''}>
                    <Link to={`/services/${s.slug}`}>{s.title}</Link>
                  </li>
                ))}
              </ul>

              {/* CTA phone box */}
              <div className="service-cta-box">
                <div className="service-cta-icon">
                  <PhoneIcon />
                </div>
                <h3 className="service-cta-heading">Have a Project in Mind?</h3>
                <p className="service-cta-sub">Talk to a Senior Consultant Today.</p>
                <a href={`tel:${siteConfig.contact.phone}`} className="service-cta-phone">
                  {siteConfig.contact.phone}
                </a>
              </div>

              {/* Brochures box */}
              <div className="service-brochures-box">
                <h3 className="service-brochures-title">Brochures</h3>
                <p className="service-brochures-desc">
                  Download our service brochure for a clear, jargon-free overview — what we deliver, how we work, typical timelines, and the projects we've shipped.
                </p>
                <div className="service-brochures-btns">
                  <a href="/contact" className="service-brochure-btn service-brochure-btn--left">
                    Download
                  </a>
                  <a href="/services" className="service-brochure-btn service-brochure-btn--right">
                    Discover
                  </a>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>

      {/* Capabilities section */}
      {'capabilities' in service && Array.isArray(service.capabilities) && service.capabilities.length > 0 && (
        <div className="capabilities-section">
          <div className="capabilities-section-inner">
            <AnimatedSection>
              <div className="capabilities-header">
                <p className="capabilities-label">Service Extent</p>
                <h2 className="capabilities-title">Our Capabilities</h2>
                <p className="capabilities-subtitle">
                  Eight delivery stages — from first strategy call to long-term operations — covering everything your {service.title.toLowerCase()} program needs.
                </p>
              </div>
              <div className="capabilities-grid">
                {(service.capabilities as { stage: string; description: string }[]).map((cap, i) => (
                  <div key={i} className="capability-card">
                    <span className="capability-card-number" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="capability-card-icon" aria-hidden="true">
                      <CapabilityIcon stage={cap.stage} />
                    </div>
                    <h3 className="capability-card-stage">{cap.stage}</h3>
                    <p className="capability-card-desc">{cap.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      )}
    </>
  )
}

function CapabilityIcon({ stage }: { stage: string }) {
  const icons: Record<string, JSX.Element> = {
    Advisory: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
      </svg>
    ),
    Implementation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    Migration: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14m-7-7 7 7-7 7" />
      </svg>
    ),
    Conversion: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    Upgrade: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 11 12 6 7 11" /><line x1="12" y1="18" x2="12" y2="6" />
      </svg>
    ),
    Integration: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    Support: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.07 3h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.09 10.9a16 16 0 0 0 6.01 6.01l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 17z" />
      </svg>
    ),
    'Roll-Out': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  }
  return icons[stage] ?? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  )
}

function QuoteIcon() {
  return (
    <svg viewBox="0 0 40 28" width="40" height="28" fill="var(--color-primary)" aria-hidden="true" className="service-testimonial-quote-icon">
      <path d="M0 28V17.5C0 12.833 1.167 9 3.5 6C5.833 3 9.167 1 13.5 0L15 2.5C12.333 3.333 10.333 4.667 9 6.5C7.667 8.333 7 10.5 7 13H14V28H0ZM22 28V17.5C22 12.833 23.167 9 25.5 6C27.833 3 31.167 1 35.5 0L37 2.5C34.333 3.333 32.333 4.667 31 6.5C29.667 8.333 29 10.5 29 13H36V28H22Z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006.01 6.01l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 17z" />
    </svg>
  )
}
