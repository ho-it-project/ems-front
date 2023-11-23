export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;
export type IsEmptyObject<Obj extends Record<PropertyKey, unknown>> = [
  keyof Obj,
] extends [never]
  ? true
  : false;

export type COmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type WithUndefined<T extends object> = {
  [key in keyof T]: T[key] | undefined;
};

export type Option<T extends object> = {
  [key in keyof T]?: T[key];
};
