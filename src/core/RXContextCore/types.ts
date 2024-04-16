export type StateUpdater<T> = (prevState: T) => T;

export type SetterContext<T> = (v: StateUpdater<T> | T) => void;

export type UseSubscriber<T> = [T, SetterContext<T>];

export type FieldContext<T> = keyof T;
