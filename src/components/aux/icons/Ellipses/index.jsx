import React from 'react';

export const IconEllipses = ({
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
    <svg
      width='36'
      height='11'
      viewBox='0 0 36 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='5.06937' cy='5.34448' r='5.04544' fill={fill} />
      <circle cx='17.9634' cy='5.34445' r='5.04544' fill={fill} />
      <circle cx='30.8572' cy='5.34445' r='5.04544' fill={fill} />
    </svg>
  </i>
);
