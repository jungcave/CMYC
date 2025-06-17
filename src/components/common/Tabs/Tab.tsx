import React, {memo} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties, ReactNode} from 'react';
import type {TEvent} from 'types/common';

export type TTabProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  isActive?: boolean;
  onClick?: (ev: TEvent) => void;
};

export const Tab: FC<TTabProps> = memo(
  ({className = '', style = {}, children, isActive = false, onClick}) => {
    return (
      <div
        className={`${styles.tab} ${isActive ? styles.active : ''} ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);
