import { Rocket, Users, Globe, Award, BookOpen, Briefcase, LucideIcon } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket, Users, Globe, Award, BookOpen, Briefcase,
}

export default function WhyWorkWithUs() {
  const { whyWorkWithUs } = siteConfig.careers

  return (
    <section className="py-[var(--section-padding-y)] bg-[var(--color-gray-bg2)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection className="text-center mb-14">
          <span className="sub-title-label">Life at Proximsoft</span>
          <h2 className="section-title">Why Work With Us</h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {whyWorkWithUs.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? Briefcase
              return (
                <div
                  key={item.heading}
                  className="bg-white rounded-md border border-[var(--color-border)] p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}
                  >
                    <Icon size={26} strokeWidth={1.6} />
                  </div>
                  <h3
                    className="text-lg font-semibold leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                  >
                    {item.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
