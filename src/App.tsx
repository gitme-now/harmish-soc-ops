import { useBingoGame } from './hooks/useBingoGame';
import { StartScreenHero } from './components/StartScreenHero';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import BackgroundHero from './components/BackgroundHero';

function App() {
  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame,
    handleSquareClick,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return (
      <>
        <BackgroundHero variant="hero" />
        <StartScreenHero onStart={startGame} />
      </>
    );
  }

  return (
    <>
      <BackgroundHero variant="default" />
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
