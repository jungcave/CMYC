import React from 'react';

export const XmarkIcon = ({className = '', style = {}, scale = 1, ...props}) => (
  <i className={className} style={{...style, transform: `scale(${scale})`}}>
    <svg
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M1 1L13.5 13.5' stroke='#C2C2C2' strokeLinecap='round' />
      <path d='M13.5 1L1 13.5' stroke='#C2C2C2' strokeLinecap='round' />
    </svg>
  </i>
);
