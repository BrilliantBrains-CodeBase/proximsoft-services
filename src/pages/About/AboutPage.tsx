import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
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

const teamMembers = [
  {
    name: 'Michael Torres',
    role: 'Business Advisor',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/1.jpg',
  },
  {
    name: 'Rachel Kim',
    role: 'Senior Consultant',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/2.jpg',
  },
  {
    name: 'David Osei',
    role: 'Finance Consultant',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/3.jpg',
  },
  {
    name: 'Priya Nair',
    role: 'Business Advisor',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/4.jpg',
  },
  {
    name: 'James Whitfield',
    role: 'IT Consultant',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/5.jpg',
  },
  {
    name: 'Sara Ahmed',
    role: 'Senior Consultant',
    description: 'Et harum quidem rerum facilis est et expedita disctinctio. Nam libero tempore veriations.',
    avatar: '/images/team/6.jpg',
  },
]

interface FormState {
  name: string
  email: string
  phone: string
  website: string
  message: string
}

export default function AboutPage() {
  const { trust } = siteConfig
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

  return (
    <>
      <Helmet>
        <title>About Us — {siteConfig.name}</title>
        <meta
          name="description"
          content={`Learn about ${siteConfig.name} — our story, our team, and our mission to deliver enterprise IT solutions that last.`}
        />
      </Helmet>

      {/* ── Breadcrumb banner ── */}
      <div className="about-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="about-breadcrumb-title">About</h1>
        </div>
      </div>

      {/* ── About intro: image left, text right ── */}
      <div>
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-[var(--section-padding-y)]">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            <AnimatedSection>
              <div className="about-inner-img-wrap">
                <img
                  src="/images/about/inner/left-img.jpg"
                  alt="Proximsoft consulting team"
                  className="about-inner-img"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = '/images/about/about11.png' }}
                />
                <div className="about-inner-author-badge">
                  <span className="about-author-name">Michael Torres</span>
                  <span className="about-author-role">CEO &amp; Founder</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="pl-0 md:pl-8">
                <span className="sub-title-label">{trust.subTitle}</span>
                <h2 className="section-title mb-4">We Provides Best Advice For Your Business</h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {trust.description}
                </p>
                <ul className="about-checklist mb-8">
                  <li>End-to-end SAP, Salesforce, Oracle &amp; Microsoft implementations</li>
                  <li>AI-powered analytics and intelligent automation solutions</li>
                  <li>Cross-platform integrations that eliminate data silos</li>
                  <li>Managed services and AMS support post go-live</li>
                  <li>A team of certified consultants with real enterprise experience</li>
                </ul>
                <a className="readon" href="/contact">Discover More</a>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>

      {/* ── Stats counter band ── */}
      <div className="about-counter-band">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-(--section-padding-y)" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection className="text-center mb-10">
            <span className="sub-title-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Fun Facts</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Facts For Choosing Us</h2>
          </AnimatedSection>
          <div className="about-counter-grid">
            {[
              { value: 100,  suffix: 'k', label: 'Happy Clients' },
              { value: 250,  suffix: '+', label: 'Projects Done' },
              { value: 60,   suffix: '+', label: 'Expert People' },
              { value: 230,  suffix: 'k', label: 'Portfolios' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="about-counter-item">
                  <div className="about-counter-number">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="about-counter-label">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* ── Team Section ── */}
      <section className="bg-white py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="about-team-grid">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.08}>
                <div className="about-team-card">
                  <div className="about-team-img-wrap">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="about-team-img"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = '/images/testimonial/avatar/1.jpg' }}
                    />
                  </div>
                  <div className="about-team-info">
                    <h3 className="about-team-name">{member.name}</h3>
                    <span className="about-team-role">{member.role}</span>
                    <p className="about-team-desc">{member.description}</p>
                    <div className="about-team-social">
                      <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                      <a href="#" aria-label="Google+"><GooglePlusIcon /></a>
                      <a href="#" aria-label="Twitter"><TwitterIcon /></a>
                      <a href="#" aria-label="Pinterest"><PinterestIcon /></a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Quote Section ── */}
      <div className="about-freequote">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="about-freequote-inner">
            {/* Left image panel */}
            <div className="about-freequote-img" aria-hidden="true" />

            {/* Right form */}
            <div className="about-freequote-form">
              {status === 'success' ? (
                <div className="py-10 text-center">
                  <div className="text-4xl mb-3" style={{ color: 'var(--color-accent)' }}>✓</div>
                  <h3 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    Message received!
                  </h3>
                  <p className="text-white/70 text-sm mt-2">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <span className="sub-title-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Let's Talk</span>
                  <h2 className="section-title mb-8" style={{ color: '#ffffff' }}>Request a Free Quote</h2>
                  <div className="grid sm:grid-cols-2 gap-x-6">
                    <div className="mb-6">
                      <input
                        name="name" type="text" required value={form.name}
                        onChange={handleChange} placeholder="Name"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="email" type="email" required value={form.email}
                        onChange={handleChange} placeholder="E-mail"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="phone" type="text" required value={form.phone}
                        onChange={handleChange} placeholder="Phone Number"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="website" type="text" value={form.website}
                        onChange={handleChange} placeholder="Your Website"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="sm:col-span-2 mb-8">
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange} placeholder="Your Message Here"
                        className="about-freequote-input about-freequote-textarea"
                      />
                    </div>
                  </div>
                  {status === 'error' && (
                    <p className="text-sm mb-4 text-red-300">
                      Something went wrong. Please call{' '}
                      <a href={`tel:${siteConfig.contact.phone}`} className="underline">{siteConfig.contact.phone}</a>.
                    </p>
                  )}
                  <button type="submit" className="readon about-quote-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Submit Now'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Inline SVG icons ─────────────────────────────────────────────────────── */
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}
function GooglePlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8zM21 9v2h-2v2h-2v-2h-2V9h2V7h2v2h2z"/>
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  )
}
function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}
