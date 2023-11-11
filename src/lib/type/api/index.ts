export * from "./ambulance_company";
export * from "./auth";

export type Status = "ACTIVE" | "INACTIVE" | "DELETED";
interface Success_<T> {
  /**
   * @type T
   * @description 요청에 대한 응답
   */
  result: T;

  /**
   * @type number
   * @description 요청부터 응답까지 걸린 시간
   */
  request_to_response: number;

  /**
   * @type boolean
   * @description 요청이 성공했는지 여부
   */
  is_success: true;

  http_status_code: number;

  /**
   * @type string
   * @description 요청에 대한 메시지
   */
  message: string;
}

interface Fail_ {
  /**
   * @type boolean
   * @description 요청이 성공했는지 여부
   */
  is_success: false;

  http_status_code: number;

  /**
   * @type string
   * @description 요청에 대한 메시지
   */
  message: string;
}

export type Try<T> = Success_<T> | Fail_;
export type Success<T extends Try<unknown>> = Extract<T, { is_success: true }>;
export type Fail<T extends Try<unknown>> = Extract<T, { is_success: false }>;

export type UnhandledExeption = {
  message: string;
  statusCode: number;
  error?: unknown;
};