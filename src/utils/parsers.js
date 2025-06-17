import {isFunction, isObject} from 'utils/primitives';

export const parseOptions = (from, {valueKey = 'value', addParams = null} = {}) => {
  if (!from) return undefined;

  return !isObject(from[0])
    ? from.map((val, i) => ({
      [valueKey]: val,
      label: val,
      idx: i,
      ...(isObject(addParams) ? addParams : isFunction(addParams) ? addParams(val, i) : {}),
    })) // from array of strings or numbers
    : from.map((item, i) => ({...item, idx: i})); // from array of objects
};

export const unpx = (px) => parseInt(px || 0, 10);

export const filterObjectWithKeys = (obj, keys = []) =>
  Object.fromEntries(keys.map((key) => [key, obj[key]]));

export const filterObjectFromValues = (obj, vals = []) =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    if (!vals.includes(v)) acc[k] = v;
    return acc;
  }, {});

export const flipObjectKeysAndValues = (obj) =>
  Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});

export const flattenObject = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export const flattenObjectWithPrefixKeys = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};
