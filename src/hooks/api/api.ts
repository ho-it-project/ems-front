import { client } from "@/lib/api";
import { Init, PathsWithMethod, Res, SuccessRes } from "@/types/api";
import { paths } from "@/types/api/api";
import { Error, PathMethod, Response } from "@/types/api/openapi-type";
import { env } from "process";
import useSWR from "swr";

export type Path = keyof paths;

function commonLogic<P extends keyof paths, M extends PathMethod<P>>(
  data: Res,
  error: unknown
): Response<P, M> {
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
      error: data as Error<P, M>,
    };

  return { data: data.result as SuccessRes<P, M>, error: undefined };
}
export function useGetApi<P extends PathsWithMethod<"get">>(
  url: P,
  ...init: Init<"get", P>
) {
  const { data: data_, error } = useSWR(
    { url, init },
    async (obj: { url: P; init: Init<"get", P> }) => {
      const { data, error } = await client.GET(obj.url, ...init);
      if (error) throw new Error(error as string);
      return data;
    }
  );
  const data = data_ as Res; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, "get">(data, error);
}

export function usePostApi<P extends PathsWithMethod<"post">>(
  url: P,
  ...init: Init<"post", P>
) {
  const { data: data_, error } = useSWR(
    { url, init },
    async (obj: { url: P; init: Init<"post", P> }) => {
      const { data, error } = await client.POST(obj.url, ...init);
      if (error) throw new Error(error as string);
      return data;
    }
  );
  const data = data_ as Res; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, "post">(data, error);
}

export function usePatchApi<P extends PathsWithMethod<"patch">>(
  url: P,
  ...init: Init<"patch", P>
) {
  const { data: data_, error } = useSWR(
    { url, init },
    async (obj: { url: P; init: Init<"patch", P> }) => {
      const { data, error } = await client.PATCH(obj.url, ...init);
      if (error) throw new Error(error as string);
      return data;
    }
  );
  const data = data_ as Res; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, "patch">(data, error);
}

export function usePutApi<P extends PathsWithMethod<"put">>(
  url: P,
  ...init: Init<"put", P>
) {
  const { data: data_, error } = useSWR(
    { url, init },
    async (obj: { url: P; init: Init<"put", P> }) => {
      const { data, error } = await client.PUT(obj.url, ...init);
      if (error) throw new Error(error as string);
      return data;
    }
  );
  const data = data_ as Res; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, "put">(data, error);
}
