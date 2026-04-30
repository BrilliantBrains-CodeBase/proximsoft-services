import { useState } from 'react'
import { MapPin, Clock, Building2, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/AnimatedSection'
import jobsData from '@/data/jobs.json'

interface Job {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  posted: string
}

const ALL_DEPARTMENTS = ['All', ...Array.from(new Set((jobsData.jobs as Job[]).map((j) => j.department)))]
const ALL_TYPES = ['All Types', ...Array.from(new Set((jobsData.jobs as Job[]).map((j) => j.type)))]

interface Props {
  onApply: (title: string) => void
}

export default function JobListings({ onApply }: Props) {
  const [dept, setDept] = useState('All')
  const [type, setType] = useState('All Types')

  const filtered = (jobsData.jobs as Job[]).filter(
    (j) =>
      (dept === 'All' || j.department === dept) &&
      (type === 'All Types' || j.type === type),
  )

  return (
    <section className="py-[var(--section-padding-y)] bg-white">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection className="text-center mb-10">
          <span className="sub-title-label">Open Positions</span>
          <h2 className="section-title">Find Your Role</h2>
        </AnimatedSection>

        {/* Filter bar */}
        <AnimatedSection className="flex flex-wrap items-center gap-3 mb-10">
          <div className="flex flex-wrap gap-2">
            {ALL_DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  dept === d
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="ml-auto border border-[var(--color-border)] rounded-full px-4 py-2 text-sm text-[var(--color-text-secondary)] bg-white focus:outline-none focus:border-[var(--color-primary)]"
          >
            {ALL_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </AnimatedSection>

        {/* Job cards */}
        {filtered.length === 0 ? (
          <AnimatedSection className="text-center py-20 text-[var(--color-text-secondary)]">
            No roles match the current filter. Try a different combination or apply below.
          </AnimatedSection>
        ) : (
          <AnimatedSection>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((job) => (
                <div
                  key={job.id}
                  className="border border-[var(--color-border)] rounded-md p-7 flex flex-col gap-4 hover:shadow-md hover:border-[var(--color-primary)] transition-all bg-white"
                >
                  <h3
                    className="text-base font-semibold leading-snug"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                  >
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    <Pill icon={<Building2 size={12} />} label={job.department} color="primary" />
                    <Pill icon={<Clock size={12} />} label={job.type} color="accent" />
                    <Pill icon={<MapPin size={12} />} label={job.location} color="neutral" />
                  </div>

                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {job.description}
                  </p>

                  <button
                    onClick={() => onApply(job.title)}
                    className="inline-flex items-center gap-2 text-sm font-semibold self-start mt-auto"
                    style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
                  >
                    Apply Now <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}

function Pill({ icon, label, color }: { icon: React.ReactNode; label: string; color: 'primary' | 'accent' | 'neutral' }) {
  const styles = {
    primary: 'bg-[var(--color-surface)] text-[var(--color-primary)]',
    accent:  'bg-orange-50 text-orange-600',
    neutral: 'bg-gray-100 text-[var(--color-text-secondary)]',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[color]}`}>
      {icon}
      {label}
    </span>
  )
}
