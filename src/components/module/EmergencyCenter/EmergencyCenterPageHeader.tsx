"use client";
import { Input } from "@/components/elements/Input";
import { useWindowSize } from "@/hooks";
import { cn } from "@/lib/utils";
import { useEmergencyCenterListStore } from "@/store/emergencyCenter.store";
import { EmergencyCenterType } from "@/types/model/emergencyCenter";
import { useEffect, useState } from "react";

export const EmergencyCenterPageHeader = () => {
  const { width } = useWindowSize();
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const { query, setQueryType, setQeurySearch } = useEmergencyCenterListStore();
  const { emergency_center_type } = query;
  const [search, setSearch] = useState<string>("");
  const searchOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const searchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setQeurySearch(search);
    }
  };

  const typeHandler = (type?: EmergencyCenterType) => () => {
    if (!type) {
      setQueryType([]);
      return;
    }
    setQueryType([type]);
    setSearchMode(false);
    setSearch("");
  };

  const selectHandler = (type: EmergencyCenterType) => {
    return query.emergency_center_type.includes(type) ? "text-main" : "";
  };

  useEffect(() => {
    setSearchMode(false);
  }, [emergency_center_type]);

  return (
    <div
      className={cn(
        "flex justify-between",
        width && width < 1100 && "flex-col"
      )}
    >
      <div className="flex  items-center gap-[1rem]">
        <div
          onClick={typeHandler()}
          className={cn(emergency_center_type.length === 0 && "text-main")}
        >
          전체
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main " />
        <div
          onClick={typeHandler("REGIONAL_EMERGENCY_MEDICAL_CENTER")}
          className={cn(selectHandler("REGIONAL_EMERGENCY_MEDICAL_CENTER"))}
        >
          권역응급의료센터
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main" />
        <div
          onClick={typeHandler("LOCAL_EMERGENCY_MEDICAL_INSTITUTION")}
          className={cn(selectHandler("LOCAL_EMERGENCY_MEDICAL_INSTITUTION"))}
        >
          지역응급의료센터
        </div>
        <div className="h-[2rem] w-[0.2rem] bg-main" />
        <div
          onClick={typeHandler("LOCAL_EMERGENCY_MEDICAL_CENTER")}
          className={cn(selectHandler("LOCAL_EMERGENCY_MEDICAL_CENTER"))}
        >
          지역응급의료기관
        </div>
      </div>
      <div className={cn("flex flex-1 justify-end")}>
        <div
          onFocus={() => setSearchMode(true)}
          onBlur={() => !search?.length && setSearchMode(false)}
          className={cn(
            "max-w-[50rem] transition-all duration-300 ease-in-out "
          )}
          style={{
            width: searchMode ? "80%" : "20rem",
          }}
        >
          {
            // TODO:  검색 상태관리
          }
          <Input
            img="/icon/icon-search.png"
            value={search || ""}
            placeholder="검색하기"
            onChange={searchOnChangeHandler}
            className="transition-all duration-300 ease-in-out"
            type="search"
            textLocation="left"
            onKeyDown={searchHandler}
          />
        </div>
      </div>
    </div>
  );
};
