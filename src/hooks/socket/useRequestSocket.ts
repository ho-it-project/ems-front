import { toast } from "@/components/ui/use-toast";
import { EMS_REQUEST_ER, EMS_REQUEST_ER_RESPONSE } from "@/constant";
import { useRequestStore } from "@/store/request.store";
import { useSocketStore } from "@/store/socket.store";
import { RequestInfo, reqeustStatueKorMap } from "@/types/model/request";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

// 소켓 핸들링 훅
export const useRequestSocket = () => {
  const router = useRouter();
  const setRequestList = useRequestStore(
    useShallow((state) => state.setRequestList)
  );

  const requestSocket = useSocketStore(
    useShallow((state) => state.requestSocket)
  );
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
          router.push(`/patient/transfer`);
          return;
        }
        setRequestList((prev) => {
          return prev.map((prevReq) => {
            if (prevReq.emergency_center_id === newReq.emergency_center_id) {
              console.log("새로운 응답");
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
  return { requestSocket };
};
