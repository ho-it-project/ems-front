import { useRequestStore } from "@/store/request.store";
import { RequestInfo } from "@/types/model/request";
import { useEffect } from "react";
import io from "socket.io-client";
import { usePatient } from "../api/usePatient";

export const useRequestSocket = () => {
  const socket = io(`/request`);
  const { patient } = usePatient();
  const { setRequestList } = useRequestStore();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });
    // 응답 관련
    socket.on("ems-request-er-response", (data) => {
      console.log("request", data);
    });

    // 응답 업데이트관련
    socket.on("ems-request-er-update", (data) => {
      console.log("request", data);
    });
    socket.on("ems-request-er", (data: RequestInfo) => {
      console.log("request", data);
      // setRequestList((prev) => {
      //   const index = prev.findIndex(
      //     (request) => request.emergency_center_id === data.emergency_center_id
      //   );
      //   if (orderBy && index === -1) {
      //     return [...prev, data];
      //   }
      //   if (!orderBy && index === -1) {
      //     return [...prev, data];
      //   }

      //   return [...prev];
      // });
    });
    socket.on("disconnect", () => {});
    return () => {
      socket.disconnect();
    };
  }, [socket, patient, setRequestList]);
  return {};
};
