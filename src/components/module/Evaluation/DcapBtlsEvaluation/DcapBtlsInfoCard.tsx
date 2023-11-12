"use client";

import { Tag } from "@/components/elements/Tag";
import {
  DCAP_BTLS_AFFECT_AREA_KOR,
  DCAP_BTLS_AffectArea,
} from "@/lib/type/evaluation";

interface DcapBtlsInfoCardProps {
  affected_area: DCAP_BTLS_AffectArea;
  deformity: boolean;
  contusion: boolean;
  abrasion: boolean;
  puncture: boolean;
  burn: boolean;
  tenderness: boolean;
  laceration: boolean;
  swelling: boolean;
  editMode?: boolean;
  editOnClick?: () => void;
}
//TODO: 디자인 변경 이후 수정
export const DcapBtlsInfoCard = ({
  affected_area,

  editMode,
  editOnClick,
}: DcapBtlsInfoCardProps) => {
  console.log("edit mode", editMode);
  if (editMode) {
    const DCAP_BTLS_AFFECT_AREA_KOR_KEYS = Object.keys(
      DCAP_BTLS_AFFECT_AREA_KOR
    ) as DCAP_BTLS_AffectArea[];

    return (
      <div className="fontSize-medium-l flex w-full max-w-[72rem]  flex-col gap-[1.2rem] overflow-hidden rounded-lg bg-white px-[1.6rem] pb-[2.1rem] pt-[1.2rem] text-main">
        <div className="flex w-full  flex-wrap justify-between gap-[0.8rem]">
          {DCAP_BTLS_AFFECT_AREA_KOR_KEYS.map((key) => (
            <Tag
              text={DCAP_BTLS_AFFECT_AREA_KOR[key]}
              key={key}
              color={key === affected_area ? "main" : "lgrey"}
              border={key === affected_area ? "large" : "normal"}
              fontSize="regular-l"
              className="h-fit w-fit rounded-[2.7rem] px-[1.4rem] py-[0.6rem]"
            />
          ))}
        </div>
        <div className="flex">
          {" "}
          <div className="flex h-[8rem] w-[15rem] flex-col justify-center rounded-lg  bg-white p-[2rem] shadow-lg ">
            <span>Abrasion</span>
            <span className="text-lgrey">철과상</span>
          </div>{" "}
        </div>
      </div>
    );
  }

  return (
    <div className="fontSize-medium-l w-full max-w-[72rem] text-main">
      <div className="flex w-full overflow-hidden rounded-lg">
        <div className="flex h-[8rem] w-[12rem] flex-col justify-center border-r bg-white text-center">
          {DCAP_BTLS_AFFECT_AREA_KOR[affected_area]}
        </div>
        <div className="flex h-[8rem] w-[15rem] flex-col justify-center border-x bg-white p-[2rem] ">
          <span>Abrasion</span>
          <span className="text-lgrey">철과상</span>
        </div>
        <div className="flex h-[8rem] flex-1 flex-col justify-center border-x bg-white  px-[1.6rem]">
          <div>타입</div>
        </div>
        <button
          className="w-[6rem] border-l bg-white text-lgrey"
          onClick={editOnClick}
        >
          수정
        </button>
      </div>
    </div>
  );
};
