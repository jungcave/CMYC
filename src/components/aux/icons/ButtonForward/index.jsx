import React from 'react';

export const IconButtonForward = ({
  className = '',
  style = {},
  fill = '#000FFF',
  scale = 1,
  ...props
}) => (
  <i className={className} style={{...style, transform: `scale(${scale})`}}>
    <svg
      width='77'
      height='38'
      viewBox='0 0 77 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g filter='url(#filter0_b_0_387)'>
        <rect width='77' height='37.5' rx='18.75' fill={fill} />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M39.9697 12.2197C40.2626 11.9268 40.7374 11.9268 41.0303 12.2197L47.0303 18.2197C47.3232 18.5126 47.3232 18.9874 47.0303 19.2803L41.0303 25.2803C40.7374 25.5732 40.2626 25.5732 39.9697 25.2803C39.6768 24.9874 39.6768 24.5126 39.9697 24.2197L44.6893 19.5H30.5C30.0858 19.5 29.75 19.1642 29.75 18.75C29.75 18.3358 30.0858 18 30.5 18H44.6893L39.9697 13.2803C39.6768 12.9874 39.6768 12.5126 39.9697 12.2197Z'
          fill='white'
        />
      </g>
      <defs>
        <filter
          id='filter0_b_0_387'
          x='-25'
          y='-25'
          width='127'
          height='87.5'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImageFix' stdDeviation='12.5' />
          <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_0_387' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_backgroundBlur_0_387'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  </i>
);
