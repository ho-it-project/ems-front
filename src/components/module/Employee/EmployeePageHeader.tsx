import { Input } from "@/components/elements/Input";
import { PageHeader } from "@/components/elements/PageHeader";
import Image from "next/image";
import { useState } from "react";
import { EmployeeInfoPopUpButton } from "./EmployeeInfoPopUpButton";
const searchTypes = ["이름", "ID"] as const;

export const EmployeePageHeader = ({
  onSearch,
}: {
  onSearch: (
    searchType: (typeof searchTypes)[number],
    value: string
  ) => () => void;
}) => {
  const [searchType, setSearchType] =
    useState<(typeof searchTypes)[number]>("ID");
  const [value, setValue] = useState<string>("");
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
        <div className="fontSize-small rounded-lg border-[0.2rem] border-main px-[1.2rem] py-[0.8rem] text-main">
          <div className="flex items-center gap-[0.6rem]">
            {/* 검색 */}
            <select
              name="role"
              onChange={(e) =>
                setSearchType(
                  e.currentTarget.value as (typeof searchTypes)[number]
                )
              }
              value={searchType}
              className="bg-white  text-center text-main"
            >
              {searchTypes.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="h-6 self-center border-r-2 border-gray-300" />
            <Input
              // placeholder="ID를 입력하세요"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              border="none"
              width="w-[80%]"
              inputBoxClassName="h-[24px]"
            />
            <button onClick={onSearch(searchType, value)}>
              <Image
                src="/icon/icon-search.png"
                width={24}
                height={24}
                alt="search"
              />
            </button>
          </div>
        </div>
        <EmployeeInfoPopUpButton title="직원 추가하기" />
      </div>
    </PageHeader>
  );
};
