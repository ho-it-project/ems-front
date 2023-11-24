"use client";
import { Toggle } from "@/components/elements/Toggle";
import { useWindowSize } from "@/hooks";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request.store";
import { useEffect } from "react";

export const RequestInfoPageHeader = () => {
  const { width } = useWindowSize();
  const order = useRequestStore((state) => state.order);
  const orderby = useRequestStore((state) => state.orderby);
  const setOrder = useRequestStore((state) => state.setOrder);
  const setOrderBy = useRequestStore((state) => state.setOrderBy);
  const sort = useRequestStore((state) => state.sort);
  const pageStatus = useRequestStore((state) => state.pageStatus);
  const setPageStatus = useRequestStore((state) => state.setPageStatus);

  const typeHandler = (status: "ALL" | "REQUESTED" | "REJECTED") => () => {
    setPageStatus(status);
  };

  const onClickOrder = () => {
    setOrder(!order);
  };
  const onClickOrderBy = () => {
    setOrderBy(orderby === "DISTANCE" ? "TIME" : "DISTANCE");
  };
  const onChageHandler = () => {
    ("");
  };
  useEffect(() => {
    sort();
  }, [order, orderby, sort]);

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
          className={cn(pageStatus === "ALL" && "text-main")}
        >
          전체
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main " />
        <div
          onClick={typeHandler("REQUESTED")}
          className={cn(pageStatus === "REQUESTED" && "text-main")}
        >
          요청중
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main" />
        <div
          onClick={typeHandler("REJECTED")}
          className={cn(pageStatus === "REJECTED" && "text-main")}
        >
          요청거절
        </div>
      </div>
      <div className="flex gap-[1rem]">
        <div
          className="fontSize-small flex items-center gap-[0.4rem]"
          onClick={onClickOrder}
        >
          오름차순
          <Toggle size="small" checked={order} onChange={onChageHandler} />
        </div>
        <div
          className="fontSize-small flex items-center gap-[0.4rem]"
          onClick={onClickOrderBy}
        >
          거리/시간
          <Toggle
            size="small"
            checked={orderby === "TIME"}
            onChange={onChageHandler}
          />
        </div>
      </div>
    </div>
  );
};
