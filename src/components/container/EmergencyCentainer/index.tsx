"use client";

import { EmergencyCenterList } from "@/components/module/EmergencyCenter/EmergencyCenterList";
import { EmergencyCenterPageHeader } from "@/components/module/EmergencyCenter/EmergencyCenterPageHeader";
import { useEffect, useRef, useState } from "react";

export const EmergencyCenterContainer = () => {
  const emergencyCenterListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(emergencyCenterListRef?.current?.scrollHeight);
  }, []);
  const [emergecyCenters, setEmergencyCenters] = useState([
    {
      emergency_center_name: "test",
      emergency_center_type: "test",
      distance: "test",
      emergency_center_address: "test",
      phone_number: "test",
    },
    {
      emergency_center_name: "test",
      emergency_center_type: "test",
      distance: "test",
      emergency_center_address: "test",
      phone_number: "test",
    },
    {
      emergency_center_name: "test",
      emergency_center_type: "test",
      distance: "test",
      emergency_center_address: "test",
      phone_number: "test",
    },
    {
      emergency_center_name: "test",
      emergency_center_type: "test",
      distance: "test",
      emergency_center_address: "test",
      phone_number: "test",
    },
    {
      emergency_center_name: "test",
      emergency_center_type: "test",
      distance: "test",
      emergency_center_address: "test",
      phone_number: "test",
    },
  ]);

  return (
    <div className=" h-full w-full px-[2rem] py-[1.6rem]">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="mb-[1rem]  pr-[4rem]">
          <EmergencyCenterPageHeader />
        </div>
        <div
          className="h-full w-full overflow-scroll pr-[4rem]"
          ref={emergencyCenterListRef}
          onScroll={(e) => {
            if (
              e.currentTarget?.scrollHeight - e.currentTarget?.scrollTop ===
              e.currentTarget?.clientHeight
            ) {
              console.log("fetch more");
              setEmergencyCenters((prev) => [
                ...prev,
                ...new Array(5).fill(prev[0]),
              ]);
            }
          }}
        >
          <EmergencyCenterList emergency_center_list={emergecyCenters} />
        </div>
      </div>
    </div>
  );
};
