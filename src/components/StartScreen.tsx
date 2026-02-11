import { LandingCards } from './LandingCards'
import { ThemeToggle } from './ThemeToggle'

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cloud-base text-cloud-ink">
      <div className="w-full max-w-3xl flex flex-col md:flex-row items-start gap-8">
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

          <div className="mb-6">
            <p className="text-cloud-ink/80">Break the ice with fun prompts — find team members who match the cards and mark them off. Ready?</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <button
              onClick={onStart}
              type="button"
              className="w-full sm:w-auto bg-cloud-accent text-cloud-ink font-semibold py-3 px-6 rounded-lg text-lg active:bg-cloud-accent-light transition-colors focus:outline-none focus:ring-2 focus:ring-cloud-accent/50 focus:ring-offset-2"
            >
              Start Game
            </button>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="w-full md:w-96">
          <LandingCards />
        </div>
      </div>
    </div>
  )
}
