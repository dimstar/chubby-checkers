import React from 'react';
import { PLAYER_1, PLAYER_2 } from '../../constants';
import { GameTileState } from '../../types';

interface AvatarProps {
  player: GameTileState;
}

function Avatar({ player }: AvatarProps): JSX.Element {
  if (player === PLAYER_1) {
    return <>💀</>;
  }
  if (player === PLAYER_2) {
    return <>❤️</>;
  }

  return <>&nbsp;</>;
}

export default Avatar;
