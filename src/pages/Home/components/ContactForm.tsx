import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

interface FormState {
  name: string
  email: string
  phone: string
  website: string
  message: string
}

export default function ContactForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', website: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const endpoint = 'https://script.google.com/macros/s/AKfycbysDseK3uADYyStECiGZM3QcrdRXBWh3f5awndn10gFE0G-PCwVxwUA-LW9xbsk-GsGlg/exec'
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ ...form, source: siteConfig.name, timestamp: new Date().toISOString() }),
      })
      navigate('/thank-you')
    } catch {
      setStatus('error')
    }
  }

  const { subTitle, headline, submitText, sideImage } = siteConfig.contactForm

  return (
    <section id="contact-form" className="rs-quote-2 py-[var(--section-padding-y)]">
      {/* Left floating image — absolute, hidden on tablet/mobile */}
      <div className="left-img-wrap">
        <img
          src={sideImage}
          alt="Consulting team"
          className="max-w-[480px] w-full object-contain relative z-10"
          loading="lazy"
        />
        <div className="morphin-blob-quote" aria-hidden="true" />
      </div>

      {/* Form positioned right (offset-lg-5 pattern) */}
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <div className="flex justify-end">
          <AnimatedSection className="w-full lg:w-7/12">
            <div className="quote-form-card">
              <span className="sub-title-label">{subTitle}</span>
              <h2 className="section-title mb-8">{headline}</h2>

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
                      <a href={`tel:${siteConfig.contact.phone}`} className="underline">
                        {siteConfig.contact.phone}
                      </a>.
                    </p>
                  )}

                  <button type="submit" className="readon" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : submitText}
                  </button>
                </form>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
