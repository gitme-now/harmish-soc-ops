import React from 'react'
import { useCardDeck } from '../hooks/useCardDeck'
import Card from './Card'
import DeckControls from './DeckControls'

interface CardDeckProps {
  onClose: () => void
}

export function CardDeck({ onClose }: CardDeckProps) {
  const { currentCard, remainingCount, draw, shuffle, reset } = useCardDeck()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-cloud-base rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-cloud-ink">Card Deck Shuffle</h3>
          <button onClick={onClose} className="text-cloud-ink/70 card-focus">Close</button>
        </div>

        <div className="mt-6">
          <Card text={currentCard} />
          <DeckControls
            onDraw={draw}
            onShuffle={shuffle}
            onReset={reset}
            remaining={remainingCount}
          />
        </div>
      </div>
    </div>
  )
}

export default CardDeck
