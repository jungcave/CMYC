import {makeAutoObservable} from 'mobx';
import type {TOption} from 'types/common';

export class AppStore {
  constructor(props) {
    Object.keys(props).forEach((key) => (this[key] = props[key]));
    makeAutoObservable(this);
  }

  cardSearchPrompt?: TOption | string;
  setCardSearchPrompt = (cardSearchPrompt) => {
    this.cardSearchPrompt = cardSearchPrompt;
  };
}
