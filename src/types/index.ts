import { PLAYER_1, PLAYER_2 } from '../constants';

export type Players = typeof PLAYER_1 | typeof PLAYER_2;

export type GameTileState = null | Players | 'kill';

export type Game = GameTileState[][];
