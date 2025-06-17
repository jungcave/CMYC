import React from 'react';

export const IconPlus = ({className = '', style = {}, scale = 1, rotate = 0, ...props}) => (
  <i
    className={className}
    style={{
      display: 'flex', alignItems: 'center',
      ...style,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
    }}
  >
    <svg
      width='26'
      height='26'
      viewBox='0 0 26 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M13.0366 0.499268V25.4584' stroke='white' strokeWidth='2.33992' />
      <path d='M25.5161 12.9788L0.557016 12.9788' stroke='white' strokeWidth='2.33992' />
    </svg>
  </i>
);
