export const isString = (x) => typeof x === 'string';

export const isNumber = (x) => typeof x === 'number';

export const isObject = (x) => typeof x === 'object' && !Array.isArray(x) && x !== null;

export const isFunction = (x) => x && {}.toString.call(x) === '[object Function]';

export const isEmpty = (x) =>
  !x || (Array.isArray(x) ? !x.length : isObject(x) ? !Object.keys(x).length : false);

export const findObjectDeepKeyValue = (obj = {}, key) =>
  key in obj
    ? obj[key]
    : Object.values(obj).reduce((acc, val) => {
      if (acc !== undefined) return acc;
      if (typeof val === 'object') return findObjectDeepKeyValue(val, key);
    }, undefined);

export const hasSameProps = (obj1, obj2) =>
  !isObject(obj1) || !isObject(obj2) ? undefined : JSON.stringify(obj1) === JSON.stringify(obj2);
