import React, {memo, useCallback, useEffect, useState} from 'react';
import type {FC} from 'react';
import {Dropdown, type TDropdownProps} from 'components/common/InputDropdown';
import type {TEvent} from 'types/common';

export type TSearchProps = TDropdownProps;

export const Search: FC<TSearchProps> = memo(
  ({refresh, options, onChange, ...props}) => {
    const [displayedOptions, setDisplayedOptions] = useState(options);
    const [localValue, setLocalValue] = useState('');

    const handleChange = useCallback(
      (ev, searchedOption) => {
        onChange?.(ev, searchedOption);
        setLocalValue(searchedOption?.label ?? ev?.target?.value);
      },
      [onChange]
    );

    // On value change
    useEffect(() => {
      if (!localValue) {
        setDisplayedOptions(options);
        return;
      }

      const filteredOptions = options?.filter(
        (o) =>
          o.label.toLowerCase().includes(localValue.toLowerCase()) ||
          localValue.toLowerCase().includes(o.label.toLowerCase())
      );
      setDisplayedOptions(filteredOptions);
    }, [localValue]);

    // On refresh
    useEffect(() => {
      if (refresh === undefined) return;

      setDisplayedOptions(options);
      setLocalValue('');
      onChange?.({} as TEvent, undefined);
    }, [refresh]);

    return (
      <Dropdown
        refresh={refresh}
        placeholder='Поиск'
        options={displayedOptions}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
