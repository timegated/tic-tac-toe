import { gameBoard } from '../UI/gameBoard.js';
import { setCellListeners } from '../UI/cellListeners.js';
import { players } from '../UI/players.js';
import {
	startButtonListener,
	saveButtonListener,
	refreshListener,
	settingsButtonListener,
	aiModeListener,
	humanModeListener,
	aiXListener,
	aiOListener,
	cancelListener
} from '../UI/eventListeners.js';
import {
	gameBoardDisplay,
} from '../UI/elements.js';

const { board, renderGameBoard, clearDisplay, displayGameResult, renderDisplayMsg } = gameBoard;

export const gameModule = (() => {
	let playerX = players('Player X', 'X', true);
	let playerO = players('Player O', 'O', true);

	const playersArray = [playerX, playerO];

	const settings = document.querySelector('.settingsForm');

	let activePlayer = null;
	let gameStarted = null;

	const setGameInfo = () => {
		const gameMode = settings['mode'].value;
		let nameX;
		let playerXType;
		let nameO;
		let playerOType;

		if (gameMode === 'human') {
			nameX = settings['player-x'][0].value;
			nameO = settings['player-o'][0].value;

			playerXType = true;
			playerOType = true;
		}

		if (gameMode === 'ai') {
			const humanPlayer = settings['player'].value;

			nameX = settings['player-x'][1].value;
			nameO = settings['player-o'][1].value;

			if (humanPlayer === 'player-x') {
				playerXType = true;
				playerOType = false;
				nameO = 'AI';
			} else {
				playerXType = false;
				playerOType = true;
				nameX = 'AI';
			}
		}

		if (nameX === '') {
			nameX = 'Player X';
		}

		if (nameO === '') {
			nameO = 'Player O';
		}

		playerX = playersFactory(nameX, '#X', playerXType);
		playerO = playersFactory(nameO, '#O', playerOType);
	};

	const startGame = () => {
		gameStarted = true;
		clearDisplay(gameBoardDisplay);
		renderGameBoard(board, gameBoardDisplay);
		setCellListeners(gameStarted, isEmpty, markCell, endRound);
		playersArray.forEach((player) => {
			player.removeActiveStyle();
		});
		gameModule.activePlayer = playerX;
		gameModule.activePlayer.toggleActiveStyle();
		if (!gameModule.activePlayer.isHuman()) {
			makeAIMove();
		}
	};

	const endRound = (grid, cell) => {
		if (hasWon(grid, cell)) {
			gameStarted = false;
			const winningComb = getWinningComb(cell, grid);
			console.log(winningComb);
			displayGameResult('win', winningComb);
		} else if (isTie(grid)) {
			gameStarted = false;
			displayGameResult('tie');
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
		playersArray.forEach((player) => player.toggleActiveStyle());

		if (!gameModule.activePlayer.isHuman()) {
			makeAIMove();
		}
	};

	const getBestSpot = (cells) => {
		return minimax(cells, gameModule.activePlayer).index;
	};

	const markCell = (cell) => {
		cell.textContent = gameModule.activePlayer.getMarker();
	};

	const hasWon = (cellsArr, clickedCell) => {
		const d1 = cellsArr.filter((item) => item.classList.contains('d1'));
		const d2 = cellsArr.filter((item) => item.classList.contains('d2'));

		const currentRow = getCurrentRow(clickedCell, cellsArr);
		const currentColumn = getCurrentColumn(clickedCell, cellsArr);

		const checkWin = (comb, cell) => {
			const marker = cell.textContent;
			let checkResult = comb.every((item) => {
				if (item.textContent === marker) {
					return true;
				}
				return false;
			});
			return checkResult;
		};
		if (
			checkWin(currentRow, clickedCell) ||
			checkWin(currentColumn, clickedCell) ||
			checkWin(d1, clickedCell) ||
			checkWin(d2, clickedCell)
		) {
			return true;
		}
		return false;
	};
	const hasSameMarker = (currentCell) => {
		const marker = gameModule.activePlayer.getMarker();
		if (currentCell.textContent === marker) {
			return true;
		}
	};
	const getCurrentRow = (clickedCell, cells) => {
		const topRow = cells.filter((item) => item.classList.contains('top'));
		const centerRow = cells.filter((item) => item.classList.contains('center'));
		const bottomRow = cells.filter((item) => item.classList.contains('bottom'));

		let row;
		if (clickedCell.classList.contains('top')) {
			row = topRow;
		} else if (clickedCell.classList.contains('center')) {
			row = centerRow;
		} else if (clickedCell.classList.contains('bottom')) {
			row = bottomRow;
		}
		return row;
	};
	const getCurrentColumn = (clickedCell, cells) => {
		const leftColumn = cells.filter((item) => item.classList.contains('left'));
		const middleColumn = cells.filter((item) => item.classList.contains('middle'));
		const rightColumn = cells.filter((item) => item.classList.contains('right'));

		let column;
		if (clickedCell.classList.contains('left')) {
			column = leftColumn;
		} else if (clickedCell.classList.contains('middle')) {
			column = middleColumn;
		} else if (clickedCell.classList.contains('right')) {
			column = rightColumn;
		}
		return column;
	};
	
	const getWinningComb = (clickedCell, cells) => {
		const currentRow = getCurrentRow(clickedCell, cells);
		const currentColumn = getCurrentColumn(clickedCell, cells);
		let winningComb;
		const d1 = cells.filter((item) => item.classList.contains('d1'));
		const d2 = cells.filter((item) => item.classList.contains('d2'));

		if (currentRow.every(hasSameMarker)) {
			winningComb = currentRow;
		} else if (currentColumn.every(hasSameMarker)) {
			winningComb = currentColumn;
		} else if (d1.every(hasSameMarker)) {
			winningComb = d1;
		} else if (d2.every(hasSameMarker)) {
			winningComb = d2;
		}
		return winningComb;
	};

	const isEmpty = (cell) => {
		if (!cell.textContent) return true;
		return false;
	};

	const isTie = (cells) => {
		let result = cells.every(function (item) {
			if (item.textContent !== '') {
				return true;
			}
		});

		if (result) {
			return true;
		}
	};
	
	const setAiPlayer = (selectedPlayer, marker, otherPlayer, input) => {
  input.checked = true;
  selectedPlayer.setAttribute('placeholder', `Player ${marker}`);
  otherPlayer.setAttribute('placeholder', 'AI');
	};

	saveButtonListener(setGameInfo, startGame);
	refreshListener(startGame)
	settingsButtonListener();

	return {
		playerX,
		playerO,
		activePlayer,
		startGame
	};
})();
