import React, {memo} from 'react';
import {motion} from 'framer-motion';
import type {FC, ReactNode, CSSProperties} from 'react';

export type TMotionPositionFromSideToSideProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  positionSelf?: 'absolute';
  from?: 'center' | 'left' | 'right';
  to?: 'left' | 'right';
  duration?: number;
};

export const MotionPositionFromSideToSide: FC<TMotionPositionFromSideToSideProps> = memo(
  ({
    className = '',
    style,
    children,
    positionSelf = 'absolute',
    from = 'center', // center , right , left
    to, // right , left
    duration = 0.2, // s
  }) => {
    const positionStyle: CSSProperties = {
      position: from === 'center' ? 'relative' : positionSelf,
      top: 0,
      left: 0,
    };

    const variant = !to ? undefined : {center: to, right: 'center', left: 'center'}[from];

    return (
      <motion.div
        key={from}
        className={className}
        style={{width: '100%', ...positionStyle, ...style}}
        variants={{
          center: {x: 0, opacity: 1},
          right: {x: '100%', opacity: 0},
          left: {x: '-100%', opacity: 0},
        }}
        initial={from}
        animate={variant}
        transition={{duration}}
      >
        {children}
      </motion.div>
    );
  }
);
