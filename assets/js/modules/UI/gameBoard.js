export const gameBoard = (() => {
	const board = [
		{
			row: 'top',
			column: 'left',
			d1: 'd1',
		},
		{
			row: 'top',
			column: 'middle',
		},
		{
			row: 'top',
			column: 'right',
			d2: 'd2',
		},
		{
			row: 'center',
			column: 'left',
		},
		{
			row: 'center',
			column: 'middle',
			d1: 'd1',
			d2: 'd2',
		},
		{
			row: 'center',
			column: 'right',
		},
		{
			row: 'bottom',
			column: 'left',
			d2: 'd2',
		},
		{
			row: 'bottom',
			column: 'middle',
		},
		{
			row: 'bottom',
			column: 'right',
			d1: 'd1',
		},
	]
	const renderGameBoard = (arr, el) => {
		for (let i = 0; i < arr.length; i++) {
			const cell = document.createElement('div');
			cell.classList.add('cell', arr[i].row, arr[i].column);
			if (arr[i].d1) {
				cell.classList.add(arr[i].d1);
				if (arr[i].d2) {
					cell.classList.add(arr[i].d2);
				}
			} else if (arr[i].d2) {
				cell.classList.add(arr[i].d2);
			}

			cell.setAttribute('id', i);
			el.appendChild(cell);
		}
	}

	const clearDisplay = (arr) => {
		while (arr.firstChild) {
			arr.removeChild(arr.firstChild);
		}
	}

	const renderDisplayMsg = (display, msgEl, outcome = null) => {
		display.clearDisplay();
		if (outcome === 'win') {
			msgEl.textContent = `${gameModule.activePlayer.getName()} won!`;
		} else if (outcome === 'draw') {
			msgEl.textContent = `It's a tie`;
		}
		display.appendChild(msgEl);
	}
	
  const displayGameResult = (gameResult, row=null) => {
    if(row) {
      row.forEach((cell) => cell.classList.add('win'));
      setTimeout(() => this.renderDisplayMsg(gameResult), 1000);
    }
	}
	return {
		board,
		renderGameBoard,
		clearDisplay,
		renderDisplayMsg,
		displayGameResult
	}
})();
