import React, {memo, useMemo, useState} from 'react';
import styles from './style.module.scss';
import {IconTicketButton} from 'components/aux/icons/TicketButton';
import {Picker} from 'components/common/InputDropdown';
import {makeArrayRange} from 'utils/generators';
import {newDate, getDay, getMonthObj, getYear, monthsData} from 'utils/date';
import {DaysTable} from './DaysTable';
import {MotionPositionFromSideToSide} from 'components/aux/motions/MotionPositionFromSideToSide';
import type {FC, CSSProperties} from 'react';
import type {TOption} from 'types/common';

export type TCalendarProps = {
  className?: string;
  style?: CSSProperties;
};

export const Calendar: FC<TCalendarProps> = memo(({className = '', style = {}}) => {
  const [activeDate, setActiveDate] = useState(newDate());
  const [prevDate, setPrevDate] = useState(newDate());

  const [activeYear, activeMonthObj, activeDay, prevMonthObj] = useMemo(
    () => [
      getYear(activeDate),
      getMonthObj(activeDate, getYear(activeDate)),
      getDay(activeDate),
      getMonthObj(prevDate, getYear(activeDate)),
    ],
    [activeDate, prevDate]
  );

  const [move, setMove] = useState<'left' | 'right'>();
  const [from, setFrom] = useState<'left' | 'right'>('right');
  const [activeFirst, setActiveFirst] = useState(true);

  const handleYearChange = (yearOption) => {
    if (!yearOption?.value) {
      setActiveDate(newDate());
      return;
    }

    const {value: year} = yearOption ?? {};
    setActiveDate((activeDate) =>
      newDate(`${getDay(activeDate)}.${getMonthObj(activeDate, year).order}.${year}`)
    );
  };

  const handleMonthChange = (monthOption) => {
    if (!monthOption?.order) {
      setActiveDate(newDate());
      setPrevDate(newDate());
      return;
    }

    const nextDate = newDate(`${getDay(activeDate)}.${monthOption.order}.${getYear(activeDate)}`);
    const isFuture = activeDate < nextDate;

    setPrevDate(activeDate);
    setActiveDate(nextDate);

    setMove(isFuture ? 'left' : 'right');
    setFrom(isFuture ? 'right' : 'left');
    setActiveFirst((prev) => !prev);
  };

  const handleDayChange = (day: number) => {
    setActiveDate((activeDate) =>
      newDate(`${day}.${getMonthObj(activeDate, getYear(activeDate)).order}.${getYear(activeDate)}`)
    );
  };

  return (
    <div className={`${styles.calendar} ${className}`} style={style}>
      <div className={styles.header}>
        <div className={styles.title}>Афиша</div>
        <IconTicketButton className={styles.icon_ticket} />
      </div>

      <div className={styles.controls}>
        <div className={styles.month}>
          <Picker
            options={monthsData}
            defaultOption={{value: activeMonthObj.value}}
            onSelect={handleMonthChange}
          />
        </div>
        <div className={styles.year}>
          <Picker
            width={60}
            options={makeArrayRange(2019, 2029)}
            defaultOption={{value: activeYear}}
            onSelect={handleYearChange}
          />
        </div>
      </div>

      <div className={styles.days_wrapper}>
        <MotionPositionFromSideToSide from={activeFirst ? 'center' : from} to={move}>
          <DaysTable
            activeMonthObj={activeFirst ? activeMonthObj : prevMonthObj}
            activeDay={activeDay}
            onDayChange={handleDayChange}
          />
        </MotionPositionFromSideToSide>
        <MotionPositionFromSideToSide from={!activeFirst ? 'center' : from} to={move}>
          <DaysTable
            activeMonthObj={activeFirst ? prevMonthObj : activeMonthObj}
            activeDay={activeDay}
            onDayChange={handleDayChange}
          />
        </MotionPositionFromSideToSide>
      </div>

      <div className={styles.separator} />

      <div className={styles.event_section}>
        <div className={styles.title}>
          <div className={styles.circle} />
          <h2>Ближайшие события</h2>
        </div>
        <div className={styles.events}>Пока ничего интересного :(</div>
      </div>
    </div>
  );
});
