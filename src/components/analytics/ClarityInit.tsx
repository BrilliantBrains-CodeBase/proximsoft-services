import { useEffect } from 'react'

interface ClarityInitProps {
  projectId: string
}

/**
 * Injects Microsoft Clarity when VITE_CLARITY_PROJECT_ID is set.
 * Mount once in MainLayout.tsx.
 */
export default function ClarityInit({ projectId }: ClarityInitProps) {
  useEffect(() => {
    if (!projectId) return
    /* eslint-disable */
    const c = window as any
    c.clarity =
      c.clarity ||
      function () {
        ;(c.clarity.q = c.clarity.q || []).push(arguments)
      }
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.clarity.ms/tag/${projectId}`
    document.head.appendChild(script)
    /* eslint-enable */
  }, [projectId])

  return null
}
