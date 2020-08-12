import board from './gameBoard';

class Player {
  constructor(max_depth = -1) {
    this.max_depth = max_depth;
    this.nodes_map = new Map();
  }
  getBestMove(board, maximizing = true, callback = () => {}, depth = 0) {
    if (depth == 0) this.nodes_map.clear();

    if (board.isTerminal() || depth == this.max_depth) {
      if (board.isTerminal().winner == 'x') {
        return 100 - depth;
      } else if (board.isTerminal().winner == 'o') {
        return -100 + depth;
      }
      return 0;
    }
  };
};