"use client";

import { useRequest } from "@/hooks/api/useRequest";
import { Timer } from "../module/common/Timer";

export const NavResponseStatusCard = () => {
  const { rejectedRequests, requestedRequests, requests, requestDate } =
    useRequest();

  const rejectedCount = rejectedRequests.length;
  const requestedCount = requestedRequests.length;

  if (requests.length === 1 && requests[0].request_status === "ACCEPTED") {
    const { emergency_center_name, distance } = requests[0];
    return (
      <div className="fontSize-small breaks-word">
        <div>이송 할 병원</div>
        <div>{emergency_center_name}</div>
        <div>거리: {(distance / 1000).toFixed(2)} KM </div>
      </div>
    );
  }

  return (
    <div className="fontSize-small flex w-full flex-col gap-[1rem]">
      <div>
        <Timer startTime={requestDate} className="fontSize-small-l text-grey" />
      </div>
      <div className="flex justify-between">
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-sm border border-main">
          <div>
            <div className="flex items-center justify-center text-main">
              요청
            </div>
            <div className="flex items-center justify-center">
              {requests.length}
            </div>
          </div>
        </div>
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center  rounded-sm border border-yellow">
          <div>
            <div className="flex items-center justify-center text-yellow">
              대기
            </div>
            <div className="flex items-center justify-center">
              {requestedCount}
            </div>
          </div>
        </div>
        <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center  rounded-sm border border-grey">
          <div>
            <div className="flex items-center justify-center text-grey">
              거절
            </div>
            <div className="flex items-center justify-center">
              {rejectedCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
