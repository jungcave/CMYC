import React from 'react';

export const IconCaret = ({
  className = '',
  style = {},
  scale = 1,
  direction = 'down',
  ...props
}) => (
  <i
    className={className}
    style={{
      ...style,
      lineHeight: 0,
      transform: `scale(${scale ?? '1'}) rotate(${direction === 'down' ? '0' : '180deg'})`,
    }}
  >
    <svg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M7 1.48779L4.70711 3.78069C4.31658 4.17121 3.68342 4.17121 3.29289 3.78069L1 1.48779'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  </i>
);
