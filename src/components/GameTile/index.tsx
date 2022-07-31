import React from 'react';

interface GameTileProps {
  x: number;
  y: number;
  // eslint-disable-next-line no-empty-pattern
  action: ([]) => () => void;
  children: React.ReactElement | string;
  active: boolean;
}

function GameTile({ x, y, action, active, children }: GameTileProps) {
  return (
    <button
      className={`button ${active ? 'active' : ''}`}
      type='button'
      onClick={action([x, y])}
    >
      {children}
    </button>
  );
}

export default GameTile;
