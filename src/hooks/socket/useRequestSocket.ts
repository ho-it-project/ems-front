import { toast } from "@/components/ui/use-toast";
import {
  EMS_REQUEST_ER,
  EMS_REQUEST_ER_RESPONSE,
  EMS_REQUEST_ER_UPDATE,
} from "@/constant";
import { usePatientStore } from "@/store/patient.store";
import { useRequestStore } from "@/store/request.store";
import { useSocketStore } from "@/store/socket.store";
import { RequestInfo, reqeustStatueKorMap } from "@/types/model/request";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRequest } from "../api/useRequest";

// 소켓 핸들링 훅
export const useRequestSocket = () => {
  const router = useRouter();
  const setRequestList = useRequestStore(
    useShallow((state) => state.setRequestList)
  );
  const setPatient = usePatientStore((state) => state.setPatient);
  const requestSocket = useSocketStore(
    useShallow((state) => state.requestSocket)
  );
  const { mutate } = useRequest();
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
    requestSocket.on(EMS_REQUEST_ER_UPDATE, (data: RequestInfo) => {
      const { request_status } = data;
      if (request_status === "COMPLETED") {
        toast({
          title: `환자 이송 완료`,
          description: `환자 이송이 완료되었습니다`,
        });
        // setRequestList([]);
        mutate();
        setPatient(undefined);
        router.push("/");
        return;
      }
    });
  }, [requestSocket, router, setRequestList, setPatient, mutate]);
  return { requestSocket };
};
