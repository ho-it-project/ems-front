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

export type SuccessRes<
  P extends keyof paths,
  M extends PathMethod<P>,
> = paths[P][M] extends {
  responses: { 200: { content: { "application/json": { result: unknown } } } };
}
  ? paths[P][M]["responses"][200]["content"]["application/json"]["result"]
  : undefined;
