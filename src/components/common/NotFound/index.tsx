import {IconSearch} from 'components/aux/icons/Search';
import React, {memo} from 'react';
import type {CSSProperties, FC} from 'react';

export type TNotFoundProps = {
  className?: string;
  style?: CSSProperties;
  message?: string;
};

export const NotFound: FC<TNotFoundProps> = memo(
  ({className = '', style = {}, message = '404'}) => {
    const {color = 'white'} = style;
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: 'fit-content',
          height: '320px',
          fontSize: '200px',
          userSelect: 'none',
          color,
          ...style,
        }}
      >
        <div style={{display: 'flex', alignItems: 'center'}}>
          <IconSearch fill={color} />
          <i style={{position: 'relative', left: -30, transform: 'scale(0.9)'}}>?</i>
        </div>
        <span style={{fontSize: '0.5em', textAlign: 'center'}}>{message}</span>
      </div>
    );
  }
);
