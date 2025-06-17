import {isNumber, isString} from './primitives';

export const newDate = (inputStr = '' /* 0?d[.-/]0?m[.-/]yyyy hs:ms:ss */) => {
  if (!inputStr) return new Date();

  const [inputDate, inputTime] = inputStr.includes(' ') ? inputStr.split(' ') : [inputStr];

  const [inputDateMatch, day, separator, month, year] =
    inputDate.match(/^(0?[1-9]|[12][0-9]|3[01])([.-/])(0?[1-9]|1[012])\2(\d{4})$/) ?? [];

  if (!isString(inputStr) || !inputDateMatch) {
    throw new Error('Input date should be "dd.mm.yyyy" string!');
  }

  const monthObj = getMonthObj(+month, +year);
  const dateArgs = [+year, month - 1, day > monthObj.days ? monthObj.days : day];

  const [inputTimeMatch, hours, minutes, seconds = ':00'] =
    inputTime?.match(/^([01][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/) ?? [];

  const args = inputTimeMatch
    ? [...dateArgs, trimZero(hours), trimZero(minutes), trimZero(seconds.substring(1))]
    : [...dateArgs];

  return new Date(...args);
};

export const trimZero = (strToNum = '') =>
  strToNum.lenght > 1 && strToNum.startsWith('0')
    ? Number(strToNum.substring(1))
    : Number(strToNum);

export const parseDate = (date = newDate()) => {
  return {
    d: getDay(date),
    m: getMonth(date), // 1-12
    y: getYear(date),
    hs: date.getHours(), // 0-23
    ms: date.getMinutes(),
    ss: date.getSeconds(),
  };
};

export const getYear = (date = newDate()) => date.getFullYear();

export const isLeapYear = (year = getYear()) =>
  (+year % 4 === 0 && +year % 100 !== 0) || +year % 400 === 0;

export const getMonth = (date = newDate()) => date.getMonth() + 1;

export const getMonthObj = (monthArg = getMonth(), year = getYear()) => {
  const month = typeof monthArg === 'number' ? monthArg : getMonth(monthArg);

  let monthObj = monthsData.find(
    (m) => (isNumber(month) && m.order === month) || (isString(month) && m.value === month)
  );
  monthObj =
    monthObj.value === 'febrary' && year && isLeapYear(year) ? {...monthObj, days: 29} : monthObj;

  let startWeekDay = getWeekDay(new Date(+year, monthObj.order - 1, 1)) - 1;
  startWeekDay = startWeekDay !== -1 ? startWeekDay : 6;

  return {...monthObj, startWeekDay};
};

export const getDay = (date = newDate()) => date.getDate();

export const getWeekDay = (date = newDate()) => date.getDay();

export const monthsData = [
  {
    order: 1,
    value: 'january',
    label: 'Январь',
    days: 31,
  },
  {
    order: 2,
    value: 'febrary',
    label: 'Февраль',
    days: 28,
  },
  {
    order: 3,
    value: 'march',
    label: 'Март',
    days: 31,
  },
  {
    order: 4,
    value: 'april',
    label: 'Апрель',
    days: 30,
  },
  {
    order: 5,
    value: 'may',
    label: 'Май',
    days: 31,
  },
  {
    order: 6,
    value: 'june',
    label: 'Июнь',
    days: 30,
  },
  {
    order: 7,
    value: 'july',
    label: 'Июль',
    days: 31,
  },
  {
    order: 8,
    value: 'august',
    label: 'Август',
    days: 31,
  },
  {
    order: 9,
    value: 'september',
    label: 'Сентябрь',
    days: 30,
  },
  {
    order: 10,
    value: 'october',
    label: 'Октябрь',
    days: 31,
  },
  {
    order: 11,
    value: 'november',
    label: 'Ноябрь',
    days: 30,
  },
  {
    order: 12,
    value: 'december',
    label: 'Декабрь',
    days: 31,
  },
];
