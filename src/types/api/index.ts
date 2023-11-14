export * from "./ambulance_company";
export * from "./auth";
export * from "./openapi-type";
export interface Success {
  result: unknown;
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

export type Res = Success | Fail;

export type UnhandledExeption = {
  message: string;
  statusCode: number;
  error?: unknown;
};
