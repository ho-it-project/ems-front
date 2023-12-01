import { paths } from "./api/api";

type ApiUrls = `/api${keyof paths}`;

type Params<T extends string> = T extends `${string}{${infer P}}${infer R}`
  ? [P, ...Params<R>]
  : [];

type ParamObj<T extends string> = {
  [key in Params<T>[number]]: string | number;
};

export const apiUrlBuilder = <T extends ApiUrls>(
  endpoint: T,
  paramObj: ParamObj<T>
) => {
  const url = endpoint.replace(/{\w+}/g, (match) => {
    const key = match.replace("{", "").replace("}", "");
    return paramObj[key as Params<T>[number]] as string;
  });
  return url;
};
