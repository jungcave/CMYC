import React from 'react';
import styles from './style.module.scss';
import {Calendar} from 'components/complex/Calendar';

export const EventsPage = () => {
  return (
    <div className={styles.events_page}>
      <Calendar />
    </div>
  );
};
