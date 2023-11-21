"use client";
import { RequestInfoPageHeader } from "@/components/module/RequestInfo/Header";
import { RequestTable } from "@/components/module/RequestInfo/Table";
import { useRequest } from "@/hooks/api/useRequest";
import { useEffect } from "react";

export const RequestInfoContainer = () => {
  const { request_list } = useRequest();
  useEffect(() => {
    console.log(request_list);
  }, [request_list]);
  return (
    <div className=" h-full w-full px-[0.4rem] py-[1.6rem]">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="mb-[1rem]  pr-[4rem]">
          <RequestInfoPageHeader />
        </div>
        <div className="h-full w-full overflow-hidden">
          <RequestTable request_list={request_list} />
        </div>
      </div>
    </div>
  );
};
