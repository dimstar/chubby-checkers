import React from 'react';
import { PLAYER_1, PLAYER_2 } from '../../constants';
import { GamePiece } from '../../types';

interface AvatarProps {
  gamePiece: GamePiece;
}

function Avatar({ gamePiece: player }: AvatarProps): JSX.Element {
  if (player === PLAYER_1) {
    return <>💀</>;
  }
  if (player === PLAYER_2) {
    return <>❤️</>;
  }

  return <>&nbsp;</>;
}

export default Avatar;
