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
import findMoves from './lib/findMoves';

function App() {
  const players: Players[] = [PLAYER_1, PLAYER_2];
  const [game, setGame] = React.useState<Game>(deepCopy(GAME_ORIGIN));
  const [currentPlayer, setCurrentPlayer] = React.useState<Players>(PLAYER_1);
  const [possibleMoves, setPossibleMoves] = React.useState<Game>(GAME_ORIGIN);
  const [opponent, setOpponent] = React.useState<Players>(PLAYER_2);
  const [winState, setWinState] = React.useState<GameTileState>(null);
  const [activePiece, setActivePiece] = React.useState<number[]>();

  /**
   * Resets the game state
   */
  const handleReset = () => {
    const originCopy = deepCopy(GAME_ORIGIN);
    setCurrentPlayer(PLAYER_1);
    setGame(originCopy);
    setWinState(null);
  };

  const handleActivePiece = (pieceCoords: number[]) => {
    const coordsOnly = [pieceCoords[0], pieceCoords[1]];
    console.log({ coordsOnly, activePiece });
    const newGameState = deepCopy(game);

    if (activePiece) {
      game.forEach((x, xi) =>
        x.forEach((y, yi) => {
          if (
            isEqual(coordsOnly, [xi, yi]) &&
            possibleMoves[xi][yi] === currentPlayer
          ) {
            newGameState[xi][yi] = currentPlayer;
            newGameState[activePiece[0]][activePiece[1]] = null;
            setActivePiece([xi, yi]);
            setPossibleMoves((gameState) => {
              const moves = findMoves(
                currentPlayer,
                opponent,
                pieceCoords,
                gameState
              );
              console.log({ moves });
              return moves;
            });
          }
        })
      );
    }

    setGame(newGameState);

    if (pieceCoords[0] === null || pieceCoords[1] === null) {
      return;
    }
    if (game[pieceCoords[0]][pieceCoords[1]] === currentPlayer) {
      setActivePiece(pieceCoords);
      setPossibleMoves((gameState) => {
        const moves = findMoves(
          currentPlayer,
          opponent,
          pieceCoords,
          gameState
        );
        console.log({ moves });
        return moves;
      });
    }

    // setActivePiece([...newCoords]);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>CHUBBY CHECKERS</h1>
        <h2 className='currentPlayer'>
          Current Player: <Avatar player={currentPlayer} />
          <br />
          Current Piece: {!activePiece || activePiece[0]},
          {!activePiece || activePiece[1]}
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
            onClick={() => {
              setCurrentPlayer(somePlayer);
              setOpponent(somePlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
            }}
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
