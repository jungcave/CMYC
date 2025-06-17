import React, {memo} from 'react';
import styles from './style.module.scss';
import {makeArray} from 'utils/generators';
import {FC, CSSProperties} from 'react';

export type TDaysTableProps = {
  className?: string;
  style?: CSSProperties;
  activeMonthObj: any;
  activeDay: any;
  onDayChange: (day: any) => any;
};

export const DaysTable: FC<TDaysTableProps> = memo(
  ({className = '', style = {}, activeMonthObj = {}, activeDay, onDayChange}) => {
    return (
      <div className={`${styles.days_table} ${className}`}>
        {makeArray(activeMonthObj?.startWeekDay).map((_, i) => (
          <div key={`day-${i}`} className={styles.day}>
            <div className={styles.number} />
          </div>
        ))}
        {makeArray(activeMonthObj?.days).map((dayIdx, i) => {
          const mod = (activeMonthObj?.startWeekDay + i) % 7;

          return (
            <div
              key={`month-${i}`}
              className={`${styles.day} ${mod === 5 || mod === 6 ? styles.weekend : ''} ${
                activeDay === i + 1 ? styles.active : ''
              }`}
              onClick={() => onDayChange(dayIdx + 1)}
            >
              <div className={styles.number}>{dayIdx + 1}</div>
            </div>
          );
        })}
      </div>
    );
  }
);
