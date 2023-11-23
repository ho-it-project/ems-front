import { paths } from "@/types/api/api";
import createClient, {
  HeadersOptions,
  defaultQuerySerializer,
} from "openapi-fetch";

export async function api<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(input, init).then((res) => {
    return res.json() as Promise<T>;
  });
}

export const client = (option?: { headers?: HeadersOptions }) =>
  createClient<paths>({
    baseUrl: "/api",
    querySerializer: (q) => defaultQuerySerializer(q.query),
    ...(option ?? {}),
    // new URLSearchParams(
    //   Object.fromEntries(
    //     Object.entries(
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       "query" in q ? (q.query as Record<string, any>) : {}
    //     ).map(([key, value]) => [key, value.toString()])
    //   )
    // ).toString(),
  });
