import { Link } from 'react-router-dom'
import { siteConfig } from '@/lib/content'

export default function ThankYou() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-5xl mb-6">✓</div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          We've received your message. Our team will get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="rounded-md bg-[var(--color-accent)] px-6 py-3 font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="rounded-md border border-[var(--color-primary)] px-6 py-3 font-semibold text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors"
          >
            Call Us Now
          </a>
        </div>
      </div>
    </div>
  )
}
