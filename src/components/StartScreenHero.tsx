import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'

interface StartScreenHeroProps {
  onStart: () => void;
}

export function StartScreenHero({ onStart }: StartScreenHeroProps) {
  const [showModal, setShowModal] = useState(false)

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    }
    
    if (showModal) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [showModal])

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cloud-base text-cloud-ink relative">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-12 relative z-10">
        <div className="flex items-center justify-center mb-8">
          <div className="hidden md:block absolute right-4 top-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Large Hero Heading */}
        <h1 className="text-6xl md:text-7xl font-bold font-poppins mb-4 bg-gradient-to-br from-cloud-ink via-cloud-ink/90 to-cloud-ink/70 bg-clip-text text-transparent">
          Welcome to Soc Ops
        </h1>
        
        {/* Supporting Tagline */}
        <p className="text-xl md:text-2xl text-cloud-ink/70 mb-2 max-w-2xl mx-auto">
          Break the ice and connect with your team
        </p>
        
        <p className="text-base md:text-lg text-cloud-ink/60 mb-10 max-w-xl mx-auto">
          Play social bingo with fun prompts that help you discover what makes your colleagues unique
        </p>

        {/* Mobile Theme Toggle */}
        <div className="md:hidden mb-6 flex justify-center">
          <ThemeToggle />
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="bg-cloud-accent text-cloud-ink font-semibold py-4 px-10 rounded-xl text-xl shadow-lg hover:shadow-xl active:bg-cloud-accent-light transition-all card-focus"
        >
          Start Playing
        </button>
      </div>

      {/* Compact How to Play Card */}
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200/50">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-cloud-ink mb-3 font-poppins">
                How to Play
              </h2>
              <ul className="space-y-2 text-cloud-ink/80">
                <li className="flex items-start gap-2">
                  <span className="text-cloud-accent font-bold mt-0.5">1.</span>
                  <span>Browse the 5×5 grid of fun questions and prompts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cloud-accent font-bold mt-0.5">2.</span>
                  <span>Find teammates who match each square's description</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cloud-accent font-bold mt-0.5">3.</span>
                  <span>Tap squares to mark them when you make a connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cloud-accent font-bold mt-0.5">4.</span>
                  <span>Get five in a row (horizontal, vertical, or diagonal) to win!</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="flex-shrink-0 text-cloud-accent hover:text-cloud-ink/90 font-medium text-sm underline underline-offset-2 card-focus"
              aria-haspopup="dialog"
            >
              Learn more
            </button>
          </div>
        </div>
      </div>

      {/* Learn More Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-cloud-ink/60 hover:text-cloud-ink text-2xl w-8 h-8 flex items-center justify-center rounded-lg card-focus"
              aria-label="Close modal"
            >
              ×
            </button>

            <h3 id="modal-title" className="text-3xl font-bold font-poppins text-cloud-ink mb-4">
              About Soc Ops Bingo
            </h3>

            <div className="space-y-4 text-cloud-ink/80">
              <p>
                <strong className="text-cloud-ink">Social Bingo</strong> is an icebreaker game designed to help teams connect and learn about each other in a fun, interactive way.
              </p>

              <div>
                <h4 className="font-semibold text-cloud-ink mb-2">Game Features</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>24 unique prompts plus a free center space</li>
                  <li>Randomized board for each game</li>
                  <li>Multiple ways to win (rows, columns, diagonals)</li>
                  <li>Theme toggle for light/dark preference</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-cloud-ink mb-2">Accessibility</h4>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Keyboard navigation fully supported</li>
                  <li>Screen reader friendly</li>
                  <li>Respects reduced-motion preferences</li>
                  <li>High contrast mode available</li>
                </ul>
              </div>

              <p className="text-sm text-cloud-ink/60 mt-6 pt-4 border-t border-gray-200">
                Pro tip: Use this game at team meetings, onboarding sessions, or social events to help everyone feel more connected!
              </p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-cloud-accent text-cloud-ink font-semibold py-3 px-6 rounded-lg hover:bg-cloud-accent-light transition-colors card-focus"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
