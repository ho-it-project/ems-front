"use client";
import { AmbulancePageHeader } from "@/components/module/Ambulance/AmbulancePageHeader";
import { AmbulanceTable } from "@/components/module/Ambulance/AmbulanceTable";

export const AmbulanceContainer = () => {
  return (
    <div className="h-full w-full">
      <AmbulancePageHeader />
      <div className="mt-[2.5rem] h-full">
        <AmbulanceTable />
      </div>
    </div>
  );
};
