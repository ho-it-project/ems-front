import { EMS_REQUEST_ER, EMS_REQUEST_ER_RESPONSE } from "@/constant";
import { IO } from "@/lib/utils/IO";
import { useAuth } from "@/providers/AuthProvider";
import { RequestInfo } from "@/types/model/request";
import { useEffect } from "react";
import { usePatient } from "../api/usePatient";
import { useRequest } from "../api/useRequest";

export const useRequestSocket = () => {
  const { accessToken } = useAuth();
  const socket = IO("/request", accessToken);
  const { patient } = usePatient();
  const { setRequestList, sort, ...rest } = useRequest();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      console.log(socket);
    });
    // 응답 관련
    socket.on(EMS_REQUEST_ER_RESPONSE, (data) => {
      console.log("request", data);
    });
    // 응답 업데이트관련

    socket.on(EMS_REQUEST_ER, (data: RequestInfo) => {
      console.log("request", data);
      setRequestList((prev) => [...prev, data]);
    });
    socket.on("disconnect", () => {});
    return () => {
      socket.disconnect();
    };
  }, [socket, patient, setRequestList]);
  return { setRequestList, sort, socket, ...rest };
};
