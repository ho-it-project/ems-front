export type BrandColor =
  | "main"
  | "main30"
  | "bg"
  | "white"
  | "black"
  | "grey"
  | "lgrey"
  | "red"
  | "yellow"
  | "transparent";

export type FontSize =
  | "small"
  | "small-l"
  | "regular"
  | "regular-l"
  | "medium"
  | "medium-l"
  | "large"
  | "large-l"
  | "xlarge"
  | "xlarge-l";

export interface Try<T> {
  /**
   * @type T
   * @description 요청에 대한 응답
   */
  result: T;

  /**
   * @type true
   * @description 요청이 성공했는지 여부
   */
  is_success: true;
  /**
   * @type number
   * @description 요청부터 응답까지 걸린 시간
   */
  request_to_response?: number;

  /**
   * @type string
   * @description 요청에 대한 메시지
   */
  message: string;
}

export * from "./response.dto";
