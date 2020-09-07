export const gameBoardModule = (() => { 
	const gameBoardDisplay = document.querySelector('#gameboard');
	console.log(gameBoardDisplay.firstChild);
	const gameBoard = [
		{row: "top", column: "left", d1: "d1"},
		{row: "top", column: "middle",},
		{row: "top", column: "right", d2: "d2",},
		{row: "center", column: "left",},
		{row: "center", column: "middle", d1: "d1", d2: "d2",},
		{row: "center", column: "right",},
		{row: "bottom", column: "left", d2: "d2",},
		{row: "bottom", column: "middle",},
		{row: "bottom", column: "right", d1: "d1",},
	];
	
	const renderGameBoard = () => {
		for (let i = 0; i < gameBoard.length; i++) {
			const cell = document.createElement('div');
			console.log(cell)
			cell.classList.add('cell', gameBoard[i].row, gameBoard[i].column);
			if (gameBoard[i].d1) cell.classList.add(gameBoard[i].d1);
			if (gameBoard[i].d2) cell.classList.add(gameBoard[i].d2);
			cell.setAttribute('id', i);
			gameBoardDisplay.appendChild(cell);
		};
	};

	const clearDisplay = () => {
		while (gameBoardDisplay.firstChild) {
			gameBoardDisplay.removeChild(gameBoardDisplay.firstchild);
		}
	};

	return {
		gameBoard,
		gameBoardDisplay,
		renderGameBoard,
		clearDisplay
	}
})();