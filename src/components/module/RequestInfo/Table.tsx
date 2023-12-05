"use client";
import { Tag } from "@/components/elements/Tag";
import { useRequest } from "@/hooks/api/useRequest";
import { useRequestStore } from "@/store/request.store";
import { RequestInfo, reqeustStatueKorMap } from "@/types/model/request";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const RequestTable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [componentMounted, setComponentMounted] = useState(false);

  // 컴포넌트가 마운트되면 useRequestSocket 훅을 호출
  useEffect(() => {
    setComponentMounted(true);
  }, []);
  const { requests, rejectedRequests, requestedRequests, mutate } =
    useRequest();

  const { pageStatus } = useRequestStore();
  const [request_list, setRequestList] = useState<RequestInfo[]>([]);
  useEffect(() => {
    if (pageStatus === "ALL") {
      setRequestList(requests);
    }
    if (pageStatus === "REQUESTED") {
      setRequestList(requestedRequests);
    }
    if (pageStatus === "REJECTED") {
      setRequestList(rejectedRequests);
    }
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [pageStatus, requests, rejectedRequests, requestedRequests, ref]);

  useEffect(() => {
    mutate();
  }, [mutate]);
  if (!componentMounted) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main ">
        <div className="flex-[5]">응급실</div>
        <div className="flex-1">거리</div>
        <div className="flex-1">상태</div>
      </div>
      <div className="h-full overflow-scroll" ref={ref}>
        {request_list.length > 0 &&
          request_list.map((request, i) => {
            return (
              <div
                key={i}
                className="fontSize-regular flex min-h-[6rem]  border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
              >
                <Link
                  key={i}
                  href={`/emergency-center/${request.emergency_center_id}`}
                  className="flex-[5]"
                >
                  <div>{request.emergency_center_name}</div>
                </Link>

                <div className="flex-1">
                  {(request.distance / 1000).toFixed(2)}KM
                </div>
                <div className="flex-1">
                  <Tag
                    text={reqeustStatueKorMap[request.request_status]}
                    bgColor={
                      request.request_status === "ACCEPTED"
                        ? "main"
                        : request.request_status === "REJECTED"
                        ? "grey"
                        : request.request_status === "CANCELED"
                        ? "lgrey"
                        : request.request_status === "REQUESTED"
                        ? "yellow"
                        : request.request_status === "VIEWED"
                        ? "main30"
                        : request.request_status === "COMPLETED"
                        ? "main"
                        : "main"
                    }
                    color="white"
                    border="none"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
