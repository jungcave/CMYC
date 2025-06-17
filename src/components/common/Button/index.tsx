import React, {memo} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties, ReactNode} from 'react';
import {isString} from 'utils/primitives';
import type {TEvent} from 'types/common';

export type TButtonProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  icon?: string | React.JSX.Element;
  type?: 'default' | 'primary';
  orientation?: 'horizontal' | 'vertical';
  onClick?: (ev: TEvent) => void;
};

export const Button: FC<TButtonProps> = memo(
  ({
    className = '',
    style = {},
    children,
    icon,
    type = 'default',
    orientation = 'horizontal',
    onClick,
  }) => {
    return (
      <div
        className={`button ${styles.button} ${styles[type]} ${styles[orientation]} ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
        {!isString(icon) ? icon : <i className={icon as string} />}
      </div>
    );
  }
);
