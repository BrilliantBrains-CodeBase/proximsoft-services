import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * AnimatedSection — fade-in + slide-up on scroll into view.
 * Animates once; won't re-trigger on scroll back.
 *
 * Usage:
 *   <AnimatedSection>
 *     <h2>...</h2>
 *   </AnimatedSection>
 *
 *   <AnimatedSection delay={0.2}>
 *     <p>Staggered content</p>
 *   </AnimatedSection>
 */
export function AnimatedSection({ children, delay = 0, className }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
