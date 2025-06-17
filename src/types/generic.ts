export type Pretty<T> = { [K in keyof T]: T[K]; } & {};

type ExtendType<A extends any[]> = A extends [infer T1, infer T2, ...infer R] ? Omit<T1, keyof T2> & T2 & ExtendType<R> : unknown;

export type Extend<A extends any[]> = Pretty<ExtendType<A>>;