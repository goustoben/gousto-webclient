/* eslint-disable no-unused-vars */
export type ImmutableMap<T> = {
  get<K extends keyof T>(name: K): T[K]
  set<S>(o: S): ImmutableMap<T & S>
  toJS(): T
}
