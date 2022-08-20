import { Game } from '../types';

// Players
const PLAYER_1 = 0;
const PLAYER_2 = 1;

// The game board dimensions and starting values
const GAME_ORIGIN: Game = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null]
];

const PLAYER_1_START = [
  [0, 0],
  [0, 2]
];
const PLAYER_2_START = [
  [3, 1],
  [3, 3]
];

// eslint-disable-next-line import/prefer-default-export
export { GAME_ORIGIN, PLAYER_1, PLAYER_2, PLAYER_1_START, PLAYER_2_START };
