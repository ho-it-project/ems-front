import { Init, MethodPaths, Response } from "@/types/api";
import {
  ApiResponse,
  ErrorResponse,
  PathMethod,
  SuccessResponse,
} from "@/types/api/openapi-type";
import { Expand } from "@/types/util";
import { env } from "process";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useLoading } from "../useLoading";
import { client } from "./../../lib/api";
import { paths } from "./../../types/api/api.d";

function commonLogic<P extends keyof paths, M extends PathMethod<P>>(
  data: ApiResponse<P, M>,
  error: unknown
): Expand<Response<P, M>> {
  if (data && "statusCode" in data) {
    if (env.NEXT_PUBLIC_NODE_ENV == "dev") throw new Error(data.message);
    else return { data: undefined, error: undefined };
  }
  if (env.NEXT_PUBLIC_NODE_ENV == "dev" && error)
    throw new Error(error as string);

  if (!data) return { data: undefined, error: undefined };
  if (data.is_success == false)
    return {
      data: undefined,
      error: data as ErrorResponse<P, M>,
    };

  return { data: data as SuccessResponse<P, M>, error: undefined };
}
export function useGetApi<P extends MethodPaths<"get">>(
  url: P,
  { useLoader = true }: { useLoader?: boolean },
  ...init: Init<"get", P>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "get">>>();
  const loader = useLoading();

  const {
    data: data_,
    error,
    isLoading: isLoadingSWR,
    mutate,
  } = useSWR({ url, init }, async (obj: { url: P; init: Init<"get", P> }) => {
    const { data, error } = await client.GET(obj.url, ...init);
    if (error) throw new Error(error as string);
    return data;
  });

  useEffect(() => {
    if (!isLoadingSWR && data_)
      setData(commonLogic<P, "get">(data_ as ApiResponse<P, "get">, error));
    if (useLoader) isLoadingSWR ? loader.on() : loader.off();
    setIsLoading(isLoadingSWR);
  }, [isLoadingSWR, data_]);

  // const data = data_ as ApiResponse<P, "get">; //모든 response는 Success | Fail정보를 따름
  return { isLoading, refetch: mutate, ...data };
}

export function usePostApi<P extends MethodPaths<"post">>(
  url: P,
  options?: { useLoader?: boolean }
) {
  if (options?.useLoader === undefined) options = { useLoader: true };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "post">>>();
  const loader = useLoading();
  const mutate = async (...body: Init<"post", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: data_, error } = await client.POST(url, ...body);
    const data = data_ as ApiResponse<P, "post">; //모든 response는 Success | Fail정보를 따름

    const result = commonLogic<P, "post">(data, error);
    setData(result);

    if (options?.useLoader) loader.off();
    setIsLoading(false);
    return result;
  };
  return { mutate, isLoading, ...data };
}

export function usePatchApi<P extends MethodPaths<"patch">>(
  url: P,
  options?: { useLoader?: boolean }
) {
  if (options?.useLoader === undefined) options = { useLoader: true };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "patch">>>();
  const loader = useLoading();
  const mutate = async (...body: Init<"patch", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: data_, error } = await client.PATCH(url, ...body);
    const data = data_ as ApiResponse<P, "patch">; //모든 response는 Success | Fail정보를 따름

    const result = commonLogic<P, "patch">(data, error);
    setData(result);

    if (options?.useLoader) loader.off();
    setIsLoading(false);
    return result;
  };
  return { mutate, isLoading, ...data };
}

export function usePutApi<P extends MethodPaths<"put">>(
  url: P,
  options?: { useLoader?: boolean }
) {
  if (options?.useLoader === undefined) options = { useLoader: true };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "put">>>();
  const loader = useLoading();
  const mutate = async (...body: Init<"put", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: data_, error } = await client.PUT(url, ...body);
    const data = data_ as ApiResponse<P, "put">; //모든 response는 Success | Fail정보를 따름

    const result = commonLogic<P, "put">(data, error);
    setData(result);

    if (options?.useLoader) loader.off();
    setIsLoading(false);
    return result;
  };
  return { mutate, isLoading, ...data };
}

export const delayTest = (ms: number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(ms);
    }, ms)
  );
};

/*
  backup: 1117
export const usePatchApi =
  <P extends MethodPaths<"patch">>(url: P) =>
  async (...body: Init<"patch", P>) => {
    const { data: data_, error } = await client.PATCH(url, ...body);
    if (error) throw new Error(error as string);

    const data = data_ as ApiResponse<P, "patch">; //모든 response는 Success | Fail정보를 따름

    return commonLogic<P, "patch">(data, error);
  };
  */
