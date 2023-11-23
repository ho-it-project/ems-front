import { useRequestStore } from "@/store/request.store";
import { useCallback, useEffect } from "react";
import { useGetApi } from ".";

/**
 * 무한스크롤링으로 페이지네이션 할 경우
 * 소켓으로 실시간으로 데이터를 받아올때 중복데이터가 발생할 수 있음
 *
 * 요청 데이터는 이론상 1개~600개의 데이터가 생성되기에
 * 페이지네이션을 하지 않고 한번에 데이터를 받아오는 방법을 사용하는 것이 더 적합한 방법이라고 판단됨
 *
 */
export const useRequest = () => {
  const {
    query,
    setRequestList,
    rejectedRequests,
    requestedRequests,
    requests,
    order,
    orderby,
    ...rest
  } = useRequestStore();

  const { data, isLoading } = useGetApi(
    "/requests/ems-to-er/ems",
    { useLoader: true },
    {
      params: {
        query: { query: { ...query } },
      },
    }
  );

  const sort = useCallback(() => {
    setRequestList((prev) => {
      const sortedRequests = [...prev];
      if (orderby === "DISTANCE") {
        sortedRequests.sort((a, b) =>
          order ? a.distance - b.distance : b.distance - a.distance
        );
      }
      if (orderby === "TIME") {
        sortedRequests.sort((a, b) =>
          order
            ? new Date(a.request_date).getTime() -
              new Date(b.request_date).getTime()
            : new Date(b.request_date).getTime() -
              new Date(a.request_date).getTime()
        );
      }
      return sortedRequests;
    });
  }, [orderby, order, setRequestList]);
  useEffect(() => {
    sort();
  }, [sort]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      const { result } = data;
      const { request_list } = result;
      setRequestList((prev) => {
        if (prev.length === 0) {
          return request_list;
        }
        if (prev.length !== request_list.length) {
          return request_list;
        }
        return prev;
      });
    }
  }, [data, setRequestList]);

  return {
    rejectedRequests,
    requestedRequests,
    requests,
    setRequestList,
    isLoading,
    order,
    orderby,
    sort,
    ...rest,
  };
};
