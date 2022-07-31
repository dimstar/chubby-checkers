import React from 'react';
import { isEqual } from 'lodash';
import GameTile from './components/GameTile';
import Avatar from './components/Avatar';
import { GAME_ORIGIN, PLAYER_1, PLAYER_2 } from './constants';
import deepCopy from './utils/deepCpoy';
import { Game, GameTileState, Players } from './types';
// import checkWinState from './lib/checkWinState';

// styles
import './App.css';

const possibleMoves = {
  nw: { x: -1, y: -1 },
  ne: { x: 1, y: -1 },
  se: { x: 1, y: 1 },
  sw: { x: -1, y: 1 }
};

const possibleAttacks = {
  nw: { x: -2, y: 2 },
  ne: { x: 2, y: 2 },
  se: { x: 2, y: 2 },
  sw: { x: -2, y: 2 }
};

function App() {
  const players: Players[] = [PLAYER_1, PLAYER_2];
  const [game, setGame] = React.useState<Game>(deepCopy(GAME_ORIGIN));
  const [currentPlayer, setCurrentPlayer] = React.useState<Players>(0);
  const [winState, setWinState] = React.useState<GameTileState>(null);
  const [activePiece, setActivePiece] = React.useState<GameTileState[]>([
    null,
    null
  ]);

  /**
   * Resets the game state
   */
  const handleReset = () => {
    const originCopy = deepCopy(GAME_ORIGIN);
    setGame(originCopy);
    setWinState(null);
  };

  /**
   * Returns a closure to handle board position selected by current player
   * @param boardPosition
   * @returns closure
   */
  const handleMove = (attemptCoords: number[]) => {
    // The position has been played, bail!
    if (game[attemptCoords[0]][attemptCoords[1]] !== null) {
      return;
    }

    const gameState = deepCopy(game);

    // check for any valid move
    Object.entries(possibleMoves).forEach(([dr, checkMove]) => {
      const ax = activePiece[0];
      const ay = activePiece[1];
      if (ax === null || ay === null) {
        return;
      }
      // if move is invalid, do nothing
      if (!isEqual(attemptCoords, [checkMove.x + ax, checkMove.y + ay])) {
        return;
      }
      // Move was valid, change game state and clear the active piece
      gameState[ax][ay] = null;
      gameState[attemptCoords[0]][attemptCoords[1]] = currentPlayer;
      setGame(gameState);
      setActivePiece([null, null]);
    });

    // TODO: must reimplement win state logic
    // const winner = checkWinState(gameState, boardPosition, currentPlayer);
    // if (winner !== null) {
    //   setWinState(winner);
    // }
  };

  const handleActivePiece = (pieceCoords: GameTileState[]) => () => {
    if (pieceCoords[0] === null || pieceCoords[1] === null) {
      return;
    }
    if (game[pieceCoords[0]][pieceCoords[1]] === currentPlayer) {
      setActivePiece(pieceCoords);
      return;
    }

    const coordsOnly = [pieceCoords[0], pieceCoords[1]];
    handleMove(coordsOnly);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>TIK TAK TOE</h1>
        <h2 className='currentPlayer'>
          Current Player: <Avatar player={currentPlayer} />
          <br />
          Current Piece: {activePiece[0]},{activePiece[1]}
        </h2>
        {winState === null || (
          <div className='theWinner'>
            <h2 className='currentPlayer'>
              <Avatar player={currentPlayer} /> WON!
            </h2>
          </div>
        )}
      </header>
      <div className='gameBoard'>
        {game.map((x, xi) =>
          x.map((y, yi) => (
            <GameTile
              x={xi}
              y={yi}
              action={handleActivePiece}
              // eslint-disable-next-line react/no-array-index-key
              key={`${xi},${yi}`}
              active={isEqual(activePiece, [xi, yi])}
            >
              <Avatar player={game[xi][yi]} />
            </GameTile>
          ))
        )}
      </div>
      <div className='playerMenu'>
        {players.map((somePlayer) => (
          <button
            key={`${somePlayer}`}
            className='menuButton'
            type='button'
            onClick={() => setCurrentPlayer(somePlayer)}
            disabled={winState !== null}
          >
            <Avatar player={somePlayer} />
          </button>
        ))}
      </div>
      <div className='gameMenu'>
        <button className='menuButton' type='button' onClick={handleReset}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
