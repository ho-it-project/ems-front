"use client";
import { RequestInfoPageHeader } from "@/components/module/RequestInfo/Header";
import { RequestTable } from "@/components/module/RequestInfo/Table";

export const RequestInfoContainer = () => {
  return (
    <div className=" h-full w-full px-[0.4rem] py-[1.6rem]">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="mb-[1rem]">
          <RequestInfoPageHeader />
        </div>
        <div className="h-full w-full overflow-hidden">
          <RequestTable />
        </div>
      </div>
    </div>
  );
};
