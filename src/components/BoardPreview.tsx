/**
 * BoardPreview - A decorative, non-interactive preview of a bingo board
 * Used on the landing screen to showcase the game visually
 */

interface PreviewSquare {
  text: string;
  isFreeSpace: boolean;
}

export function BoardPreview() {
  // Static 3x3 preview grid with sample prompts
  const previewSquares: PreviewSquare[] = [
    { text: 'Has a pet', isFreeSpace: false },
    { text: 'Speaks 2+ languages', isFreeSpace: false },
    { text: 'Coffee lover', isFreeSpace: false },
    { text: 'Loves hiking', isFreeSpace: false },
    { text: 'FREE SPACE', isFreeSpace: true },
    { text: 'Plays instrument', isFreeSpace: false },
    { text: 'Morning person', isFreeSpace: false },
    { text: 'Reads sci-fi', isFreeSpace: false },
    { text: 'Night owl', isFreeSpace: false },
  ];

  // Reuse styling patterns from BingoSquare
  const baseClasses =
    'flex items-center justify-center p-1.5 text-center border border-gray-300 rounded transition-all duration-150 select-none min-h-[48px] text-[10px] leading-tight';

  return (
    <div
      className="w-full max-w-[280px] mx-auto"
      aria-hidden="true"
      role="presentation"
    >
      {/* Preview label */}
      <div className="text-center mb-2 text-cloud-ink/60 text-xs font-medium">
        Preview
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-1 motion-safe:animate-cloud-slow">
        {previewSquares.map((square, index) => {
          // Center square (index 4) is the free space - show as marked
          const isMarked = square.isFreeSpace;

          const stateClasses = isMarked
            ? 'bg-seafoam border-seafoam text-cloud-ink/90 font-bold text-xs'
            : 'bg-white text-cloud-ink/70';

          return (
            <div
              key={index}
              className={`${baseClasses} ${stateClasses}`}
            >
              <span className="wrap-break-word hyphens-auto">
                {square.text}
              </span>
              {isMarked && (
                <span className="absolute top-0.5 right-0.5 text-cloud-ink text-xs">
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Subtle hint text */}
      <div className="text-center mt-2 text-cloud-ink/50 text-[10px]">
        Mark squares as you meet teammates
      </div>
    </div>
  );
}
