import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (highContrast) {
      root.setAttribute('data-contrast', 'high')
    } else {
      root.removeAttribute('data-contrast')
    }
  }, [highContrast])

  return (
    <button
      aria-pressed={highContrast}
      onClick={() => setHighContrast((s) => !s)}
      className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-white/80 border border-gray-200 shadow-sm text-sm text-cloud-ink/90 focus:outline-none focus:ring-2 focus:ring-cloud-accent/50"
    >
      <span>{highContrast ? 'High contrast' : 'Normal'}</span>
      <span aria-hidden className="text-cloud-ink/60">{highContrast ? '⚡' : '🌤️'}</span>
    </button>
  )
}
