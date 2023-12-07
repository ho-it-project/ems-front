"use client";
import { useEmergencyCenterList } from "@/hooks/api/useEmergencyCenterList";
import { useEmergencyCenterListStore } from "@/store/emergencyCenter.store";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { EmergencyCenterCard } from "./EmergencyCenterCard";

export const EmergencyCenterList = () => {
  const { emergencyCenters, isLoading } = useEmergencyCenterList();
  const emergencyCenterListRef = useRef<HTMLDivElement>(null);
  const { query, setQueryPage, pageLimit } = useEmergencyCenterListStore();
  useEffect(() => {
    if (emergencyCenterListRef.current) {
      emergencyCenterListRef.current.scrollTo(0, 0);
    }
  }, [query.emergency_center_type, query.search]);
  return (
    <div
      className="h-full w-full overflow-scroll pr-[4rem]"
      ref={emergencyCenterListRef}
      onScroll={(e) => {
        if (
          e.currentTarget?.scrollHeight -
            e.currentTarget?.scrollTop -
            e.currentTarget?.clientHeight <
            1 &&
          isLoading === false
        ) {
          if (query.page < pageLimit.total_page) {
            setQueryPage(query.page + 1);
          }
        }
      }}
    >
      {emergencyCenters.map((emergencyCenter, i) => {
        const { emergency_rooms } = emergencyCenter;

        return (
          <div key={i} className="mb-[2rem]">
            <div className="flex  w-full">
              <div className="min-w-[7.2rem]">{i + 1}</div>
              <Link
                href={`/emergency-center/${emergencyCenter.emergency_center_id}`}
                className="w-full"
              >
                <EmergencyCenterCard
                  emergencyCenter={emergencyCenter}
                  emergecyRooms={emergency_rooms.map((room) => {
                    const valiableCount = room.emergency_room_beds.filter(
                      (bed) => bed.emergency_room_bed_status === "AVAILABLE"
                    ).length;
                    return {
                      ...room,
                      valiableCount: valiableCount,
                      totalCount: room._count.emergency_room_beds,
                    };
                  })}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
