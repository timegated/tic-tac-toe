import gameBoard from './modules/UI/gameBoard.js';
import { gameBoardDisplay, displayMessage } from './modules/UI/elements.js';

const { board, renderGameBoard } = gameBoard;

console.log(gameBoard);

renderGameBoard(board, gameBoardDisplay);
