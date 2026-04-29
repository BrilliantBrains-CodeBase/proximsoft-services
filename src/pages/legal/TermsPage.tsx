import { siteConfig } from '@/lib/content'

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-16">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Terms &amp; Conditions</h1>
      <div className="prose max-w-none text-[var(--color-text-secondary)] space-y-4">
        <p>
          These Terms &amp; Conditions govern your use of the {siteConfig.name} website and services.
          By accessing this website, you agree to these terms.
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">Use of Services</h2>
        <p>
          {/* Developer Agent: populate from approved_brief.md or client-provided terms */}
          [PLACEHOLDER — populate with client-specific terms and conditions]
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">Contact</h2>
        <p>
          For questions about these terms, contact us at{' '}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-[var(--color-primary)] hover:underline">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-8">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
