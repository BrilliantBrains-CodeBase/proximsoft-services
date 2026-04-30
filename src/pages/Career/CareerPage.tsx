import { useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/lib/content'
import WhyWorkWithUs from './components/WhyWorkWithUs'
import JobListings from './components/JobListings'
import ApplicationForm from './components/ApplicationForm'

export default function CareerPage() {
  const [prefillPosition, setPrefillPosition] = useState('')
  const formRef = useRef<HTMLElement | null>(null)

  const handleApply = (title: string) => {
    setPrefillPosition(title)
    setTimeout(() => {
      document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const { meta } = siteConfig.careers

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      {/* Breadcrumb banner */}
      <div className="contact-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="contact-breadcrumb-title">Careers</h1>
          <nav aria-label="breadcrumb" className="contact-breadcrumb-nav">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span>Careers</span>
          </nav>
        </div>
      </div>

      <main ref={formRef}>
        <WhyWorkWithUs />
        <JobListings onApply={handleApply} />
        <ApplicationForm prefillPosition={prefillPosition} />
      </main>
    </>
  )
}
