import { useState } from 'react'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'
import type { FAQItem } from '@/lib/content'

interface FAQProps {
  items?: FAQItem[]
  sectionId?: string
}

/**
 * FAQ — Accordion-style frequently asked questions.
 *
 * HARD RULES:
 * 1. sectionId MUST be "faq" (QA Agent DOM order check)
 * 2. This component MUST appear before ContactForm in Home.tsx
 * 3. Minimum 6 items required
 */
export default function FAQ({ items = siteConfig.faq, sectionId = 'faq' }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i))

  return (
    <section id={sectionId} className="py-[var(--section-padding-y)] bg-[var(--color-background)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 mb-12">
            <div className="md:w-5/12">
              <span className="sub-title-label">FAQ</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {items.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div
                className="border border-[var(--color-border)] rounded-[4px] bg-white overflow-hidden mb-3"
              >
                <button
                  className="rb-faq-question"
                  aria-expanded={open === i}
                  aria-controls={`faq-body-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span>{item.question}</span>
                  <span className="rb-faq-icon" aria-hidden="true">▾</span>
                </button>

                {open === i && (
                  <div
                    id={`faq-body-${i}`}
                    role="region"
                    className="rb-faq-body"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
