import React from 'react'
import { useBingoGame } from './hooks/useBingoGame';
import { StartScreenHero } from './components/StartScreenHero';
import { GameScreen } from './components/GameScreen';
import { BingoModal } from './components/BingoModal';
import BackgroundHero from './components/BackgroundHero';
import CardDeck from './components/CardDeck';

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

  const [showCardDeck, setShowCardDeck] = React.useState(false)

  if (gameState === 'start') {
    return (
      <>
        <BackgroundHero variant="hero" />
        <StartScreenHero onStart={startGame} onOpenCardDeck={() => setShowCardDeck(true)} />
        {showCardDeck && <CardDeck onClose={() => setShowCardDeck(false)} />}
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
