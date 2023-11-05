import { Tag } from "@/components/elements/Tag";
import { AmbulanceDeletePopUpButton } from "./AmbulanceDeletePopUpButton";

interface Ambulance {
  id: string;
  car_num: "78구1500";
  car_type: "스톼뤡수";
  type: "일반" | "응급";
  driver: string;
  team: string[];
}

const mock: Ambulance[] = new Array(20).fill(0).map((_, i) => {
  return {
    id: i.toString(),
    car_num: "78구1500",
    car_type: "스톼뤡수",
    type: "일반",
    driver: "김세종",
    team: i % 2 == 0 ? ["김세종", "김세종", "김기사"] : ["김세종", "김기사"],
  };
});

export const AmbulanceTable = () => {
  return (
    <div className="flex h-full w-full flex-col ">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main">
        <div className="flex-[3]">차량번호</div>
        <div className="flex-[3]">차종</div>
        <div className="flex-[2]">유형</div>
        <div className="flex-[2]">담당기사</div>
        <div className="flex-[5]">팀원</div>
      </div>

      <div className="h-full overflow-scroll">
        {mock.map((item) => {
          return (
            <div
              key={item.id}
              className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
            >
              <div className="flex-[3]">{item.car_num}</div>
              <div className="flex-[3]">{item.car_type}</div>
              <div className="flex-[2]">{item.type}</div>
              <div className="flex-[2]">
                <Tag
                  text={item.driver}
                  border="none"
                  bgColor="bg"
                  color="black"
                />
              </div>

              <div className="flex flex-[5] items-center justify-between">
                <div className="fontSize-small-l flex items-center gap-[0.5rem]">
                  {item.team.slice(0, 2).map((name) => {
                    return (
                      <Tag
                        key={name}
                        text={name}
                        border="none"
                        bgColor="bg"
                        color="black"
                      />
                    );
                  })}
                  {item.team.length > 2 && `외 ${item.team.length - 2}명`}
                </div>
                <div className="flex gap-[2rem]">
                  <AmbulanceDeletePopUpButton />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
