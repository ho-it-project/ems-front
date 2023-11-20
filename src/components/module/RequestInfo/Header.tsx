"use client";
import { useWindowSize } from "@/hooks";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request.store";
import { useEffect, useState } from "react";

export const RequestInfoPageHeader = () => {
  const { width } = useWindowSize();
  const [status, setStatus] = useState<"ALL" | "REQUESTED" | "REJECTED">("ALL");
  const { setQueryStatus } = useRequestStore();
  useEffect(() => {}, [status]);
  const typeHandler = (status: "ALL" | "REQUESTED" | "REJECTED") => () => {
    setStatus(status);
    if (status === "ALL") {
      setQueryStatus([]);
      return;
    }
    if (status === "REQUESTED") {
      setQueryStatus(["REQUESTED", "VIEWED"]);
      return;
    }
    if (status === "REJECTED") {
      setQueryStatus(["REJECTED"]);
      return;
    }
  };

  return (
    <div
      className={cn(
        "flex justify-between",
        width && width < 1100 && "flex-col"
      )}
    >
      <div className="flex  items-center gap-[1rem]">
        <div
          onClick={typeHandler("ALL")}
          className={cn(status === "ALL" && "text-main")}
        >
          전체
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main " />
        <div
          onClick={typeHandler("REQUESTED")}
          className={cn(status === "REQUESTED" && "text-main")}
        >
          요청중
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main" />
        <div
          onClick={typeHandler("REJECTED")}
          className={cn(status === "REJECTED" && "text-main")}
        >
          요청거절
        </div>
      </div>
    </div>
  );
};
