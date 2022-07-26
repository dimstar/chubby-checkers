import { Game, GamePiece, Players } from '../types';

const checkWinState = (
  gameboard: Game,
  move: number[],
  currentPlayer: Players
): GamePiece => {
  const n = gameboard.length;
  const [x, y] = move;
  let i = 0;

  // check row
  while (i < n) {
    if (gameboard[x][i] !== currentPlayer) {
      break;
    }

    if (i === n - 1) {
      // report win for player
      return currentPlayer;
    }

    i += 1;
  }

  return null;
};

export default checkWinState;
