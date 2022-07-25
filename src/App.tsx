import React from 'react';
import './App.css';
import Button from './components/Button';

/**
 * Util function for deep copy of nested array
 * @param nestedArr
 * @returns
 */
function deepCopy<Type>(nestedArr: Type[][]): Type[][] {
  return JSON.parse(JSON.stringify(nestedArr));
}

const player1 = 0;
const player2 = 1;

type Players = typeof player1 | typeof player2;

type GamePiece = null | Players;

type Game = GamePiece[][];

const gameOrigin = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

interface AvatarProps {
  gamePiece: GamePiece;
}

function Avatar({ gamePiece: player }: AvatarProps) {
  if (player === player1) {
    return <>💀</>;
  }
  if (player === player2) {
    return <>❤️</>;
  }

  return <>&nbsp;</>;
}

function App() {
  const neverused = '';
  const players: Players[] = [player1, player2];
  const [game, setGame] = React.useState<Game>(deepCopy(gameOrigin));
  const [currentPlayer, setCurrentPlayer] = React.useState<Players>(0);

  /**
   * Returns a closure to handle board position selected by current player
   * @param boardPosition
   * @returns closure
   */
  const handleAction = (boardPosition: number[]) => () => {
    // The position has been played, bail!
    if (game[boardPosition[0]][boardPosition[1]] !== null) {
      return;
    }
    const gameState = deepCopy(game);
    gameState[boardPosition[0]][boardPosition[1]] = currentPlayer;
    setGame(gameState);
  };

  /**
   * Resets the game state
   */
  const handleReset = () => {
    const originCopy = deepCopy(gameOrigin);
    setGame(originCopy);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>TIK TAK TOE</h1>
        <h2 className='currentPlayer'>
          Current Player: <Avatar gamePiece={currentPlayer} />
        </h2>
      </header>
      <div className='gameBoard'>
        {game.map((x, xi) =>
          x.map((y, yi) => (
            // eslint-disable-next-line react/no-array-index-key
            <Button x={xi} y={yi} action={handleAction} key={`${xi},${yi}`}>
              <Avatar gamePiece={game[xi][yi]} />
            </Button>
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
