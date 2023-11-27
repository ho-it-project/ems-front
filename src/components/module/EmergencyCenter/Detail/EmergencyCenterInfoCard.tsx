"use client";

import { Tag } from "@/components/elements/Tag";
import { cn } from "@/lib/utils";
import { EMERGENCY_CENTER_TYPE } from "@/store/emergencyCenter.store";
import { useRequestStore } from "@/store/request.store";
import { EmergencyCenter_ } from "@/types/emergencyCenter.type";
import { ReqeustStatueKor, reqeustStatueKorMap } from "@/types/model/request";
import { useEffect, useState } from "react";

interface EmergencyInfoCardProps {
  emergencyCenter: EmergencyCenter_;
}

export const EmergencyCenterInfoCard = ({
  emergencyCenter,
}: EmergencyInfoCardProps) => {
  const { requests } = useRequestStore();
  const [tag, setTag] = useState<ReqeustStatueKor | "">("");

  useEffect(() => {
    const request = requests.find(
      (request) =>
        request.emergency_center_id === emergencyCenter.emergency_center_id
    );
    if (request) {
      setTag(reqeustStatueKorMap[request.request_status]);
    }
  }, [requests, emergencyCenter]);

  return (
    <div className="flex h-fit gap-[5rem]">
      <div className="h-auto w-[24rem] rounded-lg bg-bg"></div>
      <div className="fontSize-regular-l  flex flex-1 flex-col justify-between ">
        <div className="grid grid-cols-5 grid-rows-2 items-center ">
          <p
            className={cn(
              "fontSize-xlarge col-span-4 row-span-2 text-main",
              emergencyCenter.emergency_center_name.length < 14
                ? "row-span-1"
                : "row-span-2"
            )}
          >
            {emergencyCenter.emergency_center_name}
          </p>
          <div>
            {tag && (
              <Tag
                text={tag}
                bgColor={
                  tag === "수락"
                    ? "main"
                    : tag === "요청"
                    ? "yellow"
                    : tag === "열람"
                    ? "main30"
                    : tag === "거절"
                    ? "grey"
                    : "main"
                }
                color="white"
                border="none"
                className="w-fit grid-cols-1 whitespace-nowrap px-[1.4rem]"
              />
            )}
          </div>
        </div>

        <div className="flex h-full flex-col justify-between gap-[1.6rem]">
          <div className="flex gap-[0.8rem]">
            <span className="h-[2.4rem] w-[2.4rem] rounded-full bg-bg" />
            <p>
              {EMERGENCY_CENTER_TYPE[emergencyCenter.emergency_center_type]}
            </p>
          </div>
          <div className="flex gap-[0.8rem]">
            <span className="h-[2.4rem] w-[2.4rem] rounded-full bg-bg" />
            <p>{emergencyCenter.emergency_center_primary_phone}</p>
          </div>

          <div className="flex gap-[0.8rem]">
            <span className="h-[2.4rem] w-[2.4rem] rounded-full bg-bg" />
            <p>{emergencyCenter.emergency_center_address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
