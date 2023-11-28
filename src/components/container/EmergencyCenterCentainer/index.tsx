"use client";

import Spinner from "@/components/Spinner";
import { EmergencyCenterList } from "@/components/module/EmergencyCenter/EmergencyCenterList";
import { EmergencyCenterPageHeader } from "@/components/module/EmergencyCenter/EmergencyCenterPageHeader";
import { useEmergencyCenterList } from "@/hooks/api/useEmergencyCenterList";
import { useEmergencyCenterListStore } from "@/store/emergencyCenter.store";
import { useEffect, useRef } from "react";

export const EmergencyCenterContainer = () => {
  const emergencyCenterListRef = useRef<HTMLDivElement>(null);
  const { query, setQueryPage, pageLimit } = useEmergencyCenterListStore();
  const { emergencyCenters, isLoading } = useEmergencyCenterList();
  useEffect(() => {
    if (emergencyCenterListRef.current) {
      emergencyCenterListRef.current.scrollTo(0, 0);
    }
  }, [query.emergency_center_type, query.search]);
  return (
    <>
      {
        // 나중에 스피너 컴포넌트로 바꾸기
        isLoading && <Spinner />
      }
      <div className=" h-full w-full px-[0.4rem] py-[1.6rem]">
        <div className="flex h-full w-full flex-col overflow-hidden">
          <div className="mb-[1rem]  pr-[4rem]">
            <EmergencyCenterPageHeader />
          </div>
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
                  console.log("fetch");
                }
              }
            }}
          >
            <EmergencyCenterList emergency_center_list={emergencyCenters} />
          </div>
        </div>
      </div>
    </>
  );
};
