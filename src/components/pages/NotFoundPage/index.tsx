import React from 'react';
import styles from './style.module.scss';
import {NotFound} from 'components/common/NotFound';

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <NotFound style={{color: '#f0f0f0'}} />
    </div>
  );
};
