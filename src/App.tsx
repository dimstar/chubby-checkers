import React from 'react';
import GameTile from './components/GameTile';
import Avatar from './components/Avatar';
import { GAME_ORIGIN, PLAYER_1, PLAYER_2 } from './constants';
import deepCopy from './utils/deepCpoy';
import { Game, GamePiece, Players } from './types';
// styles
import './App.css';
import checkWinState from './lib/checkWinState';

function App() {
  const players: Players[] = [PLAYER_1, PLAYER_2];
  const [game, setGame] = React.useState<Game>(deepCopy(GAME_ORIGIN));
  const [currentPlayer, setCurrentPlayer] = React.useState<Players>(0);
  const [winState, setWinState] = React.useState<GamePiece>(null);

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
  const handleMove = (boardPosition: number[]) => () => {
    // The position has been played, bail!
    if (game[boardPosition[0]][boardPosition[1]] !== null) {
      return;
    }
    const gameState = deepCopy(game);
    gameState[boardPosition[0]][boardPosition[1]] = currentPlayer;
    setGame(gameState);
    const winner = checkWinState(gameState, boardPosition, currentPlayer);
    if (winner !== null) {
      setWinState(winner);
    }
  };

  return (
    <div className='App'>
      <header className="App-header">
        <h1>TIK TAK TOE</h1>
        <h2 className='currentPlayer'>
          Current Player: <Avatar gamePiece={currentPlayer} />
        </h2>
        {winState === null || (
          <div className="theWinner">
            <h2 className='currentPlayer'>
              <Avatar gamePiece={currentPlayer} /> WON!
            </h2>
          </div>
        )}
      </header>
      <div className='gameBoard'>
        {game.map((x, xi) =>
          x.map((y, yi) => (
            // eslint-disable-next-line react/no-array-index-key
            <GameTile x={xi} y={yi} action={handleMove} key={`${xi},${yi}`}>
              <Avatar gamePiece={game[xi][yi]} />
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
            <Avatar gamePiece={somePlayer} />
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
