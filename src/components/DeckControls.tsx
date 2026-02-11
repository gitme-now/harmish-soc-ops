import React from 'react'

interface DeckControlsProps {
  onDraw: () => void
  onShuffle: () => void
  onReset: () => void
  remaining: number
}

export function DeckControls({ onDraw, onShuffle, onReset, remaining }: DeckControlsProps) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button onClick={onDraw} className="bg-cloud-accent text-cloud-ink px-4 py-2 rounded-lg font-medium card-focus">
        Draw
      </button>
      <button onClick={onShuffle} className="bg-white/90 border border-gray-200 px-3 py-2 rounded-lg card-focus">
        Shuffle
      </button>
      <button onClick={onReset} className="bg-white/90 border border-gray-200 px-3 py-2 rounded-lg card-focus">
        Reset
      </button>
      <div className="text-sm text-cloud-ink/70 ml-2">{remaining} remaining</div>
    </div>
  )
}

export default DeckControls
