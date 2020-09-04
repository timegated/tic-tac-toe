export const setCellListeners = (gameStarted, empty, mark, end) => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (e) {
      if (gameStarted) {
        if (empty(cells[i])) {
          mark(cells[i]);
          end(cells, cells[i]);
        }
      }
    });
  }
};
