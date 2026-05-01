import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'
import blogsData from '@/data/blogs.json'
import BlogSidebar from './BlogSidebar'

export default function BlogPage() {
  const { posts } = blogsData
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const filteredPosts = query
    ? posts.filter((p) => {
        const q = query.toLowerCase()
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.author.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        )
      })
    : posts

  return (
    <>
      <Helmet>
        <title>{query ? `"${query}" — Blog` : 'Blog'} — {siteConfig.name}</title>
        <meta
          name="description"
          content="Practical insights on enterprise technology — SAP, Salesforce, AI strategy, and digital transformation from the Proximsoft team."
        />
      </Helmet>

      {/* Breadcrumb banner */}
      <div className="blog-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="blog-breadcrumb-title">Blog</h1>
          <nav className="blog-breadcrumb-nav" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span>Blog</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="blog-page-grid">

            {/* Post list — left column */}
            <div className="blog-post-list">

              {/* Search results label */}
              {query && (
                <div className="blog-search-label">
                  {filteredPosts.length > 0
                    ? <>Showing <strong>{filteredPosts.length}</strong> result{filteredPosts.length !== 1 ? 's' : ''} for <strong>"{query}"</strong></>
                    : <>No results for <strong>"{query}"</strong></>
                  }
                  <Link to="/blog" className="blog-search-clear" aria-label="Clear search">✕ Clear</Link>
                </div>
              )}

              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <AnimatedSection key={post.slug} delay={i * 0.08}>
                    <article className="blog-inner-wrap">
                      <div className="image-part">
                        <Link to={`/blog/${post.slug}`}>
                          <img src={post.image} alt={post.title} loading="lazy" />
                        </Link>
                      </div>
                      <div className="content-part">
                        <h3 className="title">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <ul className="blog-meta-list">
                          <li><CalendarIcon />{post.date}</li>
                          <li><UserIcon />{post.author}</li>
                          <li><BookIcon /><Link to={`/blog/${post.slug}`}>{post.category}</Link></li>
                        </ul>
                        <p className="desc">{post.description}</p>
                        <div className="btn-part">
                          <Link className="readon-arrow" to={`/blog/${post.slug}`}>
                            Continue Reading <ArrowIcon />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </AnimatedSection>
                ))
              ) : (
                <div className="blog-no-results">
                  <p>Try a different keyword, or <Link to="/blog">browse all posts</Link>.</p>
                </div>
              )}
            </div>

            {/* Sidebar — right column */}
            <BlogSidebar posts={posts} />
          </div>
        </div>
      </div>
    </>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ marginLeft: '6px', verticalAlign: 'middle' }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
