import { Input } from "@/components/elements/Input";

export const EmergencyCenterPageHeader = () => {
  return (
    <div className="flex justify-between  ">
      <div className="flex w-full items-center gap-[1rem]">
        <span>전체</span>
        <span className="h-[2rem] w-[0.2rem] bg-main" />
        <span>권역응급의료센터</span>
        <span className="h-[2rem] w-[0.2rem] bg-main" />
        <span>지역응급의료센터</span>
        <span className="h-[2rem] w-[0.2rem] bg-main" />
        <span>지역응급의료기관</span>
      </div>
      <div>
        {
          // TODO:  검색 상태관리
        }
        <Input img="/icon/icon-search.png" value={""} readOnly />
      </div>
    </div>
  );
};
