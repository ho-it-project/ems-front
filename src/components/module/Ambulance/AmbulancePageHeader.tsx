import { PageHeader } from "@/components/elements/PageHeader";
import Image from "next/image";
import { AmbulanceInfoPopUpButton } from "./AmbulanceInfoPopUpButton";

export const AmbulancePageHeader = () => {
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
        <button className="fontSize-small rounded-lg border-[0.2rem] border-main px-[1.2rem] py-[0.8rem] text-main">
          <div className="flex items-center gap-[0.6rem]">
            <Image
              src="/icon/icon-search.png"
              width={24}
              height={24}
              alt="search"
            />
            검색하기
          </div>
        </button>{" "}
        <AmbulanceInfoPopUpButton title="차량 추가하기" />
      </div>
    </PageHeader>
  );
};
