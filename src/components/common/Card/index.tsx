import React, {memo, useEffect, useState} from 'react';
import styles from './style.module.scss';
import type {FC, CSSProperties, ReactNode} from 'react';
import type {TEvent} from 'types/common';

export type TCardProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  id?: string | number;
  imagePath?: string;
  height?: string;
  isStatic?: boolean;
  onHover?: (isHovered: boolean) => void;
  onClick?: (ev?: TEvent) => void;
};

export const Card: FC<TCardProps> = memo(
  ({
    className = '',
    style,
    children,
    id = '',
    imagePath = '',
    height = '',
    isStatic = false,
    onHover,
    onClick,
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    // On hover
    useEffect(() => {
      onHover?.(isHovered);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHovered]);

    return (
      <div
        className={`${styles.card} ${isHovered && !isStatic ? styles.hovered : ''} ${className}`}
        style={{height, ...style}}
        id={`${JSON.stringify(id)}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {imagePath && <img alt='?' src={imagePath} className={styles.image} />}
        {!isStatic ? (
          <div className={styles.overlay}>
            <div className={styles.content}>{children}</div>
          </div>
        ) : (
          <div className={styles.content}>{children}</div>
        )}
      </div>
    );
  }
);
