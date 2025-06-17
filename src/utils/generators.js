export const makeKeyId = (n = 8) => (Math.random() + 1).toString(36).substring(12 - n);

export const makeArray = (n = 10) => (!n ? [] : Array.from(Array(Math.abs(n)).keys()));

export const makeArrayRange = (start = 0, end = 0) =>
  !(start - end) ? [start] : makeArray(end + 1 - start).map(i => start + i);
