import React from 'react';

export const IconArrowCorner = ({
  className = '',
  style = {},
  scale = 1,
  rotate = 0,
  fill = 'black',
  ...props
}) => (
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
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.83869 1.77971C3.44877 1.77971 3.13267 1.46362 3.13267 1.07369C3.13267 0.683771 3.44877 0.367676 3.83869 0.367676H12.3109C12.7008 0.367676 13.0169 0.683771 13.0169 1.07369V9.54593C13.0169 9.93585 12.7008 10.2519 12.3109 10.2519C11.921 10.2519 11.6049 9.93585 11.6049 9.54593V2.77818L1.51384 12.8692C1.23813 13.145 0.7911 13.145 0.515382 12.8692C0.239664 12.5935 0.239664 12.1465 0.515382 11.8708L10.6064 1.77971H3.83869Z'
        fill={fill}
      />
    </svg>
  </i>
);
