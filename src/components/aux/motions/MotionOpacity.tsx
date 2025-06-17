import React, {memo} from 'react';
import type {FC, CSSProperties, ReactNode} from 'react';
import {motion} from 'framer-motion';

export type TMotionOpacityProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode | ReactNode[];
  duration?: number;
  reframeKey?: string;
};

export const MotionOpacity: FC<TMotionOpacityProps> = memo(
  ({className = '', style = {}, children, duration = 1000, reframeKey}) => {
    return (
      <motion.div
        key={reframeKey}
        className={className}
        style={style}
        initial={{opacity: 0.3}}
        animate={{opacity: 1}}
        exit={{opacity: 0.3}}
        transition={{duration: duration / 1000}}
      >
        {children}
      </motion.div>
    );
  }
);
