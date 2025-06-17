import React, {memo, useCallback, useEffect, useState} from 'react';
import styles from './style.module.scss';
import {XmarkIcon} from 'components/aux/icons/Xmark';
import {IconCaret} from 'components/aux/icons/Caret';
import type {FC, CSSProperties} from 'react';
import type {TEvent} from 'types/common';

export type TInputProps = {
  refresh?: number;
  className?: string;
  style?: CSSProperties;
  visible?: boolean;
  value?: string;
  isOpen?: boolean;
  hasCaretIcon?: boolean;
  hideClearIcon?: boolean;
  placeholder?: string;
  onChange?: (ev: TEvent) => void;
  onClick?: (ev: TEvent) => void;
  onClear?: (ev: TEvent) => void;
  onDeleteKeyDown?: (ev: TEvent) => void;
};

export const Input: FC<TInputProps> = memo(
  ({
    refresh,
    className = '',
    style,
    value,
    isOpen, // defines dropdown
    hasCaretIcon,
    hideClearIcon,
    placeholder = '',
    onChange,
    onClick,
    onClear,
    onDeleteKeyDown,
  }) => {
    const [localValue, setLocalValue] = useState('');

    const handleChange = (ev) => {
      onChange?.(ev);
    };

    const handleClick = (ev) => {
      onClick?.(ev);
    };

    const handleKeyDown = (ev) => {
      if (ev.keyCode === 46 || ev.keyCode === 8) onDeleteKeyDown?.(ev);
    };

    const handleClear = useCallback((ev) => {
      setLocalValue('');
      onChange?.(ev);
      onClear?.(ev);
    }, []);

    // On value changes
    useEffect(() => {
      value !== undefined && setLocalValue(value);
    }, [value]);

    // On refresh
    useEffect(() => {
      if (refresh === undefined) return;
      
      setLocalValue('');
      onChange?.({} as TEvent);
      onClear?.({} as TEvent);
    }, [refresh]);

    return (
      <div className={`input ${styles.input} ${className}`} style={style}>
        <div className={`input-field ${styles.field}`}>
          <IconCaret
            className={!hasCaretIcon ? 'invisible' : ''}
            direction={!isOpen ? 'down' : 'up'}
          />
          <input
            type='text'
            placeholder={placeholder}
            value={value ?? localValue}
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          />
          <XmarkIcon
            className={`${styles.x_icon} ${
              (!value && !localValue) || hideClearIcon ? 'invisible' : ''
            }`}
            scale={1.5}
            onClick={handleClear}
          />
        </div>
      </div>
    );
  }
);
