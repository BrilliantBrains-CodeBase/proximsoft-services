import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

interface FormState {
  name: string
  email: string
  phone: string
  website: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', website: '', message: '' })
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
        body: JSON.stringify({ ...form, source: siteConfig.name, timestamp: new Date().toISOString() }),
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', website: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const { phone, email, addressDisplay } = siteConfig.contact
  const mapsUrl = siteConfig.contact.mapsUrl

  return (
    <>
      <Helmet>
        <title>Contact Us — {siteConfig.name}</title>
        <meta name="description" content={`Get in touch with ${siteConfig.name}. Call us at ${phone} or email ${email}. Schedule a free consultation for your enterprise IT project.`} />
      </Helmet>

      {/* ── Breadcrumb banner ── */}
      <div className="contact-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="contact-breadcrumb-title">Contact Us</h1>
          <nav aria-label="breadcrumb" className="contact-breadcrumb-nav">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span>Contact Us</span>
          </nav>
        </div>
      </div>

      {/* ── Main contact section ── */}
      <div id="rs-contact" className="pt-(--section-padding-y) bg-background">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">

          {/* Info boxes */}
          <AnimatedSection>
            <div className="grid gap-6 md:grid-cols-3 mb-16">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <PhoneIconSolid />
                </div>
                <div>
                  <h4 className="contact-info-label">Phone Number</h4>
                  <a href={`tel:${phone}`} className="contact-info-value">{phone}</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <EnvelopeIcon />
                </div>
                <div>
                  <h4 className="contact-info-label">Email Address</h4>
                  <a href={`mailto:${email}`} className="contact-info-value">{email}</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MapPinIcon />
                </div>
                <div>
                  <h4 className="contact-info-label">Office Address</h4>
                  <p className="contact-info-value">{addressDisplay}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Form + side panel */}
          <div className="contact-form-wrap">
            {/* Left: image panel */}
            <div className="contact-side-panel" aria-hidden="true">
              <img
                src="/images/about/contact-left-img.jpg"
                alt=""
                className="contact-side-img"
              />
              <div className="contact-side-overlay" />
            </div>

            {/* Right: form */}
            <AnimatedSection className="contact-form-col">
              <div className="rs-quote-2">
                <div className="quote-form-card" style={{ boxShadow: 'none', background: 'transparent', padding: '3rem 3.5rem' }}>
                  <span className="sub-title-label">Let's Talk</span>
                  <h2 className="section-title mb-8">Get In Touch</h2>

                  {status === 'success' ? (
                    <div className="py-10 text-center">
                      <div className="text-4xl mb-3" style={{ color: 'var(--color-accent)' }}>✓</div>
                      <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                        Message received!
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                        We'll get back to you within one business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid sm:grid-cols-2 gap-x-6">
                        <div className="mb-8">
                          <input name="name" type="text" required value={form.name}
                            onChange={handleChange} placeholder="Name" />
                        </div>
                        <div className="mb-8">
                          <input name="email" type="email" required value={form.email}
                            onChange={handleChange} placeholder="E-mail" />
                        </div>
                        <div className="mb-8">
                          <input name="phone" type="text" required value={form.phone}
                            onChange={handleChange} placeholder="Phone Number" />
                        </div>
                        <div className="mb-8">
                          <input name="website" type="text" value={form.website}
                            onChange={handleChange} placeholder="Your Website" />
                        </div>
                        <div className="sm:col-span-2 mb-10">
                          <textarea name="message" value={form.message}
                            onChange={handleChange} placeholder="Your Message Here" />
                        </div>
                      </div>

                      {status === 'error' && (
                        <p className="text-sm mb-4" style={{ color: 'var(--color-destructive)' }}>
                          Something went wrong. Please call{' '}
                          <a href={`tel:${phone}`} className="underline">{phone}</a>.
                        </p>
                      )}

                      <button type="submit" className="readon" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending…' : 'Submit Now'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* ── Google Maps embed — flush below form, no gap before footer ── */}
        <div className="contact-map-wrap">
          <iframe
            title="Proximsoft Solutions location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(addressDisplay)}&output=embed`}
            width="100%"
            height="450"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Office location map"
          />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map-cta"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </>
  )
}

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
function PhoneIconSolid() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006.01 6.01l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 17z"/>
    </svg>
  )
}
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
