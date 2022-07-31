import { Game } from "../types";

// Players
const PLAYER_1 = 0;
const PLAYER_2 = 1;

// The game board dimensions and starting values
const GAME_ORIGIN: Game = [
  [null, null, null, null],
  [null, null, null, null],
  [null, null, PLAYER_2, null],
  [null, PLAYER_1, null, null]
];

// eslint-disable-next-line import/prefer-default-export
export { GAME_ORIGIN, PLAYER_1, PLAYER_2 };
