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
            {items.slice(0, 6).map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.12}>
                <div className="service-wrap">
                  {/* Image + icon overlapping bottom edge */}
                  <div className="img-part">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="svc-icon-part" aria-hidden="true">
                      <ServiceIcon iconKey={item.icon} />
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

          {items.length > 6 && (
            <AnimatedSection delay={0.3}>
              <div className="text-center mt-12">
                <Link to="/services" className="readon">
                  View All Services
                </Link>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  )
}

function ServiceIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case 'sap':    return <SapIcon />
    case 'oracle': return <OracleIcon />
    case 'salesforce': return <SalesforceIcon />
    case 'data':   return <DataIcon />
    case 'ai':     return <AiIcon />
    case 'appdev': return <AppDevIcon />
    case 'web':    return <WebIcon />
    default:       return <SapIcon />
  }
}

function SapIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M3 5h18v14H3z" fillOpacity=".15" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <text x="5" y="16" fontSize="8" fontWeight="700" fill="currentColor" fontFamily="sans-serif">SAP</text>
    </svg>
  )
}

function OracleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <ellipse cx="12" cy="12" rx="9" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  )
}

function SalesforceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M10 4a4 4 0 014 4 5 5 0 015 5 3.5 3.5 0 010 7H6a4 4 0 01-.5-7.97A4 4 0 0110 4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function DataIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <rect x="3" y="15" width="4" height="6" rx="1"/>
      <rect x="10" y="10" width="4" height="11" rx="1"/>
      <rect x="17" y="5" width="4" height="16" rx="1"/>
    </svg>
  )
}

function AiIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12"/>
    </svg>
  )
}

function AppDevIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
      <line x1="14" y1="4" x2="10" y2="20"/>
    </svg>
  )
}

function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}
