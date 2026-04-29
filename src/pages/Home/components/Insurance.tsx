import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

/**
 * Insurance — repurposed as the Partner Logos section for the Reobiz consulting template.
 * Shows a CSS auto-scrolling ticker of partner brand logos.
 * Source: rs-partner modify6 section from index11.html.
 */
export default function Insurance() {
  const { subTitle, headline, partners } = siteConfig.insurance

  // Duplicate logos so the CSS ticker loops seamlessly
  const doubled = [...partners, ...partners]

  return (
    <section id="partners" className="py-[var(--section-padding-y)] bg-[var(--color-background)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="rb-sub-title">{subTitle}</span>
            <h2 className="rb-section-title">{headline}</h2>
          </div>
        </AnimatedSection>

        {/* Ticker */}
        <div className="partner-ticker-outer" aria-label="Our partners">
          <div className="partner-ticker-track">
            {doubled.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="partner-item flex-shrink-0 flex items-center justify-center"
                aria-label={p.name}
              >
                <img src={p.logo} alt={p.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
