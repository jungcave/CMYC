import React, {memo} from 'react';
import {motion} from 'framer-motion';
import type {FC, CSSProperties, ReactNode} from 'react';

export type TMotionHeightProps = {
  className?: string,
  style?: CSSProperties,
  children?: ReactNode | ReactNode[],
  isHidden?: boolean,
  duration?: number,
  initialHeight?: number,
};

export const MotionHeight: FC<TMotionHeightProps> = memo(
  ({
    className = '',
    style,
    children,
    isHidden,
    duration = 0.2, // s
    initialHeight = 0,
  }) =>
    isHidden === undefined ? (
      <>{children}</>
    ) : (
      <motion.div
        className={className}
        style={{overflowY: 'hidden', ...style}}
        variants={{
          show: {height: 'auto', opacity: 1},
          hide: {height: initialHeight, opacity: 0},
        }}
        initial='hide'
        animate={isHidden ? 'hide' : 'show'}
        transition={{duration: duration}}
      >
        {children}
      </motion.div>
    )
);
