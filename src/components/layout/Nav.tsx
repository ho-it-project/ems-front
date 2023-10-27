import { MenuCard } from "./MenuCard";

export const Nav = () => {
  const topSectionClass = `
    flex-1
    flex flex-col
    gap-[2rem]
  `;

  return (
    <div className="flex h-full w-[18.3rem] flex-col gap-[2rem]">
      <div className={`${topSectionClass}`}>
        <MenuCard size="large">
          <div></div>
        </MenuCard>
        <MenuCard size="small">
          <div></div>
        </MenuCard>
        <MenuCard>
          <div>메세지</div>
        </MenuCard>
        <MenuCard>
          <div>주변 응급실 찾기</div>
        </MenuCard>
        <MenuCard>
          <div>환자 정보 수정하기</div>
        </MenuCard>
        <MenuCard size="x-small">
          <div className="flex h-full w-full items-center p-[0.8rem]">
            <div className="flex flex-1 items-center justify-center">설정</div>
            <div className="h-full border" />
            <div className="flex flex-1 items-center justify-center">설정</div>
          </div>
        </MenuCard>
      </div>
      <MenuCard>
        <div>수용 요청 확인하기</div>
      </MenuCard>
    </div>
  );
};
