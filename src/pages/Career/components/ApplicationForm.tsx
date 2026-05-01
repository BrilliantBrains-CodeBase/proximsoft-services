import { useState, useRef, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  desiredPosition: string
  linkedin: string
  github: string
  portfolio: string
  coverLetter: string
}

const EMPTY: FormState = {
  firstName: '', lastName: '', email: '', phone: '',
  desiredPosition: '', linkedin: '', github: '', portfolio: '', coverLetter: '',
}

interface Props {
  prefillPosition?: string
}

export default function ApplicationForm({ prefillPosition }: Props) {
  const [form, setForm] = useState<FormState>({ ...EMPTY, desiredPosition: prefillPosition ?? '' })
  const [resume, setResume] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (prefillPosition) {
      setForm((prev) => ({ ...prev, desiredPosition: prefillPosition }))
    }
  }, [prefillPosition])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Resume must be under 5 MB.')
      return
    }
    setResume(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resume) { alert('Please upload your resume (PDF).'); return }
    setStatus('sending')

    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      fd.append('resume', resume, resume.name)
      fd.append('source', siteConfig.name)
      fd.append('timestamp', new Date().toISOString())

      await fetch('/api/apply.php', { method: 'POST', body: fd })
      setStatus('success')
      setForm(EMPTY)
      setResume(null)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="apply" className="py-[var(--section-padding-y)] bg-[var(--color-gray-bg2)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="sub-title-label">Join Our Team</span>
          <h2 className="section-title">Don't See a Role That Fits?</h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto text-sm leading-relaxed">
            We're always looking for talented individuals. Send us your application and we'll reach out when the right opportunity arises.
          </p>
        </AnimatedSection>

        <div className="contact-form-wrap">
          {/* Left panel */}
          <div className="contact-side-panel" aria-hidden="true">
            <img
              src="/images/about/contact-left-img.jpg"
              alt=""
              className="contact-side-img"
            />
            <div className="contact-side-overlay" />
            <div className="absolute bottom-10 left-8 right-8 text-white z-10">
              <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                Join Our Team
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                We're looking for talented individuals to help us shape the future of enterprise technology.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <AnimatedSection className="contact-form-col">
            <div className="rs-quote-2"><div className="quote-form-card" style={{ boxShadow: 'none', background: 'transparent', padding: '3rem 3.5rem' }}>
              <span className="sub-title-label">Apply Now</span>
              <h2 className="section-title mb-8">Submit Your Application</h2>

              {status === 'success' ? (
                <div className="py-10 text-center">
                  <div className="text-4xl mb-3" style={{ color: 'var(--color-accent)' }}>✓</div>
                  <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    Application received!
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mt-2">
                    We'll review your profile and be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-x-6">
                    <div className="mb-6">
                      <label className="form-label">First Name *</label>
                      <input name="firstName" type="text" required placeholder="Enter your first name"
                        value={form.firstName} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Last Name *</label>
                      <input name="lastName" type="text" required placeholder="Enter your last name"
                        value={form.lastName} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" required placeholder="Enter your email"
                        value={form.email} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Phone Number *</label>
                      <input name="phone" type="tel" required placeholder="Enter your phone number"
                        value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Desired Position *</label>
                      <input name="desiredPosition" type="text" required placeholder="e.g. Senior Frontend Developer"
                        value={form.desiredPosition} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">LinkedIn Profile</label>
                      <input name="linkedin" type="url" placeholder="https://linkedin.com/in/yourprofile"
                        value={form.linkedin} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">GitHub Profile</label>
                      <input name="github" type="url" placeholder="https://github.com/yourusername"
                        value={form.github} onChange={handleChange} />
                    </div>
                    <div className="mb-6">
                      <label className="form-label">Portfolio Website</label>
                      <input name="portfolio" type="url" placeholder="https://yourportfolio.com"
                        value={form.portfolio} onChange={handleChange} />
                    </div>

                    {/* Resume upload */}
                    <div className="sm:col-span-2 mb-6">
                      <label className="form-label">Resume (PDF) *</label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-[var(--color-border)] rounded-md py-8 flex flex-col items-center gap-2 hover:border-[var(--color-primary)] transition-colors bg-white cursor-pointer"
                      >
                        <Upload size={24} color="var(--color-text-secondary)" />
                        <span className="text-sm text-[var(--color-text-primary)] font-medium">
                          {resume ? resume.name : <><strong>Click to upload</strong> your resume</>}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)]">PDF (MAX. 5MB)</span>
                      </button>
                    </div>

                    {/* Cover letter */}
                    <div className="sm:col-span-2 mb-8">
                      <label className="form-label">Cover Letter / Message</label>
                      <textarea
                        name="coverLetter"
                        rows={5}
                        placeholder="Tell us about yourself and why you want to work with us..."
                        value={form.coverLetter}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {status === 'error' && (
                    <p className="text-sm mb-4" style={{ color: 'var(--color-destructive)' }}>
                      Something went wrong. Please email us at{' '}
                      <a href={`mailto:${siteConfig.contact.email}`} className="underline">
                        {siteConfig.contact.email}
                      </a>.
                    </p>
                  )}

                  <button type="submit" className="readon w-full text-center" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Submitting…' : 'Submit Application →'}
                  </button>
                </form>
              )}
            </div></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
