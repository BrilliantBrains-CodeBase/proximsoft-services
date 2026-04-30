import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AnimatedSection } from '@/components/AnimatedSection'
import { siteConfig } from '@/lib/content'
import blogsData from '@/data/blogs.json'
import BlogSidebar from './BlogSidebar'

interface FormState {
  name: string
  email: string
  message: string
}

export default function BlogSinglePage() {
  const { slug } = useParams<{ slug: string }>()
  const { posts } = blogsData

  const postIndex = posts.findIndex((p) => p.slug === slug)
  const post = posts[postIndex]
  const nextPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    if (!endpoint) { setStatus('error'); return }
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...form,
          subject: `Blog comment on: ${post?.title}`,
          source: siteConfig.name,
          timestamp: new Date().toISOString(),
        }),
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  if (!post) {
    return (
      <>
        <Helmet><title>Post Not Found — {siteConfig.name}</title></Helmet>
        <div className="blog-breadcrumb">
          <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
            <h1 className="blog-breadcrumb-title">Post Not Found</h1>
          </div>
        </div>
        <div className="py-[var(--section-padding-y)] text-center">
          <p className="text-[var(--color-text-secondary)] mb-6">
            The article you're looking for doesn't exist or may have been moved.
          </p>
          <Link className="readon" to="/blog">Back to Blog</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{post.title} — {siteConfig.name}</title>
        <meta name="description" content={post.description} />
      </Helmet>

      {/* Breadcrumb banner */}
      <div className="blog-breadcrumb">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 text-center">
          <h1 className="blog-breadcrumb-title blog-breadcrumb-title--single">{post.title}</h1>
          <nav className="blog-breadcrumb-nav" aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true"> / </span>
            <span>{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="py-[var(--section-padding-y)]">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6">
          <div className="blog-page-grid">

            {/* Article — left column */}
            <div>
              <AnimatedSection>
                <div className="blog-single-article">
                  {/* Hero image */}
                  <div className="blog-single-hero-img">
                    <img src={post.image} alt={post.title} loading="eager" />
                  </div>

                  {/* Article content card */}
                  <div className="blog-single-content">
                    {/* Meta */}
                    <ul className="blog-meta-list mb-30">
                      <li>
                        <CalendarIcon /> {post.date}
                      </li>
                      <li>
                        <UserIcon /> {post.author}
                      </li>
                      <li>
                        <BookIcon /> {post.category}
                      </li>
                    </ul>

                    {/* Body */}
                    <div
                      className="blog-single-body"
                      dangerouslySetInnerHTML={{ __html: post.body }}
                    />

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="blog-single-tags">
                        <span>Tags:</span>
                        {post.tags.map((tag) => (
                          <span key={tag} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Next article nav */}
                  {nextPost && (
                    <div className="article-nav">
                      <Link to={`/blog/${nextPost.slug}`} className="article-nav-next">
                        <span className="nav-label">Next <ArrowIcon /></span>
                        <span className="nav-title">{nextPost.title}</span>
                      </Link>
                    </div>
                  )}

                  {/* Leave a Reply */}
                  <div className="blog-reply-form">
                    <h3 className="reply-title">Leave a Reply</h3>
                    <p className="reply-subtitle">Your email address will not be published. Required fields are marked *</p>

                    {status === 'success' ? (
                      <div className="reply-success">
                        <div className="reply-success-icon">✓</div>
                        <h4>Comment received!</h4>
                        <p>Thank you for your message. We'll review it shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <div className="reply-grid">
                          <div className="reply-field">
                            <label htmlFor="reply-name">Name *</label>
                            <input
                              id="reply-name"
                              name="name"
                              type="text"
                              required
                              value={form.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="reply-field">
                            <label htmlFor="reply-email">Email *</label>
                            <input
                              id="reply-email"
                              name="email"
                              type="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="reply-field reply-field--full">
                            <label htmlFor="reply-message">Comment</label>
                            <textarea
                              id="reply-message"
                              name="message"
                              rows={7}
                              value={form.message}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        {status === 'error' && (
                          <p className="reply-error">
                            Something went wrong. Please try again or call{' '}
                            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>.
                          </p>
                        )}
                        <button type="submit" className="readon" disabled={status === 'sending'}>
                          {status === 'sending' ? 'Sending…' : 'Post Comment'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </AnimatedSection>
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
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
