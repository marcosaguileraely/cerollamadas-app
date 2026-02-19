/**
 * This file may contain code that uses generative AI for code assistance, unit testing and/or entire functions.
 * The generative model(s) used may be a combination of GitHub Copilot, OpenAI ChatGPT or others.
 */

import { useEffect, useRef, useState } from 'react'

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const TurnstileWidget = ({ siteKey, onVerify, onExpire }) => {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!siteKey || typeof window === 'undefined') return

    const loadScript = () => {
      if (window.turnstile) {
        setLoaded(true)
        return
      }
      const script = document.createElement('script')
      script.src = TURNSTILE_SCRIPT
      script.async = true
      script.defer = true
      script.onload = () => setLoaded(true)
      document.head.appendChild(script)
    }

    loadScript()
  }, [siteKey])

  useEffect(() => {
    if (!loaded || !siteKey || !containerRef.current || !window.turnstile) return

    const id = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token) => onVerify && onVerify(token),
      'expired-callback': () => onExpire && onExpire(),
    })

    return () => {
      if (window.turnstile && id) window.turnstile.remove(id)
    }
  }, [loaded, siteKey, onVerify, onExpire])

  return (
    <div data-testid="turnstile-widget">
      <div ref={containerRef} />
    </div>
  )
}

export { TurnstileWidget }
