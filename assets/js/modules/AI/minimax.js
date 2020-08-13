export const minimax = (board, player, cell) => {
  let availableCells = board.filter(isEmpty);

  if (cell && player.isHuman() && hasWon(board, cell)) {
    return {
      score: 10,
    };
  } else if (cell && !player.isHuman() && hasWon(board, cell)) {
    return {
      score: -10,
    };
  } else if (availableCells.length === 0) {
    return {
      score: 0,
    };
  }

  const moves = [];

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
      cell.textContent = '';
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