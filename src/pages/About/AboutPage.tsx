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
    name: '[Team Member Name]',
    role: 'SAP Practice Lead',
    description: 'Senior SAP architect with deep expertise in S/4HANA migrations, AMS support, and cross-industry enterprise implementations.',
    avatar: '/images/team/1.jpg',
  },
  {
    name: '[Team Member Name]',
    role: 'Salesforce & CX Practice Lead',
    description: 'Multi-cloud Salesforce architect specialising in Sales Cloud, Service Cloud, and seamless SAP–Salesforce integrations.',
    avatar: '/images/team/2.jpg',
  },
  {
    name: '[Team Member Name]',
    role: 'Head of Engineering',
    description: 'Leads custom application development, data platforms, and AI-powered automation across all client engagements.',
    avatar: '/images/team/3.jpg',
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
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', website: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: siteConfig.name, timestamp: new Date().toISOString() }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
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
          <h1 className="about-breadcrumb-title">About Us</h1>
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
                  <span className="about-author-name">[Founder Name]</span>
                  <span className="about-author-role">Founder &amp; CEO</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="pl-0 md:pl-8">
                <span className="sub-title-label">About Proximsoft Solutions</span>
                <h2 className="section-title mb-4">We Deliver Enterprise IT That Actually Works</h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  For over a decade, Proximsoft Solutions has helped US enterprises modernize the systems that run their business. We were built to fix the two biggest frustrations in enterprise IT — invoices that keep growing, and consultants who disappear right after go-live. Our work runs on three simple principles: senior people on every project, honest pricing every time, and accountability that lasts long after launch.
                </p>
                <ul className="about-checklist mb-0">
                  <li>Certified, senior consultants on every engagement — never juniors learning on your dime</li>
                  <li>Full-lifecycle delivery — Advisory, Implementation, Migration, Integration, Support, and Roll-Out</li>
                  <li>Costs typically 30 to 40 percent below the big-firm consultancy benchmark</li>
                  <li>US-based delivery leadership with global execution capability</li>
                  <li>Over ten years of experience across SAP, Oracle, Salesforce, Microsoft, and modern data platforms</li>
                </ul>
                <div className="mt-10">
                  <a className="readon" href="/contact">Discover More</a>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>

      {/* ── Stats counter band ── */}
      <div className="about-counter-band">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-(--section-padding-y)" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection className="text-center mb-10">
            <span className="sub-title-label" style={{ color: 'rgba(255,255,255,0.7)' }}>By the Numbers</span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>Facts That Speak for Themselves</h2>
          </AnimatedSection>
          <div className="about-counter-grid">
            {[
              { value: 150, suffix: '+', label: 'Happy Clients' },
              { value: 300, suffix: '+', label: 'Projects Delivered' },
              { value: 100, suffix: '+', label: 'Expert Consultants' },
              { value: 10,  suffix: '+', label: 'Years of Experience' },
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
          <AnimatedSection className="text-center mb-12">
            <span className="sub-title-label">Our Leadership</span>
            <h2 className="section-title">The People Behind the Work</h2>
          </AnimatedSection>
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
                  <h2 className="section-title mb-2" style={{ color: '#ffffff' }}>Request a Free Quote</h2>
                  <p className="about-freequote-subline">
                    Drop a few details below. A senior consultant — not a sales rep — will get back to you within one business day.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-6">
                    <div className="mb-6">
                      <input
                        name="name" type="text" required value={form.name}
                        onChange={handleChange} placeholder="e.g. Jane Smith"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="email" type="email" required value={form.email}
                        onChange={handleChange} placeholder="you@yourcompany.com"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="phone" type="text" required value={form.phone}
                        onChange={handleChange} placeholder="+1 (___) ___-____"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        name="website" type="text" value={form.website}
                        onChange={handleChange} placeholder="yourcompany.com"
                        className="about-freequote-input"
                      />
                    </div>
                    <div className="sm:col-span-2 mb-8">
                      <textarea
                        name="message" value={form.message}
                        onChange={handleChange} placeholder="What system are you working with? What are you trying to fix or build?"
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
                    {status === 'sending' ? 'Sending…' : 'Get My Free Quote'}
                  </button>
                  <p className="about-freequote-microcopy">
                    No spam. No pushy follow-ups. Just a real reply from someone who can actually help.
                  </p>
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
