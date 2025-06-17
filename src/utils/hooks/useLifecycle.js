import {useEffect, useState} from 'react';

export const useComponentDidMount = (callback) => {
  const [isMount, setIsMount] = useState(false);
  const [wasExecuted, setWasExecuted] = useState(false);

  useEffect(() => {
    if (!wasExecuted) {
      setTimeout(() => {
        setIsMount(true);
      }, 0);
      if (isMount) {
        callback();
        setWasExecuted(true);
      }
    }
  });
};
