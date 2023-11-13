"use client";

import { cn } from "@/lib/utils";
import {
  DCAP_BTLS_AFFECT,
  DCAP_BTLS_AFFECT_AREA_KOR,
  DCAP_BTLS_AFFECT_KEYS,
  DCAP_BTLS_AFFECT_KOR,
  DCAP_BTLS_AffectArea,
} from "@/types/evaluation";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DcapBtlsInfoCardProps {
  affected_area: DCAP_BTLS_AffectArea | "NONE";
  affect: DCAP_BTLS_AFFECT;
  description?: string;
  editMode?: boolean;
  editOnClick?: () => void;
  saveHandler?: () => void;
  deleteHandler?: () => void;
  selectAffectedHandler?: (affect: DCAP_BTLS_AFFECT) => void;
  selectAffectedAreaHandler?: (
    affectArea: DCAP_BTLS_AffectArea | "NONE"
  ) => void;
  descriptionHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
//TODO: 디자인 변경 이후 수정
export const DcapBtlsInfoCard = ({
  affected_area,
  description = "",
  editMode,
  affect,
  editOnClick,
  saveHandler,
  deleteHandler,
  selectAffectedHandler,
  selectAffectedAreaHandler,
  descriptionHandler,
}: DcapBtlsInfoCardProps) => {
  const selectBoxRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState<number>(0);
  const [affectArea, setAffectArea] = useState<DCAP_BTLS_AffectArea | "NONE">(
    affected_area
  );
  const [areaSelectOpen, setAreaSelectOpen] = useState(false);
  useEffect(() => {
    if (editMode && selectBoxRef.current) {
      const selectBox = selectBoxRef.current;
      const children = Array.from(selectBox.children);
      const totalWidth = children
        .slice(0, slide)
        .reduce((acc, child) => acc + child.clientWidth + 10, 0);
      selectBox.scrollTo({
        left: totalWidth,
        behavior: "smooth",
      });
    }
  }, [slide, editMode]);
  useEffect(() => {
    setAffectArea(affected_area);
  }, [affected_area]);

  const handlePrevClick = () => {
    setSlide((prevSlide) => Math.max(prevSlide - 1, 0));
  };

  const handleNextClick = () => {
    setSlide((prevSlide) =>
      Math.min(prevSlide + 1, DCAP_BTLS_AFFECT_KEYS.length - 1)
    );
  };
  if (editMode) {
    return (
      <div className="fontSize-medium-l flex w-full max-w-[72rem] flex-col gap-[1.2rem]  rounded-lg bg-white px-[1.6rem] pb-[2.1rem] pt-[1.2rem] text-main ">
        <div className="flex h-full items-center">
          <button onClick={handlePrevClick}>
            <ChevronLeft className="w-[3rem]" />
          </button>
          <div className="flex gap-[1rem] overflow-hidden " ref={selectBoxRef}>
            {DCAP_BTLS_AFFECT_KEYS.map((item, index) => (
              <div
                className={cn(
                  "flex flex-1 flex-col rounded-full px-[2rem]",
                  affect[item] ? "bg-main text-white" : "bg-white text-main"
                )}
                key={index}
                onClick={() => {
                  if (selectAffectedHandler) {
                    // Create a new object with all the existing properties of `affect`
                    const newAffect = { ...affect };
                    // Toggle the specific property based on `item`
                    newAffect[item] = !affect[item];
                    // Call the handler with the new object
                    selectAffectedHandler(newAffect);
                  }
                }}
              >
                <span>{item}</span>
                <span>{DCAP_BTLS_AFFECT_KOR[item]}</span>
              </div>
            ))}
          </div>
          <button onClick={handleNextClick}>
            <ChevronRight className="w-[3rem]" />
          </button>
        </div>
        <div className="relative flex gap-[1.6rem]">
          <div className=" flex h-[8rem] w-[15rem] flex-col justify-center rounded-lg  bg-white p-[2rem] shadow-lg ">
            <span
              className={cn(affectArea === "NONE" ? "text-lgrey" : "text-main")}
              onClick={() => setAreaSelectOpen(true)}
            >
              {affectArea !== "NONE"
                ? DCAP_BTLS_AFFECT_AREA_KOR[affectArea]
                : "부위선택하기"}
            </span>
          </div>
          <textarea
            className="flex-1 resize-none bg-white text-black"
            onChange={descriptionHandler}
            value={description}
          />
          <div className="flex flex-col justify-end">
            <button className="h-fit" onClick={deleteHandler}>
              <div className="flex bg-transparent">
                <X />
                삭제
              </div>
            </button>
          </div>
          <div className="flex flex-col justify-end">
            <button className="h-fit" onClick={saveHandler}>
              <div className="flex bg-transparent">
                <Check />
                저장
              </div>
            </button>
          </div>
          {areaSelectOpen && (
            <div className="absolute z-50 h-[30rem] w-[15rem] overflow-scroll rounded-lg bg-white ">
              {Object.entries(DCAP_BTLS_AFFECT_AREA_KOR).map((item, index) => (
                <div
                  key={index}
                  className="h-[5.3rem] px-[2.3rem] py-[1.4rem] hover:bg-bg"
                  onClick={() => {
                    selectAffectedAreaHandler &&
                      selectAffectedAreaHandler(
                        item[0] as DCAP_BTLS_AffectArea
                      );
                    setAreaSelectOpen(false);
                  }}
                >
                  {item[1]}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fontSize-medium-l w-full max-w-[72rem] text-main">
      <div className="flex w-full overflow-hidden rounded-lg">
        <div className="flex h-[8rem] w-[12rem] flex-col justify-center border-r bg-white text-center">
          {affected_area === "NONE"
            ? "선택"
            : DCAP_BTLS_AFFECT_AREA_KOR[affected_area]}
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
