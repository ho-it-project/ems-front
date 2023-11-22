import { paths } from "@/types/api/api";
import createClient, { defaultQuerySerializer } from "openapi-fetch";

export async function api<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(input, init).then((res) => {
    return res.json() as Promise<T>;
  });
}

export const client = createClient<paths>({
  baseUrl: "/api",
  querySerializer: (q) => defaultQuerySerializer(q.query),
});
