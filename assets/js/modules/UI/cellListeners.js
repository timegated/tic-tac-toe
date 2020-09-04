export const setCellListeners = () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (e) {
      if (gameStarted) {
        if (isEmpty(cells[i])) {
          markCell(cells[i]);
          endRound(cells, cells[i]);
        }
      }
    });
  }
};
