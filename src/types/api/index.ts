export * from "./ambulance_company";
export * from "./auth";
export * from "./openapi-type";
export interface Success<T> {
  result: T;
  request_to_response: number;

  is_success: true;
  http_status_code: number;
  message: string;
}

export interface Fail {
  is_success: false;
  http_status_code: number;
  message: string;
}

export type Res<T> = Success<T> | Fail;
export type Try__<T> = T | Fail;
export type Success_<T> = Extract<T, { is_success: true }>;
// export type Fail<T extends Try<unknown>> = Extract<T, { is_success: false }>;
// export type Res<P extends keyof paths, M extends PathMethod<P>> =
//   | SuccessRes<P, M>
//   | Fail_<P, M>;

export type UnhandledExeption = {
  message: string;
  statusCode: number;
  error?: unknown;
};
