import Hero from './components/Hero'
import TrustSignals from './components/TrustSignals'
import Insurance from './components/Insurance'
import Services from './components/Services'
import Projects from './components/Projects'
import ContactForm from './components/ContactForm'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Blog from './components/Blog'

/**
 * Home — Assembles all landing-page sections in Reobiz index11 order.
 * Reference: reobiz-reference/home/index11.html
 */
export default function Home() {
  return (
    <>
      {/* 1. Hero slider — 2-slide autoplay carousel */}
      <Hero />

      {/* 2. About + counters (style5 white) + dark about section (style6) */}
      <TrustSignals />

      {/* 3. Partner logos ticker */}
      <Insurance />

      {/* 4. Services — 3 image cards (style13) on bg23.jpg */}
      <Services />

      {/* 5. Latest Projects — 3-card grid on bg25.jpg */}
      <Projects />

      {/* 6. Request for Proposal — form with left-img11 */}
      <ContactForm />

      {/* 8. Testimonials — 2-up carousel with dots (style9) */}
      <Testimonials />

      {/* 9. Blog — 3 card grid (style3) */}
      <Blog />

      {/* 10. FAQ accordion */}
      <FAQ />
    </>
  )
}
