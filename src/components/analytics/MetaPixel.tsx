import { useEffect } from 'react'

interface MetaPixelProps {
  pixelId: string
}

/**
 * Injects the Meta (Facebook) Pixel script when VITE_FACEBOOK_PIXEL_ID is set.
 * Mount once in MainLayout.tsx.
 */
export default function MetaPixel({ pixelId }: MetaPixelProps) {
  useEffect(() => {
    if (!pixelId) return
    /* eslint-disable */
    const f = window as any
    if (f.fbq) return // already loaded
    const fbq: any = (f.fbq = function () {
      fbq.callMethod ? fbq.callMethod(...arguments) : fbq.queue.push(arguments)
    })
    if (!f._fbq) f._fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)
    fbq('init', pixelId)
    fbq('track', 'PageView')
    /* eslint-enable */
  }, [pixelId])

  return null
}
