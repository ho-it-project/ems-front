"use client";
import { AmbulancePageHeader } from "@/components/module/Ambulance/AmbulancePageHeader";
import {
  AmbulanceTable,
  searchTypes,
} from "@/components/module/Ambulance/AmbulanceTable";
import { useAbmulanceList } from "@/hooks/api/useAmbulanceList";
import { useState } from "react";

export const AmbulanceContainer = () => {
  const { ambulanceList } = useAbmulanceList();
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
        {ambulanceList && (
          <AmbulanceTable
            ambulanceList={ambulanceList}
            search={search}
            searchType={searchType}
          />
        )}
      </div>
    </div>
  );
};
