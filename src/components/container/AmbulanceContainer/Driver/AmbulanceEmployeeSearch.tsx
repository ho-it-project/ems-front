import { Input } from "@/components/elements/Input";
import { PathQuery } from "@/types/api";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export const SearchContainer = ({
  setQuery,
}: {
  setQuery: Dispatch<SetStateAction<PathQuery<"/ems/employees", "get">>>;
}) => {
  const searchTypes = { 이름: "employee_name", ID: "id_card" } as const;
  const [_searchType, set_searchType] =
    useState<keyof typeof searchTypes>("ID");
  const [_search, set_search] = useState<string>("");
  return (
    <div className="flex gap-[1rem]">
      <div className="fontSize-small rounded-lg border-[0.2rem] border-main px-[1.2rem]  text-main">
        <div className="flex items-center gap-[0.6rem]">
          <select
            name="role"
            onChange={(e) =>
              set_searchType(e.currentTarget.value as keyof typeof searchTypes)
            }
            value={_searchType}
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
            value={_search}
            onChange={({ currentTarget }) => set_search(currentTarget.value)}
            border="none"
          />
          <button
            className="fontSize-small px-[1.2rem] py-[0.8rem] text-main"
            onClick={() =>
              setQuery({
                search: _search,
                search_type: searchTypes[_searchType],
              })
            }
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
      {/* <AmbulanceInfoPopUpButton title="차량 추가하기" /> */}
    </div>
  );
};
