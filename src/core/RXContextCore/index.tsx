import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { FieldContext, StateUpdater, UseSubscriber } from './types';

const defaultCheck = <T,>(fields: FieldContext<T>[] | false) => {
  if (!fields) {
    return distinctUntilChanged(() => true);
  }

  if (fields.length !== 0) {
    const getField = (state: T) =>
      fields.reduce((acc: any[], field: FieldContext<T>) => {
        acc.push(state[field]);
        return acc;
      }, []);

    return distinctUntilChanged((prev: T, next: T) => {
      const prevState = JSON.stringify(getField(prev));
      const nextState = JSON.stringify(getField(next));

      return prevState === nextState;
    });
  }

  return distinctUntilChanged(
    (prev: T, next: T) => JSON.stringify([prev]) === JSON.stringify([next])
  );
};

export const useSubscriber = <T,>(
  stream$: BehaviorSubject<T>,
  fields: FieldContext<T>[] | false,
  callBack?: (value: T) => void
): UseSubscriber<T> => {
  const [state, next] = useState<T>(stream$.getValue());

  useEffect(() => {
    //@ts-ignore
    const subscription = stream$.pipe(defaultCheck<T>(fields)).subscribe({ next });

    return () => subscription.unsubscribe();
  }, []);

  const setState = (value: StateUpdater<T> | T) => {
    if (typeof value === 'function') {
      const state = stream$.getValue();
      const stateUpdater = value as StateUpdater<T>;
      stream$.next(stateUpdater(state));
      callBack && callBack(stateUpdater(state));
    } else {
      stream$.next(value);
      callBack && callBack(value);
    }
  };

  return [state, setState];
};
