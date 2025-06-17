import React from 'react';

export const IconCheck = ({
  className = '',
  style = {},
  scale = 1,
  rotate = 0,
  fill = 'white',
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
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' height="20" width="20" {...props}>
      <path fill={fill} d='M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z' />
    </svg>
  </i>
);
