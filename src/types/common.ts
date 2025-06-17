import type {MouseEvent, ChangeEvent} from 'react';

export type TEvent = MouseEvent<HTMLElement> | ChangeEvent<HTMLInputElement>;

export type TTimer = ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>;

export type TOption = {
  [key: string]: any;
  idx?: number;
  label?: string;
  value?: string | number;
};
