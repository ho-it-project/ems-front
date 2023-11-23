import { RequestInfo } from "@/types/model/request";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { usePatient } from "../api/usePatient";
import { useRequest } from "../api/useRequest";

export const useRequestSocket = () => {
  const socket = io("/request");
  const { patient } = usePatient();
  const { setRequestList, sort, ...rest } = useRequest();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
      console.log(socket);
    });
    // 응답 관련

    socket.on("ems-request-er-response", (data) => {
      console.log("request", data);
    });
    // 응답 업데이트관련

    socket.on("ems-request-er", (data: RequestInfo) => {
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
