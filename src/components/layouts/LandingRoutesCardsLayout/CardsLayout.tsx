import React, {memo, useState} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties, ReactNode} from 'react';
import {AnimatePresence} from 'framer-motion';
import {CARDS_ANIMATE_PRESENSE_DURATION_MS} from './RoutesCardsLayout';
import {UserCard} from 'components/common/Card/UserCard';
import {MotionOpacity} from 'components/aux/motions/MotionOpacity';
import type {TLandingRoutes} from 'components/App';

export type TCardsLayoutProps = {
  className?: string;
  style?: CSSProperties;
  pageContent?: ReactNode | ReactNode[];
  pagesWithContentInCardsDiv?: TLandingRoutes[];
  pageRoute?: TLandingRoutes;
  leftCards?: {
    [key: string]: any;
  };
  rightCards?: {
    [key: string]: any;
  };
};

export const CardsLayout: FC<TCardsLayoutProps> = memo(
  ({
    className = '',
    style = {},
    leftCards,
    rightCards,
    pageContent,
    pageRoute,
    pagesWithContentInCardsDiv,
  }) => {
    const [hoveredHash, setHoveredHash] = useState<Record<number, boolean>>({});

    return (
      <div className={`cards-layout ${styles.cards_layout} ${className}`} style={style}>
        {/* Left */}
        <div className={`cards-layout-cards ${styles.cards}`}>
          <AnimatePresence mode='sync'>
            {leftCards?.map((card, i) => (
              <div key={`base-card-${card.id}`}>
                <MotionOpacity duration={CARDS_ANIMATE_PRESENSE_DURATION_MS}>
                  <UserCard
                    linkTo={`/user?id=${card.userId}`}
                    userCard={card}
                    isHovered={hoveredHash[i]}
                    onHover={(isHovered) => setHoveredHash((hash) => ({...hash, [i]: isHovered}))}
                  />
                </MotionOpacity>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right */}
        <div className={`cards-layout-cards-wrapper ${styles.cards_wrapper}`}>
          {pagesWithContentInCardsDiv !== undefined && (
            <MotionOpacity
              reframeKey={`${pageRoute ?? ''}`}
              duration={CARDS_ANIMATE_PRESENSE_DURATION_MS}
            >
              {!pagesWithContentInCardsDiv.includes(pageRoute ?? '') && pageContent}
            </MotionOpacity>
          )}

          <div className={`cards-layout-cards ${styles.cards}`}>
            {pagesWithContentInCardsDiv !== undefined && (
              <MotionOpacity
                reframeKey={`${pageRoute}`}
                duration={CARDS_ANIMATE_PRESENSE_DURATION_MS}
              >
                {pagesWithContentInCardsDiv.includes(pageRoute ?? '') && pageContent}
              </MotionOpacity>
            )}

            <AnimatePresence mode='sync'>
              {rightCards?.map((card, i) => (
                <div key={`section-card-${card.id}`}>
                  <MotionOpacity
                    reframeKey={`${pageRoute ?? ''}`}
                    duration={CARDS_ANIMATE_PRESENSE_DURATION_MS}
                  >
                    <UserCard
                      linkTo={`/user?id=${card.userId}`}
                      userCard={card}
                      isHovered={hoveredHash[i + leftCards?.length]}
                      onHover={(isHovered) =>
                        setHoveredHash((hash) => ({
                          ...hash,
                          [i + leftCards?.length]: isHovered,
                        }))
                      }
                    />
                  </MotionOpacity>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }
);
