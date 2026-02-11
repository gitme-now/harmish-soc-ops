interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cloud-base text-cloud-ink">
      <div className="text-center max-w-sm">
        <h1 className="text-4xl font-bold font-poppins mb-2">Soc Ops</h1>
        <p className="text-lg text-cloud-ink/80 mb-8">Social Bingo</p>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="font-semibold text-cloud-ink mb-3">How to play</h2>
          <ul className="text-left text-cloud-ink/80 text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-cloud-accent text-cloud-ink font-semibold py-4 px-8 rounded-lg text-lg active:bg-cloud-accent-light transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
