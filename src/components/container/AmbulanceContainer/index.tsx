"use client";
import { AmbulancePageHeader } from "@/components/module/Ambulance/AmbulancePageHeader";
import {
  AmbulanceTable,
  searchTypes,
} from "@/components/module/Ambulance/AmbulanceTable";
import { useAbmulance } from "@/hooks/api/useAmbulance";
import { useState } from "react";

export const AmbulanceContainer = () => {
  const { ambulanceInfo } = useAbmulance();
  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] =
    useState<keyof typeof searchTypes>("차량번호");

  return (
    <div className="h-full w-full">
      <AmbulancePageHeader
        setSearch={setSearch}
        setSearchType={setSearchType}
      />
      <div className="mt-[2.5rem] h-full">
        {ambulanceInfo && (
          <AmbulanceTable
            ambulanceList={ambulanceInfo}
            search={search}
            searchType={searchType}
          />
        )}
      </div>
    </div>
  );
};
