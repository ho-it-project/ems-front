"use client";
import { Tag } from "@/components/elements/Tag";
import { cn } from "@/lib/utils";

import { useRequestStore } from "@/store/request.store";
import {
  EMERGENCY_CENTER_TYPE,
  EMERGENCY_ROOM_TYPE_KOR,
  EmergencyCenterWithDistance,
  EmergencyRoom,
} from "@/types/model/emergencyCenter";
import { ReqeustStatueKor, reqeustStatueKorMap } from "@/types/model/request";
import { useEffect, useState } from "react";

interface EmergencyCenterCardProps {
  emergencyCenter: EmergencyCenterWithDistance;
  emergecyRooms: (EmergencyRoom & {
    valiableCount: number;
    totalCount: number;
  })[];
}

export const EmergencyCenterCard = ({
  emergencyCenter,
  emergecyRooms,
}: EmergencyCenterCardProps) => {
  const {
    emergency_center_name,
    emergency_center_type,
    distance,
    emergency_center_primary_phone,
    emergency_center_address,
  } = emergencyCenter;
  const [tag, setTag] = useState<ReqeustStatueKor | "">("");

  const { requests } = useRequestStore();

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
    <div className="relative flex w-full gap-[4rem] rounded-lg border border-main px-[4rem] py-[2.4rem]">
      {tag && (
        <div
          className={cn(
            "absolute left-[1rem] top-[1rem] h-[1rem] w-[1rem] rounded-full bg-black",
            tag === "수락"
              ? "bg-main"
              : tag === "요청" || tag === "열람"
              ? "bg-yellow"
              : tag === "거절"
              ? "bg-grey"
              : "bg-main"
          )}
        />
      )}
      <div className="flex max-w-[23rem] flex-[1]  flex-col gap-[0.6rem]">
        <h2 className="fontSize-xlarge flex-1">{emergency_center_name}</h2>
        <div className="fontSize-regular-l flex-1">
          {EMERGENCY_CENTER_TYPE[emergency_center_type]}
        </div>
        <div className="fontSize-large flex flex-1 items-end text-main">
          {(Number(distance) / 1000).toFixed(2)}km
        </div>
      </div>
      <div className="flex flex-[2] flex-col">
        <div className="flex flex-1  flex-col gap-[0.8rem]">
          <div className="fontSize-regular-l flex flex-[1] items-center">
            {emergency_center_primary_phone}
          </div>
          <div className="fontSize-regular-l flex flex-[2]  ">
            {emergency_center_address}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-end">
          {
            //TODO: 수용가능한 병실 표시
          }
          <div>
            {emergecyRooms.map((room) => {
              const { valiableCount, totalCount, emergency_room_type } = room;
              const ratio = valiableCount / totalCount;
              const color =
                ratio > 0.5 ? "main" : ratio > 0.3 ? "yellow" : "red";
              return (
                <Tag
                  key={room.emergency_room_id}
                  text={EMERGENCY_ROOM_TYPE_KOR[emergency_room_type]}
                  width="w-fit"
                  className="mr-[1rem] inline-block px-[1rem] py-[0.4rem]"
                  color={color}
                  borderColor={color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
