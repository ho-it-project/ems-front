"use client";
import { RequestInfoPageHeader } from "@/components/module/RequestInfo/Header";
import { RequestTable } from "@/components/module/RequestInfo/Table";

export const RequestInfoContainer = () => {
  return (
    <div className="h-full w-full">
      <div className="h-full w-full px-[0.4rem] py-[1.6rem]">
        <RequestInfoPageHeader />
        <div className="mt-[2rem] h-full">
          <RequestTable />
        </div>
      </div>
    </div>
  );
};
