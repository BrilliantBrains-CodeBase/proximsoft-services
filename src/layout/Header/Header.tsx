import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { siteConfig } from '@/lib/content'

const NAV_LINKS = [
  { text: 'Home',         href: '/' },
  { text: 'About Us',     href: '/about' },
  { text: 'Services',     href: '#services' },
  { text: 'Careers',      href: '/careers' },
  { text: 'Blogs',        href: '/blog' },
  { text: 'Contact Us',   href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="full-width-header">

      {/* ── Top toolbar (hidden on mobile) ── */}
      <div className="toolbar-bar hidden md:block">
        <div className="mx-auto max-w-[var(--container-max-width)] px-6 flex items-center justify-between">
          {/* Left: contact */}
          <div className="toolbar-contact-list">
            <a href={`mailto:${siteConfig.contact.email}`}>
              <MailIcon /> {siteConfig.contact.email}
            </a>
            <a href={`tel:${siteConfig.contact.phone}`}>
              <PhoneIcon /> {siteConfig.contact.phone}
            </a>
          </div>
          {/* Right: social — sits on the skewed red band */}
          <div className="toolbar-social-list">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Pinterest"><PinterestIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </div>

      {/* ── Main sticky nav ── */}
      <header className={`rs-header${scrolled ? ' sticky' : ''}`}>
        <div className="menu-area">
          <div className="mx-auto max-w-[var(--container-max-width)] px-6 flex items-center justify-between h-[90px]">

            {/* Logo */}
            <Link to="/" aria-label={`${siteConfig.name} home`} className="flex-shrink-0">
              <img
                src="/images/logo-proximsoft.png"
                alt={siteConfig.name}
                className="h-11 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  const next = e.currentTarget.nextElementSibling as HTMLElement | null
                  if (next) next.style.display = 'block'
                }}
              />
              <span className="hidden nav-logo-text">{siteConfig.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isAnchor = link.href.startsWith('#')
                const isActive = !isAnchor && pathname === link.href
                const cls = `nav-link${isActive ? ' active' : ''}`
                return isAnchor ? (
                  <a key={link.href} href={link.href} className={cls}>{link.text}</a>
                ) : (
                  <Link key={link.href} to={link.href} className={cls}>{link.text}</Link>
                )
              })}
            </nav>

            {/* Right: icon buttons + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="nav-icon-btn" aria-label="Search"><SearchIcon /></button>
              <a href="#contact-form" className="head-btn">SCHEDULE A CALL</a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="md:hidden p-2 text-[var(--color-text-primary)]"
            >
              {mobileOpen ? <XIcon /> : <HamburgerIcon />}
            </button>
          </div>

          {/* Mobile drawer */}
          {mobileOpen && (
            <nav className="md:hidden border-t border-[var(--color-border)] bg-white px-6 pb-5 pt-3" aria-label="Mobile navigation">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => {
                  const isAnchor = link.href.startsWith('#')
                  return isAnchor ? (
                    <a key={link.href} href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="nav-link py-2 border-b border-[var(--color-border)]"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link key={link.href} to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="nav-link py-2 border-b border-[var(--color-border)]"
                    >
                      {link.text}
                    </Link>
                  )
                })}
                <a href="#contact-form" onClick={() => setMobileOpen(false)}
                  className="head-btn text-center mt-3">
                  SCHEDULE A CALL
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}

/* ── Inline SVG Icons ─────────────────────────────────────────────────────── */
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.07 3h3a2 2 0 012 1.72c.12.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L9.09 10.9a16 16 0 006.01 6.01l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0122 17z"/>
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  )
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
    </svg>
  )
}
function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}
function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  )
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )
}
