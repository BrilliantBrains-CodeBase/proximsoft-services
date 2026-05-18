import { useState, useEffect } from 'react'
import { MapPin, Clock, Building2, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react'
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

const PAGE_SIZE = 5

const ALL_DEPARTMENTS = ['All', ...Array.from(new Set((jobsData.jobs as Job[]).map((j) => j.department)))]
const ALL_TYPES = ['All Types', ...Array.from(new Set((jobsData.jobs as Job[]).map((j) => j.type)))]

interface Props {
  onApply: (title: string) => void
}

export default function JobListings({ onApply }: Props) {
  const [dept, setDept]   = useState('All')
  const [type, setType]   = useState('All Types')
  const [query, setQuery] = useState('')
  const [page, setPage]   = useState(1)

  const q = query.toLowerCase().trim()

  const filtered = (jobsData.jobs as Job[]).filter((j) => {
    const matchesDept  = dept === 'All' || j.department === dept
    const matchesType  = type === 'All Types' || j.type === type
    const matchesQuery = !q || [j.title, j.department, j.location, j.description]
      .some((field) => field.toLowerCase().includes(q))
    return matchesDept && matchesType && matchesQuery
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Reset to page 1 whenever filters or search change
  useEffect(() => { setPage(1) }, [dept, type, query])

  function changePage(next: number) {
    setPage(next)
    // Scroll back to the top of the listing
    document.getElementById('job-listings-top')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="py-[var(--section-padding-y)] bg-[var(--color-gray-bg2)]">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <AnimatedSection className="text-center mb-10">
          <span className="sub-title-label">Open Positions</span>
          <h2 className="section-title">Find Your Role</h2>
        </AnimatedSection>

        {/* Anchor for scroll-back on page change */}
        <div id="job-listings-top" style={{ scrollMarginTop: '6rem' }} />

        {/* Search bar */}
        <AnimatedSection className="mb-6">
          <div className="job-search-wrap">
            <Search size={16} className="job-search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, department, or location…"
              className="job-search-input"
            />
            {query && (
              <button onClick={() => setQuery('')} className="job-search-clear" aria-label="Clear search">
                ✕
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Filter bar */}
        <AnimatedSection className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {ALL_DEPARTMENTS.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  dept === d
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white'
                    : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="ml-auto border border-[var(--color-border)] rounded-full px-4 py-1.5 text-sm text-[var(--color-text-secondary)] bg-white focus:outline-none focus:border-[var(--color-primary)]"
          >
            {ALL_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </AnimatedSection>

        {/* Results meta */}
        <div className="flex items-center justify-between mb-4 min-h-[1.5rem]">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {filtered.length} role{filtered.length !== 1 ? 's' : ''} found
            {totalPages > 1 && <> &mdash; page {page} of {totalPages}</>}
          </p>
        </div>

        {/* Row listing */}
        {filtered.length === 0 ? (
          <AnimatedSection className="text-center py-20 text-[var(--color-text-secondary)]">
            No roles match your search. Try adjusting the filters or search term.
          </AnimatedSection>
        ) : (
          <>
            <div className="job-list">
              {paginated.map((job, i) => (
                <AnimatedSection key={job.id} delay={i * 0.05}>
                  <div className="job-row">
                    <div className="job-row-main">
                      <h3 className="job-row-title">{job.title}</h3>
                      <div className="job-row-pills">
                        <Pill icon={<Building2 size={12} />} label={job.department} color="primary" />
                        <Pill icon={<Clock size={12} />}     label={job.type}       color="accent"  />
                        <Pill icon={<MapPin size={12} />}    label={job.location}   color="neutral" />
                      </div>
                      <p className="job-row-desc">{job.description}</p>
                    </div>
                    <div className="job-row-action">
                      <span className="job-row-posted">Posted {formatDate(job.posted)}</span>
                      <button onClick={() => onApply(job.title)} className="job-apply-btn">
                        Apply Now <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="job-pagination">
                <button
                  className="job-page-btn"
                  onClick={() => changePage(page - 1)}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => changePage(p)}
                    className={`job-page-btn ${p === page ? 'job-page-btn--active' : ''}`}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="job-page-btn"
                  onClick={() => changePage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
