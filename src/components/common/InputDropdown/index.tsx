import React, {Fragment, memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import styles from './style.module.scss';
import {Input} from 'components/common/Input';
import {MotionHeight} from 'components/aux/motions/MotionHeight';
import {useElementOutsideClick} from 'utils/hooks/useDom';
import {parseOptions} from 'utils/parsers';
import type {FC} from 'react';
import type {TEvent, TOption} from 'types/common';
import type {Extend} from 'types/generic';
import type {TInputProps} from 'components/common/Input';
import {makeKeyId} from 'utils/generators';
import {getDefaultOptionFromProp} from './helpers';
import {AnimatePresence} from 'framer-motion';

export type TDropdownProps = Extend<
  [
    TInputProps,
    {
      width?: number;
      type?: 'picker';
      showCaret?: boolean;
      options?: TOption[] | any[];
      defaultOption?: TOption;
      onSelect?: (o?: TOption) => void;
      onChange?: (ev: TEvent, searchedOption?: TOption) => void;
    }
  ]
>;

export const Dropdown: FC<TDropdownProps> = memo(
  ({
    refresh,
    className = '',
    style,
    visible = true,
    width,
    type = '',
    placeholder = 'Выберите из списка',
    options: optionsProp = [],
    defaultOption: defaultOptionProp,
    value,
    onSelect,
    onChange,
  }) => {
    const dropdownRef = useRef(null),
      {current: dropdownElem} = dropdownRef;

    const options: TOption[] = useMemo(() => parseOptions(optionsProp), [optionsProp]);
    const defaultOption = useMemo(
      () => getDefaultOptionFromProp(defaultOptionProp, options),
      [defaultOptionProp, options]
    );

    const [localActiveOption, setLocalActiveOption] = useState(defaultOption);
    const [localValue, setLocalValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleInputClear = useCallback(() => {
      setLocalActiveOption(undefined);
      localActiveOption?.idx === undefined && setIsOpen(false);
    }, [localActiveOption?.idx]);

    const handleOptionSelect = useCallback(
      (ev: TEvent, option: TOption) => {
        const selectedOption = {...option, originType: 'selected'};
        setLocalActiveOption(selectedOption);
        onSelect?.(selectedOption);
        onChange?.(ev, selectedOption);
      },
      [onSelect, onChange]
    );

    const handleDeleteKeyDown = useCallback(
      (ev) => {
        setLocalActiveOption(undefined);
        onSelect?.(undefined);
      },
      [onSelect]
    );

    const handleChange = useCallback(
      (ev) => {
        if (onChange) {
          let searchedOption = options?.find((o) => o.label === ev?.target?.value);
          searchedOption = !searchedOption
            ? searchedOption
            : {...searchedOption, originType: 'searched'};
          setLocalActiveOption(searchedOption);
          setLocalValue(ev?.target?.value);
          onChange(ev, searchedOption);
        }
      },
      [onChange]
    );

    useElementOutsideClick(dropdownElem, () => setIsOpen(false));

    // On active option change
    useEffect(() => {
      setLocalValue(localActiveOption?.label);
    }, [localActiveOption]);

    // On refresh
    useEffect(() => {
      if (refresh === undefined) return;

      setLocalActiveOption(defaultOption);
      setLocalValue('');
      setIsOpen(false);
      onSelect?.();
      onChange?.({} as TEvent);
    }, [refresh]);

    return (
      <AnimatePresence mode='sync'>
        <div
          className={`dropdown ${styles.dropdown} ${type === 'picker' ? styles.picker : ''} ${
            !isOpen || (onChange && !options?.length) ? '' : styles.opened
          } ${!onChange ? styles.no_caret : ''} ${!visible ? 'invisible' : ''} ${className}`}
          style={{width, ...style}}
          ref={dropdownRef}
        >
          <Input
            isOpen={isOpen}
            hasCaretIcon={type === 'picker'}
            value={value ?? localValue}
            onChange={handleChange}
            placeholder={placeholder}
            onClick={() => setIsOpen(true)}
            onClear={type !== 'picker' ? handleInputClear : undefined}
            hideClearIcon={type === 'picker'}
            onDeleteKeyDown={!onChange ? handleDeleteKeyDown : undefined}
          />

          <div className={styles.options}>
            {options.map((option, i) => (
              <Fragment key={option.value}>
                <MotionHeight isHidden={!isOpen} duration={0.1}>
                  <div
                    key={makeKeyId()}
                    className={`${styles.option} ${
                      option.idx === localActiveOption?.idx ? styles.active : ''
                    } ${i === options.length - 1 ? styles.last : ''}`}
                    onClick={(ev) => handleOptionSelect(ev, option)}
                  >
                    {option.label}
                  </div>
                </MotionHeight>
              </Fragment>
            ))}
          </div>
        </div>
      </AnimatePresence>
    );
  }
);

export const Picker: FC<Omit<TDropdownProps, 'type'>> = (props) => (
  <Dropdown {...props} type='picker' />
);
