import React from 'react';

export const IconCircle = ({className = '', style = {}, scale = 1, rotate = 0, ...props}) => (
  <i
    className={className}
    style={{
      display: 'flex',
      alignItems: 'center',
      ...style,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
    }}
  >
    <svg
      width='55'
      height='55'
      viewBox='0 0 55 55'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='27.5' cy='27.5' r='27.5' fill='white' />
    </svg>
  </i>
);
