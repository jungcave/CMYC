import React, {useRef, useCallback} from 'react';

export const useDebounce = (callback, interval = 0) => {
  const prevTimeoutIdRef = useRef();

  return useCallback(
    (...args) => {
      clearTimeout(prevTimeoutIdRef.current);
      prevTimeoutIdRef.current = setTimeout(() => {
        callback(...args);
      }, interval);
    },
    [callback, interval]
  );
};
