import { Game, GamePiece, Players } from '../types';

// Shout out to this! https://stackoverflow.com/a/1056352

const checkWinState = (
  gameboard: Game,
  move: number[],
  currentPlayer: Players
): GamePiece => {
  const n = gameboard.length;
  const [x, y] = move;
  let i = 0;

  // check rows
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

  // reset the index
  i = 0;

  // check cols
  while (i < n) {
    if (gameboard[i][y] !== currentPlayer) {
      break;
    }

    if (i === n - 1) {
      // report win for player
      return currentPlayer;
    }

    i += 1;
  }

  // reset the index
  i = 0;

  // check diagnal
  if (x === y) {
    while (i < n) {
      if (gameboard[i][i] !== currentPlayer) {
        break;
      }

      if (i === n - 1) {
        // report win for player
        return currentPlayer;
      }

      i += 1;
    }
  }

  // reset the index
  i = 0;

  // check anti diagnal
  if (x + y === n - 1) {
    while (i < n) {
      if (gameboard[i][n - 1 - i] !== currentPlayer) {
        break;
      }

      if (i === n - 1) {
        // report win for player
        return currentPlayer;
      }

      i += 1;
    }
  }

  return null;
};

export default checkWinState;
