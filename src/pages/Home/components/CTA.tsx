import { motion } from 'motion/react'
import { siteConfig } from '@/lib/content'

export default function CTA() {
  const { headline, ctaText, ctaHref } = siteConfig.cta

  return (
    <motion.section
      className="rs-cta-2 py-(--section-padding-y)"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="cta-inner">
        <h2 className="cta-title">{headline}</h2>
        <div>
          <a href={ctaHref ?? '#contact-form'} className="readon">{ctaText}</a>
        </div>
      </div>
    </motion.section>
  )
}
