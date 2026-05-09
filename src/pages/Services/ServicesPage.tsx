import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatedSection } from '@/components/AnimatedSection'
import { PhoneInput } from '@/components/PhoneInput'
import { siteConfig } from '@/lib/content'
import servicesData from '@/data/services.json'

interface QuoteForm {
  name: string
  email: string
  phone: string
  website: string
  message: string
}

export default function ServicesPage() {
  const { services } = servicesData

  const [form, setForm] = useState<QuoteForm>({ name: '', email: '', phone: '', website: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    if (!endpoint) { setStatus('error'); return }
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...form,
          subject: 'Free Quote Request — Services Page',
          source: siteConfig.name,
          timestamp: new Date().toISOString(),
        }),
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', website: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Services — {siteConfig.name}</title>
        <meta
          name="description"
          content="SAP, Oracle, Salesforce, Data Science, AI, Application Development, and Web & Mobile — enterprise IT services delivered by senior consultants with a track record of on-time, on-budget delivery."
        />
      </Helmet>

      {/* Breadcrumb banner */}
      <div className="services-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="services-breadcrumb-title">Services</h1>
          <nav className="services-breadcrumb-nav" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Services</span>
          </nav>
        </div>
      </div>

      {/* ── Services grid ── */}
      <div className="py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="services-grid">
            {services.map((service, i) => (
              <AnimatedSection key={service.slug} delay={i * 0.07}>
                <Link to={`/services/${service.slug}`} className="service-card">
                  <div className="service-card-icon">
                    <ServiceIcon iconKey={service.iconKey} />
                  </div>
                  <div className="service-card-content">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.shortDescription}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA band ── */}
      <div className="services-cta-band">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <span className="services-cta-sub-label">Any plan to start a project</span>
          <h2 className="services-cta-heading">
            Our Experts always ready to work<br /> with you.
          </h2>
          <Link className="readon services-cta-btn" to="/contact">Get Started</Link>
        </div>
      </div>

      {/* ── Free Quote section — padded white section wrapping the split card ── */}
      <div className="svc-quote-section">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="svc-quote-wrap">

            {/* Left: photo panel */}
            <div className="svc-quote-img-panel" aria-hidden="true">
              <img src="/images/cta/left-img.jpg" alt="" className="svc-quote-img" />
            </div>

            {/* Right: form panel */}
            <div className="svc-quote-form-panel">
              <AnimatedSection>
                <span className="svc-quote-sub">Let's Talk</span>
                <h2 className="svc-quote-heading">Request a Free Quote</h2>

                {status === 'success' ? (
                  <div className="svc-quote-success">
                    <div className="svc-quote-success-icon">✓</div>
                    <h3>Request received!</h3>
                    <p>We'll get back to you within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="svc-quote-fields">
                      <div className="svc-quote-field">
                        <input
                          name="name" type="text" required
                          placeholder="Name"
                          value={form.name} onChange={handleChange}
                        />
                      </div>
                      <div className="svc-quote-field">
                        <input
                          name="email" type="email" required
                          placeholder="E-mail"
                          value={form.email} onChange={handleChange}
                        />
                      </div>
                      <div className="svc-quote-field">
                        <PhoneInput
                          name="phone"
                          value={form.phone}
                          onChange={(v) => setForm(p => ({ ...p, phone: v }))}
                          required
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="svc-quote-field">
                        <input
                          name="website" type="text"
                          placeholder="Your Website"
                          value={form.website} onChange={handleChange}
                        />
                      </div>
                      <div className="svc-quote-field svc-quote-field--full">
                        <textarea
                          name="message"
                          placeholder="Your Message Here"
                          rows={5}
                          value={form.message} onChange={handleChange}
                        />
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="svc-quote-error">
                        Something went wrong. Please call{' '}
                        <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>.
                      </p>
                    )}

                    <button type="submit" className="readon svc-quote-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Submit Now'}
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

/* ── Service icons — distinct outline SVG per service type ─────────────────── */
function ServiceIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case 'sap':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="14" width="48" height="36" rx="4" />
          <path d="M8 22h48" />
          <path d="M20 32h10M20 40h8" />
          <path d="M40 28l6 8-6 8" />
          <circle cx="14" cy="18" r="2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="18" r="2" fill="currentColor" stroke="none" />
          <circle cx="26" cy="18" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'oracle':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="32" cy="22" rx="20" ry="8" />
          <path d="M12 22v10c0 4.418 8.954 8 20 8s20-3.582 20-8V22" />
          <path d="M12 32v10c0 4.418 8.954 8 20 8s20-3.582 20-8V32" />
        </svg>
      )
    case 'salesforce':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M32 10c-5.5 0-10 3.5-12 8.5A11 11 0 009 30c0 6.075 4.925 11 11 11h24a10 10 0 000-20 10 10 0 00-12-11z" />
          <path d="M24 42l4 6 4-6 4 6 4-6" />
        </svg>
      )
    case 'data':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="10,48 24,30 34,38 48,18" />
          <circle cx="10" cy="48" r="3" fill="currentColor" stroke="none" />
          <circle cx="24" cy="30" r="3" fill="currentColor" stroke="none" />
          <circle cx="34" cy="38" r="3" fill="currentColor" stroke="none" />
          <circle cx="48" cy="18" r="3" fill="currentColor" stroke="none" />
          <path d="M10 54h44" />
        </svg>
      )
    case 'ai':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="18" y="12" width="28" height="28" rx="5" />
          <path d="M24 20h16M24 27h16M24 34h10" />
          <path d="M26 40v6M32 40v6M38 40v6" />
          <path d="M22 46h20" />
          <circle cx="12" cy="26" r="4" />
          <path d="M16 26h2" />
          <circle cx="52" cy="26" r="4" />
          <path d="M46 26h2" />
        </svg>
      )
    case 'appdev':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="10" width="48" height="38" rx="4" />
          <path d="M8 20h48" />
          <path d="M22 30l-6 5 6 5" />
          <path d="M42 30l6 5-6 5" />
          <path d="M29 28l-4 14" />
          <circle cx="14" cy="15" r="2" fill="currentColor" stroke="none" />
          <circle cx="20" cy="15" r="2" fill="currentColor" stroke="none" />
          <circle cx="26" cy="15" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'web':
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="32" cy="32" r="22" />
          <path d="M32 10c-5.5 5.5-8 13-8 22s2.5 16.5 8 22" />
          <path d="M32 10c5.5 5.5 8 13 8 22s-2.5 16.5-8 22" />
          <path d="M10 32h44" />
          <path d="M13 20h38M13 44h38" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 64 64" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <rect x="10" y="10" width="44" height="44" rx="6" />
          <path d="M22 32h20M32 22v20" strokeLinecap="round" />
        </svg>
      )
  }
}
