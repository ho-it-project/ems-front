"use client";

import { useRequest } from "@/hooks/api/useRequest";
import Link from "next/link";
import { Timer } from "../module/common/Timer";

export const NavResponseStatusCard = () => {
  const { rejectedRequests, requestedRequests, requests, requestDate } =
    useRequest();

  const rejectedCount = rejectedRequests.length;
  const requestedCount = requestedRequests.length;

  if (requests.length === 1 && requests[0].request_status === "ACCEPTED") {
    return (
      <div className="fontSize-small flex w-full flex-col gap-[1rem]">
        <div>
          <Timer
            startTime={requestDate}
            className="fontSize-small-l text-grey"
          />
        </div>
        <Link href={"/patient/transfer"}>
          <div className="fontSize-medium flex w-full flex-col items-center rounded-lg bg-main py-[0.4rem] text-white">
            <span>수락되었습니다!</span>
            <span>이송처리하러가기</span>
          </div>
        </Link>
      </div>
    );
  }

  if (requests.length === 1 && requests[0].request_status === "TRANSFER") {
    return (
      <div className="fontSize-small flex w-full flex-col gap-[1rem]">
        <div>
          <Timer
            startTime={requestDate}
            className="fontSize-small-l text-grey"
          />
        </div>
        <Link href={"/patient/transfer"}>
          <div className="fontSize-medium flex w-full flex-col items-center rounded-lg bg-main py-[0.4rem] text-white">
            <span>이송완료처리하러가기</span>
          </div>
        </Link>
      </div>
    );
  }
  if (
    requests.length === 1 &&
    requests[0].request_status === "TRANSFER_COMPLETED"
  ) {
    return (
      <div className="fontSize-small flex w-full flex-col gap-[1rem]">
        <div>
          <Timer
            startTime={requestDate}
            className="fontSize-small-l text-grey"
          />
        </div>
        <Link href={"/patient/handover"}>
          <div className="fontSize-medium flex w-full flex-col items-center rounded-lg bg-main py-[0.4rem] text-white">
            <span>인수인계 대기중</span>
          </div>
        </Link>
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
