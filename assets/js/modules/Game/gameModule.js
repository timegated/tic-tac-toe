import players from '../players.js';

const gameModule = () => {
	let playerOne = players('Player X', 'X', true);
	let playerTwo = players('Player O', 'O', true);

	const playersArray = [playerOne, playerTwo];

	const settings = document.form['settingsForm'];

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

		playerX = playersFactory(nameX, 'X', playerXType);
		playerO = playersFactory(nameO, 'O', playerOType);
	};
	
	const saveButton = document.querySelector('#save');
	saveButton.addEventListener('click', function () {
		setGameInfo();
		document.querySelector('.settings-menu').classList.add('hidden');
		startGame();
	});

	const endRound = (grid, cell) => {
		if (hasWon(grid, cell)) {
			gameStarted = false;
			const winningComb = getWinningComb(cell, grid);
			gameBoardModule.displayGameResult('win', winningComb);
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
		chalkSound.currentTime = 0;
		chalkSound.play();
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
	const startButton = document.querySelector('#play');
	startButton.addEventListener('click', function () {
		if (!gameStarted) {
			clearSound.play();
			startGame();
		}
	});

	const refreshButton = document.querySelector('#restart');
	refreshButton.addEventListener('click', function () {
		clearSound.currentTime = 0;
		clearSound.play();
		startGame();
	});

	const settingsButton = document.querySelector('#settings');
	const settingsMenu = document.querySelector('.settings-menu');
	settingsButton.addEventListener('click', function () {
		settingsMenu.classList.remove('hidden');
	});

	const aiSettings = document.querySelector('.ai-mode');
	const humanSettings = document.querySelector('.human-mode');

	const aiModeButton = document.getElementById('ai');
	aiModeButton.addEventListener('change', function () {
		if (aiModeButton.checked === true) {
			aiSettings.classList.remove('hidden');
			humanSettings.classList.add('hidden');
		}
	});

	const humanModeButton = document.getElementById('human');
	humanModeButton.addEventListener('change', function () {
		if (humanModeButton.checked === true) {
			humanSettings.classList.remove('hidden');
			aiSettings.classList.add('hidden');
		}
	});

	const setAiPlayer = (selectedPlayer, marker, otherPlayer, input) => {
		input.checked = true;
		selectedPlayer.setAttribute('placeholder', `Player ${marker}`);
		otherPlayer.setAttribute('placeholder', 'AI');
	};
	const aiPlayerX = document.querySelector('.ai-x');
	const aiCheckboxX = document.querySelector('#ai-player-x');
	aiPlayerX.addEventListener('focus', () => {
		setAiPlayer(aiPlayerX, 'X', aiPlayerO, aiCheckboxX);
	});

	const aiPlayerO = document.querySelector('.ai-o');
	const aiCheckboxO = document.querySelector('#ai-player-o');
	aiPlayerO.addEventListener('focus', () => {
		setAiPlayer(aiPlayerO, 'O', aiPlayerX, aiCheckboxO);
	});

	const cancelButton = document.querySelector('#cancel');
	cancelButton.addEventListener('click', function () {
		settingsMenu.classList.add('hidden');
		humanSettings.classList.remove('hidden');
		aiSettings.classList.add('hidden');
		aiPlayerX.setAttribute('placeholder', 'Player X');
		aiPlayerO.setAttribute('placeholder', 'AI');
		settings.reset();
	});

	return {
		playerX,
		playerO,
		activePlayer,
		startGame,
	};
};
