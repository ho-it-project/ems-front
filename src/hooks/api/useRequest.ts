import { useRequestStore } from "@/store/request.store";
import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
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
  const query = useRequestStore(useShallow((state) => state.query));
  const order = useRequestStore(useShallow((state) => state.order));
  const orderby = useRequestStore(useShallow((state) => state.orderby));
  const setRequestList = useRequestStore(
    useShallow((state) => state.setRequestList)
  );
  const requests = useRequestStore(useShallow((state) => state.requests));
  const requestedRequests = useRequestStore(
    useShallow((state) => state.requestedRequests)
  );
  const rejectedRequests = useRequestStore(
    useShallow((state) => state.rejectedRequests)
  );
  const requestDate = useRequestStore(useShallow((state) => state.requestDate));
  const sort = useRequestStore(useShallow((state) => state.sort));

  const { data, isLoading, refetch } = useGetApi(
    "/requests/ems-to-er/ems",
    { useLoader: true },
    {
      params: {
        query: { query: { ...query } },
      },
    }
  );

  useEffect(() => {
    if (data) {
      const { is_success } = data;
      if (is_success) {
        const { result } = data;
        const { request_list } = result;
        setRequestList((prev) => {
          return request_list.reduce((acc, cur) => {
            const { emergency_center_id } = cur;
            const isExist = acc.some(
              (prevReq) => prevReq.emergency_center_id === emergency_center_id
            );
            if (!isExist) {
              return [...acc, cur];
            }
            return acc;
          }, prev);
        });
      }
    }
  }, [data, setRequestList]);
  const mutate = useCallback(async () => {
    refetch().then((data) => {
      if (data) {
        const { is_success } = data;
        if (is_success) {
          const { result } = data;
          const { request_list } = result;
          setRequestList(request_list);
        }
      }
    });
  }, [refetch, setRequestList]);
  return {
    rejectedRequests,
    requestedRequests,
    requests,
    setRequestList,
    isLoading,
    order,
    orderby,
    requestDate,
    sort,
    mutate,
  };
};
