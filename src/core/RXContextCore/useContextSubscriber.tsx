import { BehaviorSubject } from 'rxjs';

import { useSubscriber } from './index';
import { FieldContext, SetterContext, StateUpdater } from './types';

type ResetState = 'clearWithLocalStore' | 'default';

export type StateInterface<T> = {
  setState: (v: StateUpdater<T> | T) => void;
  useState: (fields?: FieldContext<T>[] | false) => [T, SetterContext<T>];
};
export const saveToStore = <T,>(name: string, value: T) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const useStateSubscriber = <T,>(
  stream$: BehaviorSubject<T>,
  callBack?: (value: T) => void
): StateInterface<T> => {
  const [, setState] = useSubscriber<T>(stream$, false, callBack);
  const useState = (fields: FieldContext<T>[] | false = []) =>
    useSubscriber(stream$, fields, callBack);
  return {
    useState,
    setState,
  };
};

const getValueFromLocalStore = <T,>(v: T, localStoreName: string) => {
  if (localStoreName) {
    const localEntity: string = localStorage.getItem(localStoreName) || '';
    if (!localEntity) {
      return v;
    }

    return JSON.parse(localEntity);
  }

  return v;
};

export type StateType<T> = [
  subcriber: (sideEffect?: (v?: T) => void) => StateInterface<T>,
  stream$: BehaviorSubject<T>,
  reset: (resetStateType?: ResetState) => void
];

export const createState = <T,>(
  v: T,
  localStoreName?: string,
  sideEffect?: (v?: T) => void
): StateType<T> => {
  const value = getValueFromLocalStore(v, localStoreName || '');
  const defaultValue = value;
  const stream = new BehaviorSubject<T>(value);

  const useWrapperSideEffect = () => {
    return useStateSubscriber<T>(stream, (value: T) => {
      sideEffect && sideEffect(value);
      localStoreName && saveToStore(localStoreName, value);
    });
  };

  const reset = (resetStateType?: ResetState) => {
    const type = resetStateType ? resetStateType : 'default';
    if (type === 'clearWithLocalStore') {
      localStoreName && localStorage.removeItem(localStoreName);
      stream.next(v);
      return;
    }
    stream.next(defaultValue);
  };
  return [useWrapperSideEffect, stream, reset];
};
