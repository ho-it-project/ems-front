import { client } from "@/lib/api";
import { env } from "@/lib/utils/envValidation";
import { useAuth } from "@/providers/AuthProvider";
import { Init, MethodPaths, Response } from "@/types/api";
import { paths } from "@/types/api/api.d";
import {
  ErrorResponse,
  PathMethod,
  SuccessResponse,
  UnhandledExeption,
} from "@/types/api/openapi-type";
import { Expand } from "@/types/util";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useLoading } from "../useLoading";

function isNotUnknown<P extends keyof paths, M extends PathMethod<P>>(
  error: unknown
): error is ErrorResponse<P, M> | UnhandledExeption {
  if (typeof error === "undefined") return true;
  if (typeof error !== "object") return false;
  if (
    typeof error === "object" &&
    error !== null &&
    !("statusCode" in error) &&
    !("is_success" in error)
  )
    return false;
  return true;
}

function commonLogic<P extends keyof paths, M extends PathMethod<P>>(
  data: SuccessResponse<P, M> | undefined,
  error: unknown
): Expand<Response<P, M>> {
  if (isNotUnknown<P, M>(error)) {
    //error is ErrorResponse, UnhandledException
    if (error && "statusCode" in error) {
      if (env.NEXT_PUBLIC_NODE_ENV == "dev")
        throw new Error(`${error.statusCode} ${error.error}: ${error.message}`);
      else return { data: undefined, error: undefined };
    }
    return { data, error };
  }
  //error is unknown("Internal server error" as string)
  if (env.NEXT_PUBLIC_NODE_ENV == "dev") throw new Error(error as string);
  else return { data: undefined, error: undefined };
}

export function useGetApi<P extends MethodPaths<"get">>(
  url: P,
  { useLoader = true }: { useLoader?: boolean },
  ...init: Init<"get", P>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "get">>>();
  const loader = useLoading();
  const { accessToken } = useAuth();
  const {
    data: getData,
    error: _error,
    isLoading: isLoadingSWR,
    mutate,
  } = useSWR({ url, init }, async (obj: { url: P; init: Init<"get", P> }) => {
    const { data, error } = await client({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).GET(obj.url, ...init);
    if (error) throw error;
    return data;
  });
  const _data = getData as SuccessResponse<P, "get">;
  // console.log("getApi", url, loader.id, _data, _error, isLoadingSWR);

  useEffect(() => {
    if (!isLoadingSWR && (_data || _error))
      setData(commonLogic<P, "get">(_data, _error));
    if (useLoader) isLoadingSWR ? loader.on() : loader.off();
    setIsLoading(isLoadingSWR);
  }, [isLoadingSWR, _data, _error, useLoader, loader]);

  return { isLoading, refetch: mutate, ...data };
}

export function usePostApi<P extends MethodPaths<"post">>(
  url: P,
  options?: { useLoader?: boolean }
) {
  if (options?.useLoader === undefined) options = { useLoader: true };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Expand<Response<P, "post">>>();
  const { accessToken } = useAuth();
  const loader = useLoading();
  const mutate = async (...body: Init<"post", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: _data, error: _error } = await client({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).POST(url, ...body);
    const data = _data as SuccessResponse<P, "post">; //모든 response는 Success | Fail정보를 따름
    const error = _error as
      | ErrorResponse<P, "post">
      | UnhandledExeption
      | unknown;

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
  const { accessToken } = useAuth();
  const [data, setData] = useState<Expand<Response<P, "patch">>>();
  const loader = useLoading();
  const mutate = async (...body: Init<"patch", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: _data, error: _error } = await client({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).PATCH(url, ...body);
    const data = _data as SuccessResponse<P, "patch">;
    const error = _error as
      | ErrorResponse<P, "patch">
      | UnhandledExeption
      | unknown;

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
  const { accessToken } = useAuth();
  const [data, setData] = useState<Expand<Response<P, "put">>>();
  const loader = useLoading();
  const mutate = async (...body: Init<"put", P>) => {
    if (options?.useLoader) loader.on();
    setIsLoading(true);

    const { data: _data, error: _error } = await client({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).PUT(url, ...body);
    const data = _data as SuccessResponse<P, "put">;
    const error = _error as
      | ErrorResponse<P, "put">
      | UnhandledExeption
      | unknown;
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
