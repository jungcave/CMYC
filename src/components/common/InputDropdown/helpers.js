import {isObject, isNumber} from 'utils/primitives';

export const getDefaultOptionFromProp = (defaultOptionProp, options) =>
  isNumber(defaultOptionProp)
    ? options?.[`${defaultOptionProp}`]
    : isObject(defaultOptionProp)
      ? options?.find(
        ({idx, value}) => idx === defaultOptionProp.idx || value === defaultOptionProp.value
      )
      : undefined;
