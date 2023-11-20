"use client";
import { useWindowSize } from "@/hooks";
import { cn } from "@/lib/utils";

export const RequestInfoPageHeader = () => {
  const { width } = useWindowSize();

  return (
    <div
      className={cn(
        "flex justify-between",
        width && width < 1100 && "flex-col"
      )}
    >
      <div className="flex  items-center gap-[1rem]">
        <div
        //   onClick={typeHandler()}
        //   className={cn(emergency_center_type.length === 0 && "text-main")}
        >
          전체
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main " />
        <div
        //   onClick={typeHandler("REGIONAL_EMERGENCY_MEDICAL_CENTER")}
        //   className={cn(selectHandler("REGIONAL_EMERGENCY_MEDICAL_CENTER"))}
        >
          요청중
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main" />
        <div
        //   onClick={typeHandler("LOCAL_EMERGENCY_MEDICAL_INSTITUTION")}
        //   className={cn(selectHandler("LOCAL_EMERGENCY_MEDICAL_INSTITUTION"))}
        >
          요청거절
        </div>
      </div>
    </div>
  );
};
