"use client";
import { cn } from "@/lib/utils";
import { MenuCard } from "./MenuCard";

interface NavProps {
  shadow?: "large" | "medium";
}

export const Nav = ({ shadow = "medium" }: NavProps) => {
  const topSectionClass = cn(`
    flex-1
    flex flex-col
    gap-[2rem]
  `);

  return (
    <div className="flex h-full w-[18.3rem] min-w-[18.3rem] flex-col gap-[2rem] bg-transparent ">
      <div className={`${topSectionClass}`}>
        <MenuCard size="large" shadow={shadow}>
          <div></div>
        </MenuCard>
        <MenuCard size="small" shadow={shadow}>
          <div></div>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <div>메세지</div>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <div>주변 응급실 찾기</div>
        </MenuCard>
        <MenuCard shadow={shadow}>
          <div>환자 정보 수정하기</div>
        </MenuCard>
        <MenuCard size="x-small" shadow={shadow}>
          <div className="flex h-full w-full items-center p-[0.8rem]">
            <div className="flex flex-1 items-center justify-center">설정</div>
            <div className="h-full border" />
            <div className="flex flex-1 items-center justify-center">설정</div>
          </div>
        </MenuCard>
      </div>
      <MenuCard shadow={shadow}>
        <div>수용 요청 확인하기</div>
      </MenuCard>
    </div>
  );
};
