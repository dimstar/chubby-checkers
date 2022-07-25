import React from 'react';
import logo from './logo.svg';
import './App.css';

interface ButtonProps {
  x: number;
  y: number;
  label?: string;
  action: any;
  children: React.ReactElement | string
};

function deepCopy<Type>(nestedArr: Type[][]): Type[][] {
  return JSON.parse(JSON.stringify(nestedArr));
}

const Button = ({ x, y, label, action, children }: ButtonProps) => {
  return <button className="button" type="button" onClick={action([x, y])}>{children}</button>
};

const player1 = 0;
const player2 = 1;

type Players = typeof player1 | typeof player2;

type GamePiece = null | Players;

type Game = GamePiece[][];

const gameOrigin = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

interface AvatarProps {
  gamePiece: GamePiece;
}

const Avatar = ({ gamePiece: player }: AvatarProps) => {
  if (player === player1) {
    return <>💀</>;
  }
  if (player === player2) {
    return <>❤️</>;
  }

  return <></>;
}

function App() {
  const players: Players[] = [player1, player2];
  const [game, setGame] = React.useState<Game>(deepCopy(gameOrigin));
  const [currentPlayer, setCurrentPlayer] = React.useState<Players>(0);

  const handleAction = (boardPosition: number[]) => {
    return () => {
      // The position has been played, bail!
      if (game[boardPosition[0]][boardPosition[1]] !== null) {
        return;
      }
      const gameState = deepCopy(game);
      console.log({ gameOrigin });
      gameState[boardPosition[0]][boardPosition[1]] = currentPlayer;
      setGame(gameState);
    }
  }

  const handleReset = () => {
    const originCopy = deepCopy(gameOrigin);
    setGame(originCopy);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TIK TAK TOE</h1>
        <h2 className="currentPlayer">Current Player: <Avatar gamePiece={currentPlayer} /></h2>
      </header>
      <div className="gameBoard">
        {
          game.map((x, xi) => x.map((y, yi) => {
            const label = game[xi][yi] === null ? `${xi},${yi}` : `P${game[xi][yi]}`;
            return (
              <Button
                x={xi}
                y={yi}
                action={handleAction}
                key={`${xi},${yi}`}
              >
                <Avatar gamePiece={game[xi][yi]} />
              </Button>
            );
          }))
        }
      </div>
      <div className="playerMenu">
        {players.map(somePlayer => {
          return (
            <button
              key={`${somePlayer}`}
              className="menuButton"
              type="button"
              onClick={() => setCurrentPlayer(somePlayer)}
            >
              <Avatar gamePiece={somePlayer} />
            </button>
          )
        })}
      </div>
      <div className="gameMenu">
        <button
          className="menuButton"
          type="button"
          onClick={handleReset}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;
