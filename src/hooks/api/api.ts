import { client } from "@/lib/api";
import {
  Init,
  PathMethod,
  PathsWithMethod,
  Res,
  SuccessRes,
} from "@/types/api";
import { paths } from "@/types/api/api";
import { env } from "process";
import useSWR from "swr";

export type Path = keyof paths;

function commonLogic<
  P extends keyof paths,
  T extends Res<SuccessRes<P, PathMethod<P>>>,
>(data: T, error: unknown) {
  if (data && "statusCode" in data) {
    if (env.NEXT_PUBLIC_NODE_ENV == "dev") throw new Error(data.message);
    else return { data: undefined, error: undefined };
  }
  if (env.NEXT_PUBLIC_NODE_ENV == "dev" && error)
    throw new Error(error as string);

  if (!data) return { data: undefined, error: undefined };

  if (!data.is_success)
    return {
      data: undefined,
      error: data,
    };
  return { data: data.result, error: undefined };
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
  const data = data_ as Res<SuccessRes<P, "get">>; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, typeof data>(data, error);
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
  const data = data_ as Res<SuccessRes<P, "post">>; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, typeof data>(data, error);
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
  const data = data_ as Res<SuccessRes<P, "patch">>; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, typeof data>(data, error);
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
  const data = data_ as Res<SuccessRes<P, "put">>; //모든 response는 Success | Fail정보를 따름

  return commonLogic<P, typeof data>(data, error);
}
