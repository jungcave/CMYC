import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';

export function useLocalStore(key, initialValue, options = {}) {
  const {initializeWithValue = true} = options;
  const isServer = typeof window === 'undefined';

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) return readValue();
    
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const serializer = useCallback(value => {
    if (options.serializer) return options.serializer(value);

    return JSON.stringify(value);
  }, [options]);

  const deserializer = useCallback(value => {
    if (options.deserializer) return options.deserializer(value);
    else if (value === 'undefined') return undefined;
    
    const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;
    
    try {
      return JSON.parse(value);
    } catch (error) {
      return defaultValue; // return initialValue if parsing fails
    }
  }, [options, initialValue]);

  const readValue = useCallback(() => {
    const initialValueToUse = initialValue instanceof Function ? initialValue() : initialValue;
    
    if (isServer) return initialValueToUse;

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch (error) {
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  const setValue = useEventCallback(value => {
    try {
      const newValue = value instanceof Function ? value(readValue()) : value;
      window.localStorage.setItem(key, serializer(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new StorageEvent('local-storage', {key}));
    } catch (error) {
      console.error('Failed to set localStorage key:', error);
    }
  });

  const removeValue = useEventCallback(() => {
    const defaultValue = initialValue instanceof Function ? initialValue() : initialValue;
    window.localStorage.removeItem(key);
    setStoredValue(defaultValue);
    window.dispatchEvent(new StorageEvent('local-storage', {key}));
  });

  const handleStorageChange = useCallback(event => {
    if (event.key && event.key !== key) return;

    setStoredValue(readValue());
  }, [key, readValue]);

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue, removeValue];
}

export function useEventCallback(fn) {
  const useIsomorphicLayoutEffect = window ? useLayoutEffect : useEffect;
  const ref = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);
  
  return useCallback((...args) => ref.current?.(...args), [ref]);
}

export function useEventListener(eventName, handler, element, options) {
  const useIsomorphicLayoutEffect = window ? useLayoutEffect : useEffect;
  const savedHandler = useRef(handler); // create a ref that stores handler

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement = element?.current ?? window; // define the listening target
    
    if (!(targetElement && targetElement.addEventListener)) return;
    
    const listener = event => savedHandler.current(event); // create event listener that calls handler function stored in ref
    targetElement.addEventListener(eventName, listener, options);

    return () => targetElement.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}
