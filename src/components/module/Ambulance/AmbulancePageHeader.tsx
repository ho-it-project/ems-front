import { Input } from "@/components/elements/Input";
import { PageHeader } from "@/components/elements/PageHeader";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { AmbulanceInfoPopUpButton } from "./AmbulanceInfoPopUpButton";
import { searchTypes } from "./AmbulanceTable";

export const AmbulancePageHeader = ({
  setSearch,
  setSearchType,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchType: Dispatch<
    SetStateAction<"차량번호" | "차종" | "유형" | "담당기사" | "팀원">
  >;
}) => {
  const [searchInternal, setSearchInternal] = useState<string>("");
  const [searchTypeInternal, setSearchTypeInternal] =
    useState<keyof typeof searchTypes>("차량번호");

  return (
    <PageHeader
      title="회사 정보"
      fontSize="small-l"
      color="grey"
      button={
        <button className="h-fit rounded-full text-[0.8rem] text-white">
          <Image
            src="/icon/back-arrow.svg"
            width={24}
            height={24}
            alt="back-arrow"
          />
        </button>
      }
    >
      <div className="flex gap-[1rem]">
        <div className="fontSize-small rounded-lg border-[0.2rem] border-main px-[1.2rem]  text-main">
          <div className="flex items-center gap-[0.6rem]">
            <select
              name="role"
              onChange={(e) =>
                setSearchTypeInternal(
                  e.currentTarget.value as keyof typeof searchTypes
                )
              }
              value={searchTypeInternal}
              className="bg-white  text-center text-main"
            >
              {Object.entries(searchTypes).map((searchType) => (
                <option value={searchType[0]} key={searchType[0]}>
                  {searchType[0]}
                </option>
              ))}
            </select>
            <div className="h-6 self-center border-r-2 border-gray-300" />
            <Input
              value={searchInternal}
              onChange={({ currentTarget }) =>
                setSearchInternal(currentTarget.value)
              }
              border="none"
            />
            <button
              className="fontSize-small px-[1.2rem] py-[0.8rem] text-main"
              onClick={() => {
                setSearch(searchInternal);
                setSearchType(searchTypeInternal);
              }}
            >
              <Image
                src="/icon/icon-search.png"
                width={24}
                height={24}
                alt="search"
              />
            </button>
          </div>
        </div>
        <AmbulanceInfoPopUpButton title="차량 추가하기" />
      </div>
    </PageHeader>
  );
};
