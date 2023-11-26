"use client";
import { useProfile } from "@/hooks/api/useProfile";
import { cn } from "@/lib/utils";
import { useRequestStore } from "@/store/request.store";
import Link from "next/link";
import { useState } from "react";
import { KakaoMap } from "../module/common/KakaoMap";
import { MenuCard } from "./MenuCard";
import { NavResponseStatusCard } from "./NavResponseStatusCard";

interface NavProps {
  shadow?: "large" | "medium";
}

export const Nav = ({ shadow = "medium" }: NavProps) => {
  const { profile } = useProfile();
  const topSectionClass = cn(`
    flex-1
    flex flex-col
    gap-[2rem]
    bg-transparent 
  `);
  const [focusMap, setFocusMap] = useState<boolean>(false);
  const onClickMapHandlerFocus = () => {
    setFocusMap(true);
  };
  const onClickMapHandlerUnFocus = () => {
    setFocusMap(false);
  };
  const { requests } = useRequestStore();
  return (
    <div className="flex h-full w-[18.3rem] min-w-[18.3rem] flex-col gap-[2rem] bg-transparent ">
      <div className={`${topSectionClass}`}>
        <MenuCard size="large" shadow={shadow}>
          <div
            className="h-full w-full p-[1rem]"
            onClick={() => {
              !focusMap && onClickMapHandlerFocus();
            }}
          >
            {focusMap && (
              <button
                className="h-full w-full"
                onClick={onClickMapHandlerUnFocus}
              >
                축소
              </button>
            )}
            <div
              className={cn(
                "h-full w-full ",
                focusMap &&
                  "absolute bottom-0 right-0 h-[50%] w-[50%] -translate-x-[50%] -translate-y-[50%] "
              )}
            >
              <KakaoMap focus={focusMap} />
            </div>
          </div>
        </MenuCard>
        <MenuCard size="small" shadow={shadow}>
          <Link href={"/my"} className="h-full w-full">
            <div className="flex h-full w-full items-center gap-[1rem] p-[1.2rem]">
              <div className="h-[5rem] w-[5rem] rounded-full bg-lgrey" />
              <div className="flex flex-1 flex-col">
                <div className="fontSize-regular text-main">
                  {profile.user?.employee_name}
                </div>
                <div className="fontSize-small-l">
                  {profile.company?.ambulance_company_name}
                </div>
              </div>
            </div>
          </Link>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <div>메세지</div>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <Link
            href={"/emergency-center"}
            className="flex h-full w-full items-center justify-center"
          >
            <div>주변 응급실 찾기</div>
          </Link>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <div>환자 정보 수정하기</div>
        </MenuCard>
      </div>

      <div className="relative">
        <div className="relative top-[1rem] z-[5] rounded-t-lg bg-lgrey bg-opacity-30 px-[1.2rem] py-[1rem] pb-[2rem]">
          {requests.length > 0 && <NavResponseStatusCard />}
        </div>
        <div className="relative z-[10]">
          <MenuCard shadow={shadow}>
            {requests.length > 0 ? (
              <Link
                href={"/response"}
                className="flex h-full w-full items-center justify-center"
              >
                <div>수용 요청 확인하기</div>
              </Link>
            ) : (
              <Link
                href={"/request"}
                className="flex h-full w-full items-center justify-center"
              >
                <div>수용 요청하기</div>
              </Link>
            )}
          </MenuCard>
        </div>
      </div>
    </div>
  );
};
