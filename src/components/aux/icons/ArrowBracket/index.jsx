import React from 'react';

export const IconArrowBracket = ({className = '', style = {}, scale = 1, rotate = 0, ...props}) => (
  <i className={className} style={{...style}}>
    <svg
      width='13'
      height='31'
      viewBox='0 0 13 31'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{transform: `scale(${scale}) rotate(${rotate}deg)`}}
      {...props}
    >
      <path
        d='M10.9829 29.0269L1.90827 16.1711C1.51231 15.6102 1.51231 14.8607 1.90827 14.2998L10.9829 1.44401'
        stroke='black'
        strokeOpacity='0.13'
        strokeWidth='2.43378'
        strokeLinecap='round'
      />
    </svg>
  </i>
);
