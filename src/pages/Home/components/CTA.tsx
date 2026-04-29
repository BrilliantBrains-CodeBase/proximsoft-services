import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

export default function CTA() {
  const { headline, ctaText, ctaHref } = siteConfig.cta

  return (
    <section className="rs-cta-2 py-[var(--section-padding-y)]">
      <AnimatedSection>
        <div className="cta-inner">
          <h2 className="cta-title">{headline}</h2>
          <div>
            <a href={ctaHref ?? '#contact-form'} className="readon">{ctaText}</a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
