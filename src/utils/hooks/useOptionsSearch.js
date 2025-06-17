import React from 'react';
import {isString, isObject} from 'utils/primitives';

export const useSearchOptions = (
  options = [],
  searchPrompt = '' | {value: ''},
  searchableOptionKeys = ['name']
) => {
  if (isString(searchPrompt)) {
    // Search in all searchable keys
    return options?.filter((option) => {
      const searchThis = searchableOptionKeys.reduce(
        (acc, key) => (acc += ` ${JSON.stringify(option[key] ?? '').replace(/"/g, '')}`),
        ''
      );
      return searchThis.toLowerCase().includes(searchPrompt.toLowerCase());
    });
  } else if (isObject(searchPrompt)) {
    // Search by tag value
    return options.filter((option) => {
      return (
        (option.value && option.value === searchPrompt?.value) ||
        (option.tag && option.tag.toLowerCase().includes(searchPrompt?.value?.toLowerCase()))
      );
    });
  }
};
