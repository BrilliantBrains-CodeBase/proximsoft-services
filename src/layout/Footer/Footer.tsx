import { Link } from 'react-router-dom'
import { siteConfig } from '@/lib/content'
import blogsData from '@/data/blogs.json'

export default function Footer() {
  const { contact, name, footer } = siteConfig
  const latestPosts = blogsData.posts.slice(0, 3)

  return (
    <footer id="rs-footer" className="rs-footer">

      {/* ── Newsletter bar ── */}
      <div className="footer-newsletter-bar">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="footer-nl-title">One Useful Email a Month. That's It.</h3>
          <form className="footer-nl-form" onSubmit={(e) => e.preventDefault()} aria-label="Newsletter">
            <input type="email" placeholder="Your work email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* ── Main footer content (bg-wrap) ── */}
      <div className="footer-bg-wrap">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-16">
          <div className="grid md:grid-cols-3 gap-10">

            {/* Col 1: Brand */}
            <div className="footer-about-widget">
              <div className="mb-5">
                <img
                  src={footer.logo}
                  alt={name}
                  className="h-9 w-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    const next = e.currentTarget.nextElementSibling as HTMLElement | null
                    if (next) next.style.display = 'block'
                  }}
                />
                <span className="hidden footer-logo-text">{name}</span>
              </div>
              <p className="footer-about-desc">{footer.tagline}</p>
              <a href="#about" className="readon footer-discover-btn">Discover More</a>
            </div>

            {/* Col 2: Contact Info */}
            <div>
              <h4 className="footer-widget-title">Contact Info</h4>
              <ul className="footer-address-list">
                <li>
                  <span className="footer-icon" aria-hidden="true"><LocationIcon /></span>
                  <span>{contact.addressDisplay}</span>
                </li>
                <li>
                  <span className="footer-icon" aria-hidden="true"><PhoneIcon /></span>
                  <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </li>
                <li>
                  <span className="footer-icon" aria-hidden="true"><MailIcon /></span>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <span className="footer-icon" aria-hidden="true"><ClockIcon /></span>
                  <span>{contact.openingHours.join(' | ')}</span>
                </li>
              </ul>
            </div>

            {/* Col 3: Latest Posts */}
            <div>
              <h4 className="footer-widget-title">Latest Posts</h4>
              <div className="footer-posts">
                {latestPosts.map((post) => (
                  <div key={post.slug} className="footer-post-item">
                    <Link to={`/blog/${post.slug}`} className="footer-post-thumb">
                      <img src={post.image} alt={post.title} loading="lazy" />
                    </Link>
                    <div className="footer-post-info">
                      <Link to={`/blog/${post.slug}`} className="footer-post-title">{post.title}</Link>
                      <div className="footer-post-date">
                        <CalendarIcon /> {post.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer bottom bar ── */}
        <div className="footer-bottom-bar">
          <div className="mx-auto max-w-[var(--container-max-width)] px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="footer-copyright">
              © Copyright {footer.copyrightYear} {name}. All Rights Reserved.
            </p>
            <ul className="footer-social-list">
              <li><a href="#" aria-label="Facebook"><FacebookIcon /></a></li>
              <li><a href="#" aria-label="Twitter"><TwitterIcon /></a></li>
              <li><a href="#" aria-label="Pinterest"><PinterestIcon /></a></li>
              <li><a href="#" aria-label="LinkedIn"><LinkedInIcon /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Inline SVG Icons ─────────────────────────────────────────────────────── */
function LocationIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function PhoneIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006.01 6.01l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 17z"/></svg>
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
}
function ClockIcon() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
}
function CalendarIcon() {
  return <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function FacebookIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
}
function TwitterIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
}
function PinterestIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
}
function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
}
