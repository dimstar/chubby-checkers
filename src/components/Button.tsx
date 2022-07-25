import React from 'react';

interface ButtonProps {
  x: number;
  y: number;
  // eslint-disable-next-line no-empty-pattern
  action: ([]) => () => void;
  children: React.ReactElement | string;
}

function Button({ x, y, action, children }: ButtonProps) {
  return (
    <button className='button' type='button' onClick={action([x, y])}>
      {children}
    </button>
  );
}

export default Button;
