import { PageHeader } from "@/components/elements/PageHeader";
import Image from "next/image";

export const MyEditContainer = () => {
  return (
    <div className="h-full w-full">
      <PageHeader
        title="프로필"
        fontSize="regular-l"
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
        LeftSectionClassName="gap-0"
      />
    </div>
  );
};
