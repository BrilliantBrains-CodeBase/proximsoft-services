import { useState, useEffect } from 'react'

function easedScrollTo(target: number, duration = 900) {
  const start = window.scrollY
  const distance = target - start
  let startTime: number | null = null
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  function step(ts: number) {
    if (!startTime) startTime = ts
    const progress = Math.min((ts - startTime) / duration, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      className="scroll-up-btn"
      onClick={() => easedScrollTo(0, 900)}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  )
}
