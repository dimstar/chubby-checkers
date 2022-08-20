import { isEqual } from 'lodash';
import { GAME_ORIGIN } from '../constants';
import { GameTileState, Players } from '../types';
import deepCopy from '../utils/deepCpoy';

interface Direction {
  x: number;
  y: number;
}

interface Directions {
  nw: Direction;
  ne: Direction;
  se: Direction;
  sw: Direction;
}

const possibleMoves: Directions = {
  nw: { x: -1, y: -1 },
  ne: { x: 1, y: -1 },
  se: { x: 1, y: 1 },
  sw: { x: -1, y: 1 }
};

const possibleAttacks: Directions = {
  nw: { x: -2, y: -2 },
  ne: { x: 2, y: -2 },
  se: { x: 2, y: 2 },
  sw: { x: -2, y: 2 }
};

/**
 * Returns a closure to handle board position selected by current player
 */
function findMoves(
  currentPlayer: Players,
  opponent: Players,
  activePiece: number[],
  gameState: GameTileState[][]
): GameTileState[][] {
  const newGameState = deepCopy(GAME_ORIGIN);

  gameState.forEach((x, xi) =>
    x.forEach((y, yi) => {
      const attemptCoords = [xi, yi];
      // check for any valid move
      (Object.keys(possibleMoves) as (keyof typeof possibleMoves)[]).forEach(
        (dr) => {
          const checkMove = possibleMoves[dr];
          const checkAttack = possibleAttacks[dr];
          const ax = activePiece[0];
          const ay = activePiece[1];
          // null check
          if (ax === null || ay === null) {
            return;
          }
          // ignore out of bounds
          if (newGameState[possibleMoves[dr].x + ax] === undefined) {
            return;
          }
          if (
            newGameState[possibleMoves[dr].x + ax][possibleMoves[dr].y + ay] ===
            undefined
          ) {
            return;
          }
          // if spot it occupied, check attack
          if (gameState[checkMove.x + ax][checkMove.y + ay] === opponent) {
            // if attack is valid, set player
            if (
              isEqual(attemptCoords, [checkAttack.x + ax, checkAttack.y + ay])
            ) {
              console.log('attack!');
              newGameState[ax][ay] = null;
              newGameState[attemptCoords[0]][attemptCoords[1]] = currentPlayer;
              newGameState[checkMove.x + ax][checkMove.y + ay] = 'kill';
            }
            return;
          }

          // if move is valid, set player
          if (isEqual(attemptCoords, [checkMove.x + ax, checkMove.y + ay])) {
            newGameState[ax][ay] = null;
            newGameState[attemptCoords[0]][attemptCoords[1]] = currentPlayer;
          }
        }
      );
    })
  );

  return newGameState;
}

export default findMoves;
