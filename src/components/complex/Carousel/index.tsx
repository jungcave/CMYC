import React, {memo, useRef, useState} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties} from 'react';
import {TOption} from 'types/common';
import {IconArrowBracket} from 'components/aux/icons/ArrowBracket';
import {Extend} from 'types/generic';
import {makeArray} from 'utils/generators';
import {unpx} from 'utils/parsers';
import {IconButtonForward} from 'components/aux/icons/ButtonForward';

export type TCarouselProps = {
  className?: string;
  style?: CSSProperties;
  options?: Extend<[TOption, {imagePath: string}]>[];
};

export const Carousel: FC<TCarouselProps> = memo(({className = '', style = {}, options = []}) => {
  const carouselRef = useRef<HTMLDivElement>(null),
    {current: carouselElem} = carouselRef;
  const [activeIdx, setActiveIdx] = useState(0);

  const makeShift = (targetElem, directionMulti, shiftBy = 1) => {
    const targetCarouselElem = carouselElem || targetElem.closest('.carousel');
    const carouselCompStyle = getComputedStyle(targetCarouselElem);

    // Shift cards
    const cardWidth = unpx(carouselCompStyle.getPropertyValue('--card-width'));
    const prevCardsShift = unpx(carouselCompStyle.getPropertyValue('--cards-shift'));

    targetCarouselElem.style.setProperty(
      '--cards-shift',
      `${prevCardsShift - cardWidth * directionMulti * shiftBy}px`
    );
    // Shift dots
    const dotWidth = unpx(carouselCompStyle.getPropertyValue('--dot-width'));
    const prevDotsShift = unpx(carouselCompStyle.getPropertyValue('--dots-shift'));

    targetCarouselElem.style.setProperty(
      '--dots-shift',
      `${prevDotsShift - dotWidth * directionMulti * shiftBy}px`
    );
  };

  const handleClickArrow = (ev, clockwise = true) => {
    if ((!clockwise && activeIdx < 1) || (clockwise && activeIdx > options.length - 2)) return;

    const directionMulti = clockwise ? 1 : -1;
    setActiveIdx((activeIdx) => activeIdx + 1 * directionMulti);
    makeShift(ev.target, directionMulti);
  };

  const handleClickDot = (ev, idx) => {
    if (idx === activeIdx) return;

    setActiveIdx(idx);
    const directionMulti = idx > activeIdx ? 1 : -1;
    const shiftBy = Math.abs(idx - activeIdx);
    makeShift(ev.target, directionMulti, shiftBy);
  };

  return (
    <div ref={carouselRef} className={`carousel ${styles.carousel} ${className}`} style={style}>
      <div className={styles.card_container}>
        <div className={styles.card_carousel}>
          {options.map((o, i) => (
            <div
              key={`carausel-card-${i}`}
              className={styles.card}
              style={{background: `url(${o.imagePath}) center /cover no-repeat`}}
            />
          ))}
        </div>

        <div className={styles.arrows}>
          <IconArrowBracket
            className={`${styles.arrow} ${styles.left}`}
            onClick={(ev) => handleClickArrow(ev, false)}
          />
          <IconArrowBracket
            rotate={180}
            className={`${styles.arrow} ${styles.right}`}
            onClick={(ev) => handleClickArrow(ev, true)}
          />
        </div>

        <IconButtonForward fill='black' className={styles.icon_forward} />
      </div>

      <div className={styles.dots}>
        {makeArray(options.length).map((i) => (
          <div
            key={`carausel-dot-${i}`}
            className={`${styles.dot} ${i === activeIdx ? styles.active : ''}`}
            onClick={(ev) => handleClickDot(ev, i)}
          >
            &middot;
          </div>
        ))}
      </div>
    </div>
  );
});
