import { Button } from "@/components/elements/Button";
import { PageHeader } from "@/components/elements/PageHeader";
import Image from "next/image";
export const AmbulanceDriverPageHeaderContainer = () => {
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
      <Button
        text="저장하기"
        className="h-16 w-52 rounded-2xl text-xl text-white"
      />
    </PageHeader>
  );
};
