import { api } from "@/lib/api";
import { env } from "@/lib/constants";
import { Fail, Try, UnhandledExeption } from "@/types/api";
import useSWR from "swr";

type UseSWRApiReturn<T> = {
  data: T | undefined;
  error: Fail | undefined;
};

/**
 *
 * @param input 요청보낼 url
 * @param init 요청 init
 * @returns
 *  - 연결 에러 등, fetch함수 자체에러(url 오류 등): dev 모드에서만 error throw
 *  - 서비스 에러: is_success에 따라 다름
 *    - `{is_success: true}`: response 데이터를 data에 담아 리턴
 *    - `{is_success: false}`: response 데이터를 error에 담아 리턴
 */
export function useSWRApi<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): UseSWRApiReturn<T> {
  //TODO: isLoading => Loader설정하기. -> useLoader 훅 만들기.
  //일괄 적용하겠습니다. 우선 data가 없는 경우 따로 빼서 간단히 처리해주세용..
  /** 예시
   * if(!data) return <div>Empty Data</div>;
   */
  const { data, error } = useSWR<Try<T> | UnhandledExeption>(
    input,
    (input: RequestInfo | URL) => api<Try<T>>(input, init)
  );

  if (data && "statusCode" in data) {
    if (env.NEXT_PUBLIC_NODE_ENV == "dev") throw new Error(data.message);
    else return { data: undefined, error: undefined };
  }
  if (env.NEXT_PUBLIC_NODE_ENV == "dev" && error) throw new Error(error);

  if (!data) return { data: undefined, error: undefined };

  if (!data.is_success)
    return {
      data: undefined,
      error: data as Fail,
    };
  return { data: data as T, error: undefined };
}
