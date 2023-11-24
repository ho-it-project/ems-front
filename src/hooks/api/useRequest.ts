import { toast } from "@/components/ui/use-toast";
import { EMS_REQUEST_ER, EMS_REQUEST_ER_RESPONSE } from "@/constant";
import { useRequestStore } from "@/store/request.store";
import { useSocketStore } from "@/store/socket.store";
import { RequestInfo, reqeustStatueKorMap } from "@/types/model/request";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const router = useRouter();

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
  const requestSocket = useSocketStore(
    useShallow((state) => state.requestSocket)
  );

  const { data, isLoading } = useGetApi(
    "/requests/ems-to-er/ems",
    { useLoader: true },
    {
      params: {
        query: { query: { ...query } },
      },
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
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
  }, [data, setRequestList]);

  useEffect(() => {
    if (!requestSocket) return;

    requestSocket.on("connect", () => {
      console.log("socket connected");
    });
    // 응답 관련
    requestSocket.on(
      EMS_REQUEST_ER_RESPONSE,
      (newReq: {
        emergency_center_id: string;
        request_status: RequestInfo["request_status"];
      }) => {
        const { emergency_center_id, request_status } = newReq;
        if (request_status === "ACCEPTED") {
          setRequestList((prev) =>
            prev
              .filter(
                (prevReq) => prevReq.emergency_center_id === emergency_center_id
              )
              .map((prevReq) => {
                toast({
                  title: `${prevReq.emergency_center_name}`,
                  description: `${
                    reqeustStatueKorMap[newReq.request_status]
                  } 응답하였습니다`,
                });

                return { ...prevReq, request_status };
              })
          );
          router.push(`/emergency-center/${emergency_center_id}`);
          return;
        }
        setRequestList((prev) => {
          return prev.map((prevReq) => {
            if (prevReq.emergency_center_id === newReq.emergency_center_id) {
              toast({
                title: `${prevReq.emergency_center_name}`,
                description: `${
                  reqeustStatueKorMap[newReq.request_status]
                } 응답하였습니다`,
              });
            }
            return prevReq.emergency_center_id === newReq.emergency_center_id
              ? { ...prevReq, ...newReq }
              : prevReq;
          });
        });
      }
    );
    // 응답 업데이트관련

    requestSocket.on(EMS_REQUEST_ER, (data: RequestInfo) => {
      setRequestList((prev) => {
        if (
          prev.some(
            (prevReq) =>
              prevReq.emergency_center_id === data.emergency_center_id
          )
        )
          return prev;
        return [...prev, data];
      });
    });
  }, [requestSocket, router, setRequestList]);

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
  };
};
