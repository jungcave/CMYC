import React from 'react';

export const IconButtonPlus = ({className = '', style = {}, scale = 1, rotate = 0, ...props}) => (
  <i
    className={className}
    style={{
      ...style,
      transform: `scale(${scale}) rotate(${rotate}deg)`,
    }}
  >
    <svg
      width='77'
      height='40'
      viewBox='0 0 77 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect width='77' height='39.68' rx='19.84' fill='#000FFF' />
      <path d='M30.74 21.12V18.56H46.26V21.12H30.74ZM37.14 12H39.86V27.68H37.14V12Z' fill='white' />
    </svg>
  </i>
);
