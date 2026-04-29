import { siteConfig } from '@/lib/content'

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-16">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Privacy Policy</h1>
      <div className="prose max-w-none text-[var(--color-text-secondary)] space-y-4">
        <p>
          {siteConfig.name} is committed to protecting your privacy. This policy explains how we
          collect, use, and safeguard your personal information.
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as your name, phone number, and
          email address when you fill out our contact form.
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">How We Use Your Information</h2>
        <p>
          We use the information to respond to your inquiries, provide our services, and
          communicate with you about appointments and updates.
        </p>
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mt-6">Contact</h2>
        <p>
          For privacy questions, contact us at{' '}
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
