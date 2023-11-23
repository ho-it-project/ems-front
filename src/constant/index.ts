// SOCKET CONSTANTS
export const SOCKET_SERVER = process.env.NEXT_PUBLIC_SOCKET_SERVER;
export const EMS_REQUEST_ER_RESPONSE = "ems-request-er-response";
export const EMS_REQUEST_ER = "ems-request-er";
export const EMS_REQUEST_ER_UPDATE = "ems-request-er-update";

// SSR API CONSTANTS

const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
export const API_SERVER = `${protocol}://api.${domain}/${apiPrefix}`;
