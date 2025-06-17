export const mayBeOrNot = (exp = '') => `(?:${exp})?`;
export const oneOf = (...args) =>
  Array.isArray(args[0]) ? `(${args[0].join('|')})` : `(${args.join('|')})`;
export const quot = (exp = '') => `['"]${exp}['"]`;

export const varname = '[a-zA-Z_]\\w*';
export const number = '[0-9]+';
export const varnameOrNumber = oneOf(quot(varname), number);
export const date = '(0?[1-9]|[12][0-9]|3[01]).(0?[1-9]|1[012]).(\\d{4})';
