interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]">
        <div className="mb-4">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="12" cy="12" r="10" fill="var(--seafoam)" />
            <path d="M8 12.5l2 2 4-5" stroke="var(--cloud-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-cloud-ink mb-2">BINGO!</h2>
        <p className="text-cloud-ink/80 mb-6">You completed a line!</p>

        <button
          onClick={onDismiss}
          className="w-full bg-cloud-accent text-cloud-ink font-semibold py-3 px-6 rounded-lg active:bg-cloud-accent-light transition-colors"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
