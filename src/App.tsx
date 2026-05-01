import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import BlogPage from './pages/Blog/BlogPage'
import BlogSinglePage from './pages/Blog/BlogSinglePage'
import ServicesPage from './pages/Services/ServicesPage'
import ServiceSinglePage from './pages/Services/ServiceSinglePage'
import TermsPage from './pages/legal/TermsPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import CareerPage from './pages/Career/CareerPage'
import ThankYou from './pages/ThankYou/ThankYou'
import NotFound from './pages/NotFound/NotFound'

function easedScrollTo(target: number, duration = 1200) {
  const start = window.scrollY
  const distance = target - start
  let startTime: number | null = null

  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function ScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    const id = hash.slice(1)
    const tryScroll = (attempts: number) => {
      const el = document.getElementById(id)
      if (el) {
        const offset = el.getBoundingClientRect().top + window.scrollY - 80
        easedScrollTo(offset, 1100)
        return
      }
      if (attempts > 0) setTimeout(() => tryScroll(attempts - 1), 100)
    }
    tryScroll(10)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogSinglePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceSinglePage />} />
          <Route path="/careers" element={<CareerPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
