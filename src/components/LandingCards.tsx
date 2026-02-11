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

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {cards.map((c, i) => {
        const open = openIndex === i
        return (
          <div
            key={c.title}
            className={`bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-200 transition-transform duration-200 ${
              open ? 'scale-[1.01] ring-2 ring-offset-2 ring-cloud-accent/40' : ''
            }`}
          >
            <button
              className="w-full text-left flex items-center justify-between space-x-4"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <div>
                <h3 className="text-lg font-semibold text-cloud-ink">{c.title}</h3>
                <p className="text-sm text-cloud-ink/70 mt-1">{open ? 'Tap to collapse' : 'Tap to expand'}</p>
              </div>
              <div className="flex-shrink-0 text-cloud-ink/60">{open ? '▾' : '▸'}</div>
            </button>

            <div
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
