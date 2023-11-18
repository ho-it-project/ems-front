import { FetchOptions } from "openapi-fetch";
import { FilterKeys, HasRequiredKeys } from "openapi-typescript-helpers";
import { Expand, IsEmptyObject } from "../util";
import { paths } from "./api";

export type HttpMethod =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";

/** Paths of specific Method T */
export type MethodPaths<M extends HttpMethod> = {
  [K in keyof paths]: M extends keyof paths[K] ? K : never;
}[keyof paths];

/** Method of Specific Method P */
export type PathMethod<T extends keyof paths> = keyof paths[T];

/** Rest Parameter of client.GET/POST/.. */
export type Init<
  M extends HttpMethod,
  P extends MethodPaths<M>,
> = HasRequiredKeys<FetchOptions<FilterKeys<paths[P], M>>> extends never
  ? [(FetchOptions<FilterKeys<paths[P], M>> | undefined)?]
  : [FetchOptions<FilterKeys<paths[P], M>>];

/** Response types of Path P */
export type PathResponses<
  P extends keyof paths,
  M extends PathMethod<P>,
> = paths[P][M] extends {
  responses: unknown;
}
  ? paths[P][M]["responses"]
  : never;

export type PathQuery<
  P extends keyof paths,
  M extends PathMethod<P>,
> = paths[P][M] extends {
  parameters: { query: { query: infer A } };
}
  ? A
  : undefined;

type successCode = 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226;

/** Scheme of Success Response */
type SuccessResponseScheme<R, T, M> = {
  result: R;
  request_to_response?: T;
  is_success: true;
  message: M;
};

/** Scheme of Error Response */
type ErrorResponseScheme<C, M> = {
  is_success: false;
  http_status_code: C;
  message: M;
};

/** Generated openapi-typescript's Success Response  */
type GenSuccResponse<
  Path extends keyof paths,
  Method extends PathMethod<Path>,
> = Pick<
  PathResponses<Path, Method>,
  Extract<keyof PathResponses<Path, Method>, successCode>
>;

/** Success Response */
export type SuccessResponse<
  Path extends keyof paths,
  Method extends PathMethod<Path>,
> = GenSuccResponse<Path, Method> extends {
  [key in number | string]?: {
    content: {
      "application/json": SuccessResponseScheme<infer R, infer T, infer M>;
    };
  };
}
  ? Expand<SuccessResponseScheme<R, T, M>> //Expand custom Utility type for better type hint in vscode.
  : never;

/** Generated openapi-typescript's Error Responses  */
type GenErrResponses<P extends keyof paths, M extends PathMethod<P>> = Omit<
  PathResponses<P, M>,
  successCode
>;

/** Error Responses */
export type ErrorResponse<
  Path extends keyof paths,
  Method extends PathMethod<Path>,
> = IsEmptyObject<GenErrResponses<Path, Method>> extends true
  ? undefined
  : GenErrResponses<Path, Method> extends {
      [key in number | string]: {
        content: {
          "application/json": ErrorResponseScheme<infer C, infer M>;
        };
      };
    }
  ? Expand<ErrorResponseScheme<C, M>>
  : undefined;

export type UnhandledExeption = {
  message: string;
  statusCode: number;
  error?: unknown;
};

/** Api response type from api server */
export type ApiResponse<
  Path extends keyof paths,
  Method extends PathMethod<Path>,
> =
  | SuccessResponse<Path, Method>
  | ErrorResponse<Path, Method>
  | UnhandledExeption;
