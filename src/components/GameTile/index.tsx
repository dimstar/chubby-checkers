import React from 'react';

interface GameTileProps {
  x: number;
  y: number;
  // eslint-disable-next-line no-empty-pattern
  action: ([]) => () => void;
  children: React.ReactElement | string;
}

function GameTile({ x, y, action, children }: GameTileProps) {
  return (
    <button className='button' type='button' onClick={action([x, y])}>
      {children}
    </button>
  );
}

export default GameTile;
