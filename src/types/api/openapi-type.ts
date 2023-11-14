import { FetchOptions } from "openapi-fetch";
import { FilterKeys, HasRequiredKeys } from "openapi-typescript-helpers";
import { paths } from "./api";

export * from "./ambulance_company";
export * from "./auth";

export type HttpMethod =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";

export type PathsWithMethod<T extends HttpMethod> = {
  [K in keyof paths]: T extends keyof paths[K] ? K : never;
}[keyof paths];

export type Init<
  M extends HttpMethod,
  P extends PathsWithMethod<M>,
> = HasRequiredKeys<FetchOptions<FilterKeys<paths[P], M>>> extends never
  ? [(FetchOptions<FilterKeys<paths[P], M>> | undefined)?]
  : [FetchOptions<FilterKeys<paths[P], M>>];

export type PathMethod<T extends keyof paths> = keyof paths[T];

export type PathStatus<
  T extends keyof paths,
  M extends PathMethod<T>,
> = "responses" extends keyof paths[T][M]
  ? keyof paths[T][M]["responses"]
  : null;

type res<P extends keyof paths, M extends PathMethod<P>> = paths[P][M] extends {
  responses: unknown;
}
  ? paths[P][M]["responses"]
  : undefined;

// [key: number]: { content: { "application/json": { result: unknown } } };
//[number]["content"]["application/json"]["result"]
type successCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

export type SuccessRes<P extends keyof paths, M extends PathMethod<P>> = Pick<
  res<P, M>,
  Extract<keyof res<P, M>, successCode>
> extends {
  [key in number | string]?: {
    content: { "application/json": { result: infer B } };
  };
}
  ? B
  : never;

export type Response<P extends keyof paths, M extends PathMethod<P>> = {
  data:
    | undefined
    | (Pick<res<P, M>, Extract<keyof res<P, M>, successCode>> extends {
        [key in number | string]?: {
          content: { "application/json": { result: infer A } };
        };
      }
        ? A
        : undefined);
  error:
    | undefined
    | (Omit<res<P, M>, successCode> extends {
        [key in number | string]?: {
          content: { "application/json": infer A };
        };
      }
        ? A
        : undefined);
};

export type Fail_<P extends keyof paths, M extends PathMethod<P>> = Omit<
  res<P, M>,
  successCode
> extends {
  [key in number | string]?: {
    content: { "application/json": infer A };
  };
}
  ? A
  : never;

/*
| Omit<SuccessRes<P, M>, successCode> extends {
        [key in number | string]?: infer A;
      }
    ? A extends { content: { "application/json": infer B } }
      ? B
      : never
    : never
*/
