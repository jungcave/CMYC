import React, {memo, useState} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties, ReactNode} from 'react';
import {IconCheck} from 'components/aux/icons/Check';

export type TCheckerProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  type?: 'checkbox' | 'radio';
};

export const Checker: FC<TCheckerProps> = memo(
  ({className = '', style = {}, type = 'radio', children}) => {
    const [wasChecked, setWasChecked] = useState(false);

    const handleClick = (ev) => {
      setWasChecked((wasChecked) => !wasChecked);
    };

    return (
      <div className={`${styles.checker} ${className}`} style={style} onClick={handleClick}>
        <input className='hidden' type={type} />
        <div className={`${styles.input} ${wasChecked ? styles.checked : ''}`}>
          <IconCheck />
        </div>
        {children}
      </div>
    );
  }
);
