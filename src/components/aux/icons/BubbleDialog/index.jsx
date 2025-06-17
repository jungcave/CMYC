import React from 'react';

export const IconBubleDialog = ({className = '', style = {}, scale = 1, isActive, ...props}) => (
  <i className={className} style={{...style, transform: `scale(${scale})`}}>
    <svg
      width='45'
      height='45'
      viewBox='0 0 45 45'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M21.7445 44.1595C33.3364 44.1595 42.7334 34.7548 42.7334 23.1536C42.7334 11.5524 33.3364 2.14771 21.7445 2.14771C10.1527 2.14771 0.755661 11.5524 0.755661 23.1536C0.755661 26.5139 1.54403 29.6899 2.94577 32.5064C3.31827 33.2549 3.44225 34.1104 3.2263 34.9182L1.97618 39.5942C1.4335 41.624 3.28905 43.4811 5.31727 42.938L9.98947 41.6868C10.7966 41.4707 11.6514 41.5948 12.3993 41.9676C15.2136 43.3705 18.387 44.1595 21.7445 44.1595Z'
        fill='white'
      />
      {isActive && <circle cx='37' cy='8.08569' r='8' fill='#FF0000' />}
    </svg>
  </i>
);
