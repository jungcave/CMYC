import {useEffect} from 'react';

export const useElementOutsideClick = (target, onOutsideClick) => {
  const handleDocumentClick = ev => {
    const targetElem = target?.current || target;

    if (!targetElem) return;

    !targetElem.contains(ev.target) && onOutsideClick?.(ev);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, onOutsideClick]);

  return;
};
