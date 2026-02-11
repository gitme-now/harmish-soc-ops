import { LandingCards } from './LandingCards'
import { ThemeToggle } from './ThemeToggle'
import { BoardPreview } from './BoardPreview'

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cloud-base text-cloud-ink">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-start gap-8">
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold font-poppins">Soc Ops</h1>
              <p className="text-lg text-cloud-ink/80 mt-1">Social Bingo</p>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Board Preview - shown above copy on mobile */}
          <div className="mb-6 md:hidden">
            <BoardPreview />
          </div>

          <div className="mb-6">
            <p className="text-cloud-ink/80">Break the ice with fun prompts — find team members who match the cards and mark them off. Ready?</p>
          </div>

          <div className="md:hidden mb-4">
            <ThemeToggle />
          </div>

          <div className="mt-2">
            <button
              onClick={onStart}
              className="w-full md:w-auto bg-cloud-accent text-cloud-ink font-semibold py-3 px-6 rounded-lg text-lg active:bg-cloud-accent-light transition-colors"
            >
              Start Game
            </button>
          </div>
        </div>

        {/* Right column on desktop: Board Preview + Landing Cards */}
        <div className="hidden md:flex md:flex-col md:gap-6 w-full md:w-96">
          <BoardPreview />
          <LandingCards />
        </div>
      </div>
    </div>
  )
}
