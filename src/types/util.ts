export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends [never]
  ? true
  : false;

export type COmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
