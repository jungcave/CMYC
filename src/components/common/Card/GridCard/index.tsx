import React, {memo} from 'react';
import styles from './style.module.scss';
import {Card} from 'components/common/Card';
import type {FC, CSSProperties, ReactNode} from 'react';

export type TGridCardProps = {
  className?: string;
  style?: CSSProperties;
  theme?: 'dark' | 'primary' | 'white';
  displayShrinkContent?: 'both' | 'right';
  flexColumnOnSmallSize?: boolean;
  contentLeft: string | ReactNode | ReactNode[];
  contentRight?: string | ReactNode | ReactNode[];
  contentBottom?: string | ReactNode | ReactNode[];
};

export const GridCard: FC<TGridCardProps> = memo(
  ({
    className = '',
    style = {},
    theme = 'dark',
    flexColumnOnSmallSize = true,
    contentLeft,
    contentRight,
    contentBottom,
  }) => {
    const getGridTemplateStylesClass = () => {
      if (contentLeft && !contentRight && !contentBottom) return styles.only_left_template;
      else if (contentLeft && contentRight && !contentBottom) return styles.no_bottom_template;
      else if (contentLeft && !contentRight && contentBottom) return styles.no_right_template;
      else return '';
    };

    return (
      <Card className={`grid-card ${styles.grid_card} ${className}`}>
        <div
          className={`grid-card-content  ${styles.content} ${styles[theme]} ${
            flexColumnOnSmallSize ? styles.small : ''
          } ${getGridTemplateStylesClass()}`}
          style={style}
        >
          <div className={`grid-card-left ${styles.area} ${styles.left}`}>{contentLeft}</div>
          {contentRight && (
            <div className={`grid-card-right ${styles.area} ${styles.right}`}>
              <div className={styles.separator} />
              {contentRight}
            </div>
          )}
          {contentBottom && (
            <div className={`grid-card-bottom ${styles.area} ${styles.bottom} ${styles.hide_s}`}>
              <div className={styles.separator} />
              {contentBottom}
            </div>
          )}
        </div>
      </Card>
    );
  }
);
