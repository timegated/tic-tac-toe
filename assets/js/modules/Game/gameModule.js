import { gameBoardModule } from '../UI/gameBoard.js';
import { playersFactory } from './playersFactory.js';
import {
  saveButton,
  startButton,
  refreshButton,
  settingsButton,
  settingsMenu,
  menuForm,
  aiSettings,
  humanSettings,
  aiModeButton,
  humanModeButton,
  aiPlayerX,
  aiCheckboxX,
  aiPlayerO,
  aiCheckboxO,
  cancelButton
} from '../UI/elements.js';


export const gameModule = (() => { 
  let playerX = playersFactory('Player X', 'X', true);
  let playerO = playersFactory('Player O', 'O', true);
  
  const settings = document.forms['settingsForm'];
  let activePlayer = null;
  let gameStarted = null;

  const players = [playerX, playerO];

  const toggleSlideOut = () => {
    settingsMenu.classList.toggle('cover-open');
    menuForm.classList.toggle('menu-open');
  };

  const setGameInfo = () => {
    const gameMode = settings['mode'].value;
    console.log(gameMode);
    let nameX;
    let nameO;
    let playerXType;
    let playerOType;

    if (gameMode === 'human') {
      nameX = settings['player-x'][0].value;
      nameO = settings['player-o'][0].value;

      playerXType = true;
      playerOType = true;
    };

    if (gameMode === 'ai') {
      const humanPlayer = settings['player'].value;

      nameX = settings['player-x'][1].value;
      nameO = settings['player-o'][1].value;

      if (humanPlayer === 'playerX') {
        playerXType = true;
        playerOType = false;
        nameO = 'AI';
      } else {
        playerXType = false;
        playerOType = true;
        nameX = 'AI';
      }
    }

    if (nameX === '') nameX = 'Player X';
    if (nameO === '') nameO = 'Player O';

    playerX = playersFactory(nameX, 'X', playerXType);
    playerO = playersFactory(nameO, 'O', playerOType);
  };

  const setAiPlayer = (selectedPlayer, marker, otherPlayer, input) => {
    input.checked = true;
    selectedPlayer.setAttribute('placeholder', `Player ${marker}`);
    otherPlayer.setAttribute('placeholder', 'AI');
  };

  const start = () => {
    gameStarted = true;
    gameBoardModule.clearDisplay();
    gameBoardModule.renderGameBoard();
    setCellListeners();
    players.forEach(player => {
      player.removeActiveStyle();
    });
    gameModule.activePlayer = playerX;
    gameModule.activePlayer.toggleActiveStyle();
  };

  const setCellListeners = () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener('click', function () {
        if (gameStarted) {
          if (isEmpty(cells[i])) {
            markCell(cells[i]);
            endRound(cells, cells[i])
          }
        }
      })
    }
   
  };

  const endRound = (grid, cell) => {
    if (hasWon(grid, cell)) {
      gameStarted = false;
      const winComb = getWinningComb(cell, grid);
      gameBoardModule.displayGameResult('win', winComb);
    } else if (isTie(grid)) {
      gameStarted = false;
      gameBoardModule.displayGameResult('tie');
    } else {
      toggleTurn();
    }
  };

  const toggleTurn = () => {
    if (gameModule.activePlayer === playerX) {
      gameModule.activePlayer = playerO;
    } else if (gameModule.activePlayer === playerO) {
      gameModule.activePlayer = playerX;
    }

    players.forEach(player => player.toggleActiveStyle());

    if (!gameModule.activePlayer.isHuman()) {
      makeAiMove();
    }
  };

  const isEmpty = (cell) => {
    if (!cell.textContent) {
      return true;
    }
    return false;
  };

  const markCell = (cell) => {
    cell.innerHTML = `<span class='marker'>${gameModule.activePlayer.getMarker()}</span>`;
  };

  const hasWon = (cellsArr, clickedCell) => {
    const d1 = cellsArr.filter(item => item.classList.contains('d1'));
    const d2 = cellsArr.filter(item => item.classList.contains('d2'));

    const currentRow = getCurrentRow(clickedCell, cellsArr);
    const currentColumn = getCurrentCol(clickedCell, cellsArr);

    const checkWin = (comb, cell) => {
      const marker = cell.textContent;
      let checkResult = comb.every(item => {
        if (item.textContent === marker) return true;

        return false;
      });
      return checkResult;
    };

    if (
      checkWin(currentRow, clickedCell) ||
      checkWin(currentColumn, clickedCell) ||
      checkWin(d1, clickedCell) ||
      checkWin(d2, clickedCell)
    ) return true;

    return false;
  };

  const hasSameMarker = (currentCell) => {
    const marker = gameModule.activePlayer.getMarker();
    if (currentCell.textContent === marker) return true;
  };

  const getCurrentRow = (clickedCell, cells) => {
    const topRow = cells.filter(item => item.classList.contains("top"));
    const centerRow = cells.filter(item => item.classList.contains("center"));
    const bottomRow = cells.filter(item => item.classList.contains("bottom"));

    let row;
    if (clickedCell.classList.contains("top")) {
        row = topRow;
    } else if (clickedCell.classList.contains("center")) {
        row = centerRow;
    } else if (clickedCell.classList.contains("bottom")) {
        row = bottomRow;
    }
    return row;
  };

  const getCurrentCol = (clickedCell, cells) => {
    const leftColumn = cells.filter(item => item.classList.contains("left"));
    const middleColumn = cells.filter(item => item.classList.contains("middle"));
    const rightColumn = cells.filter(item => item.classList.contains("right"));

    let column;
    if (clickedCell.classList.contains("left")) {
        column = leftColumn;
    } else if (clickedCell.classList.contains("middle")) {
        column = middleColumn;
    } else if (clickedCell.classList.contains("right")) {
        column = rightColumn;
    }
    return column;
  };

  const getWinningComb = (clickedCell, cells) => {
    const currentRow = getCurrentRow(clickedCell, cells);
    const currentColumn = getCurrentCol(clickedCell, cells);
    
    const d1 = cells.filter(item => item.classList.contains("d1"));
    const d2 = cells.filter(item => item.classList.contains("d2"));

    let winComb;
    if (currentRow.every(hasSameMarker)) {
        winComb = currentRow;
    } else if (currentColumn.every(hasSameMarker)) {
        winComb = currentColumn;
    } else if (d1.every(hasSameMarker)) {
        winComb = d1;
    } else if (d2.every(hasSameMarker)) {
        winComb = d2;
    }
    return winComb;
  };

  const isTie = (cells) => {
    let result = cells.every(function (item) {
      if (item.textContent !== '') return true;
    });

    if (result) return true;
  };
      const getBestSpot = (cells) => {
        return minimax(cells, gameModule.activePlayer).index;
    };

    const makeAiMove = () => {
            const allCells = Array.from(document.querySelectorAll(".cell"));

            let emptySpots = allCells.filter(isEmpty);

            if (emptySpots.length === 9) {
                let index = Math.floor(Math.random() * 9);
                markCell(allCells[index]);
                endRound(allCells, allCells[index]);
            } 
            else {
                let bestSpot = getBestSpot(allCells);
                markCell(bestSpot);
                endRound(allCells, bestSpot);
            }
    };

    const minimax = (board, player, cell) => {
        let availableCells = board.filter(isEmpty);

        if (cell && player.isHuman() && hasWon(board, cell)) {
            return {score: 10};
        } else if (cell && !player.isHuman() && hasWon(board, cell)) {
            return {score: -10};
        } else if (availableCells.length === 0) {
            return {score: 0};
        }

        const moves = [];
        let currentMove;
        for (let i = 0; i < availableCells.length; i++) {
            let move = {};
            currentMove = board[board.indexOf(availableCells[i])];
            move.index = currentMove;

            currentMove.textContent = player.getMarker();

            if (player == playerX) {
                let result = minimax(board, playerO, currentMove);
                move.score = result.score;
            } else if (player == playerO) {
                let result = minimax(board, playerX, currentMove);
                move.score = result.score;
            }

            availableCells.forEach((cell) => {
                cell.textContent = "";
            });

            moves.push(move);
        }

        let bestMove;
        if (!player.isHuman()) {
            let bestScore = -1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 1000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        return moves[bestMove];
    };

  saveButton.addEventListener('click', function () {
    setGameInfo();
    toggleSlideOut()
    start();
  });

  startButton.addEventListener('click', function () {
    if (!gameStarted) {
      start();
    };
  });

  refreshButton.addEventListener('click', function () {
    start();
  });

  settingsButton.addEventListener('click', function () {
    toggleSlideOut()
  });

  aiModeButton.addEventListener('click', function () {
    if (aiModeButton.checked === true) {
      aiSettings.classList.remove('hidden');
      humanSettings.classList.add('hidden');
    }
   });

  humanModeButton.addEventListener('change', function () {
    if (humanModeButton.checked === true) {
      humanSettings.classList.remove('hidden');
      aiSettings.classList.add('hidden');
    };
   });

  aiPlayerX.addEventListener('focus', function () {
    setAiPlayer(aiPlayerX, 'X', aiPlayerO, aiCheckboxX);
   });

  aiPlayerO.addEventListener('focus', function () {
    setAiPlayer(aiPlayerO, "O", aiPlayerX, aiCheckboxO);
   });

  cancelButton.addEventListener('click', function () {
    toggleSlideOut()
    humanSettings.classList.remove('hidden');
    aiSettings.classList.add('hidden');
    aiPlayerX.setAttribute('placeholder', 'Player X');
    aiPlayerO.setAttribute('placeholder', 'AI');
    settings.reset();
   });

  window.addEventListener('click', (e) => {
    if (e.target === settingsMenu) {
      toggleSlideOut()
    }   
  });

  return {
    playerX,
    playerO,
    activePlayer,
    start
  };
})();