import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

export type DebounceNewState<T> = [debounceValue: T, simpleValue: T, setValue: (v: T) => void];

export const useDebounceStream = <T>(initValue: T): DebounceNewState<T> => {
  const [stream$] = useState<Subject<T>>(new Subject<T>());
  const [debounceValue, setDebounceValue] = useState<T>(initValue);
  const [simpleValue, setSimpleValue] = useState<T>(initValue);

  useEffect(() => {
    const subscription = stream$
      .pipe(
        debounceTime(500),
        tap((data) => setDebounceValue(data))
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    changeStream(simpleValue);
  }, [simpleValue]);

  const changeStream = (v: T) => {
    stream$.next(v);
  };

  const handleChangeValue = (v: T) => {
    setSimpleValue(v);
  };

  return [debounceValue, simpleValue, handleChangeValue];
};
