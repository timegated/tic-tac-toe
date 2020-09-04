export const startGame = () => {
  gameStarted = true;
  gameBoardModule.clearDisplay();
  gameBoardModule.renderGameBoard();
  setCellListeners();
  playersArray.forEach((player) => {
    player.removeActiveStyle();
  });
  gameModule.activePlayer = playerX;
  gameModule.activePlayer.toggleActiveStyle();
  if (!gameModule.activePlayer.isHuman()) {
    makeAIMove();
  }
};