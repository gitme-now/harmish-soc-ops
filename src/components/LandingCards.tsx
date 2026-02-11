import { useState } from 'react'

export function LandingCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const cards = [
    {
      title: 'Quick Rules',
      body: ['Find people who match the questions', 'Tap a square when you meet someone', 'Get 5 in a row to win!'],
    },
    {
      title: 'Example Questions',
      body: ['Has a pet', 'Worked remotely', 'Speaks >1 language'],
    },
    {
      title: 'Accessibility',
      body: ['Theme & contrast toggle available', 'Keyboard and touch friendly', 'Reduced-motion respected'],
    },
  ]

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle(index)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4" role="region" aria-label="Game information cards">
      {cards.map((c, i) => {
        const open = openIndex === i
        const contentId = `card-content-${i}`
        return (
          <div
            key={c.title}
            className={`bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-200 transition-transform duration-200 ${
              open ? 'scale-[1.01] ring-2 ring-offset-2 ring-cloud-accent/40' : ''
            }`}
          >
            <button
              className="w-full text-left flex items-center justify-between space-x-4 focus:outline-none focus:ring-2 focus:ring-cloud-accent/50 rounded-md p-2 -m-2"
              onClick={() => handleToggle(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              aria-expanded={open}
              aria-controls={contentId}
              type="button"
            >
              <div>
                <h3 className="text-lg font-semibold text-cloud-ink">{c.title}</h3>
                <p className="text-sm text-cloud-ink/70 mt-1">{open ? 'Tap to collapse' : 'Tap to expand'}</p>
              </div>
              <div className="flex-shrink-0 text-cloud-ink/60" aria-hidden="true">{open ? '▾' : '▸'}</div>
            </button>

            <div
              id={contentId}
              className={`mt-3 text-sm text-cloud-ink/80 overflow-hidden ${open ? 'max-h-96' : 'max-h-0'} transition-[max-height] duration-300`}
              style={{ transitionTimingFunction: 'cubic-bezier(.2,.8,.2,1)' }}
              aria-hidden={!open}
            >
              <ul className="list-inside list-disc space-y-1 pl-3">
                {c.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}
