import { ErrorResponse, PathMethod, SuccessResponse } from ".";
import { paths } from "./api";

export * from "./ambulance_company";
export * from "./auth";
export * from "./openapi-type";

export type Response<P extends keyof paths, M extends PathMethod<P>> = {
  //성공시(data), message, is_success, request_to_response는 필요 없음.
  data: undefined | SuccessResponse<P, M>["result"];
  error: undefined | ErrorResponse<P, M>;
};
