import { Tag } from "@/components/elements/Tag";
import { useWindowSize } from "@/hooks";
import { useRequestStore } from "@/store/request.store";
import { RequestInfo, reqeustStatueKorMap } from "@/types/model/request";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface RequestTableProps {
  request_list: RequestInfo[];
}

export const RequestTable = ({ request_list }: RequestTableProps) => {
  const { height } = useWindowSize();

  const ref = useRef<HTMLDivElement>(null);
  const { pageLimit, query, setQueryPage, setQueryLimit } = useRequestStore();
  useEffect(() => {
    if (height && height > 1340) {
      setQueryLimit(30);
    }
  }, [height, setQueryLimit]);
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.scrollHeight);
    }
  }, [ref, setQueryPage]);

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget?.scrollHeight -
        e.currentTarget?.scrollTop -
        e.currentTarget?.clientHeight <
      1
    ) {
      if (query.page < pageLimit.total_page) {
        request_list.length && setQueryPage(query.page + 1);
        console.log("fetch");
      }
    }
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  }, [query.request_status]);

  return (
    <div className="flex h-full flex-col">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main ">
        <div className="flex-[5]">응급실</div>
        <div className="flex-1">거리</div>
        <div className="flex-1">상태</div>
      </div>
      <div className="h-full overflow-scroll" ref={ref} onScroll={onScroll}>
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
                        ? "yellow"
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
