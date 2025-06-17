import React, {memo} from 'react';
import styles from './style.module.scss';
import type {FC} from 'react';
import {Card, type TCardProps} from '../index';

export type TFlatCardProps = TCardProps;

export const FlatCard: FC<TFlatCardProps> = memo(({className = '', style = {}, children}) => {
  return (
    <Card className={`${styles.flat_card} ${className}`} style={style} isStatic>
      {children}
    </Card>
  );
});
