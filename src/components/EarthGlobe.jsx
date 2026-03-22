import { useRef, useEffect } from 'react'

export default function EarthGlobe({ lang = 'pt' }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    function send() {
      iframe.contentWindow?.postMessage({ type: 'SET_LANG', lang }, '*')
    }

    // Send after load and on every lang change
    iframe.addEventListener('load', send)
    send()

    return () => iframe.removeEventListener('load', send)
  }, [lang])

  return (
    <div className="earth-globe-wrap">
      <iframe
        ref={iframeRef}
        src="/earth.html"
        title="Earth Globe"
        className="earth-globe-frame"
        allowtransparency="true"
        frameBorder="0"
        scrolling="no"
      />
    </div>
  )
}
