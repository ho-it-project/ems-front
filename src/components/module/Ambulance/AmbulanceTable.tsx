import { Tag } from "@/components/elements/Tag";
import { useAmbulanceDetail } from "@/hooks/api/useAmbulance";
import { AmbulanceEmployee, Ambulance as AmbulanceModel } from "@/types/model";
import { Employee } from "@/types/model/employee";
import { COmit } from "@/types/util";
import { useRouter } from "next/navigation";
import { AmbulanceInfoPopUpButton } from "./AmbulanceInfoPopUpButton";

// interface Ambulance {
//   id: string;
//   car_num: "78구1500";
//   car_type: "스톼뤡수";
//   type: "일반" | "응급";
//   driver: string;
//   team: string[];
// }

// const mock = new Array(20).fill(0).map((_, i) => {
//   return {
//     id: i.toString(),
//     car_num: "78구1500",
//     car_type: "스톼뤡수",
//     type: "일반",
//     driver: "김세종",
//     team: i % 2 == 0 ? ["김세종", "김세종", "김기사"] : ["김세종", "김기사"],
//   };
// });

type AmbulanceDataFromCompanyApi = COmit<
  AmbulanceModel,
  "employees" | "ambulance_company"
>;

type AmbulanceFromApi = COmit<AmbulanceModel, "employees"> & {
  employees: (COmit<AmbulanceEmployee, "ambulance" | "employee"> & {
    employee: COmit<Employee, "ambulance_company_id">;
  })[];
};

const matchSearch = (
  search: string,
  searchType: (typeof searchTypes)[keyof typeof searchTypes],
  ambulanceDetail: AmbulanceFromApi
) => {
  switch (searchType) {
    case "ambulance_number":
    case "ambulance_type":
      return ambulanceDetail[searchType].includes(search);
    case "driver":
      return ambulanceDetail.employees
        .filter(({ employee }) => employee.role === "DRIVER")[0]
        .employee.employee_name.includes(search);
    case "employees":
      return (
        ambulanceDetail.employees.filter(({ employee }) =>
          employee.employee_name.includes(search)
        ).length > 0
      );
  }
};

export const searchTypes = {
  차량번호: "ambulance_number",
  차종: "ambulance_type",
  유형: "ambulance_type",
  담당기사: "driver",
  팀원: "employees",
} as const;

export const Ambulance = ({
  ambulance,
  search,
  searchType,
}: {
  ambulance: AmbulanceDataFromCompanyApi;
  search: string;
  searchType: keyof typeof searchTypes;
}) => {
  const { detail, errorOnDetail } = useAmbulanceDetail(ambulance.ambulance_id);
  const router = useRouter();
  errorOnDetail;
  const drivers = detail?.employees.filter((v) => v.employee.role === "DRIVER");
  return (
    <>
      {detail && matchSearch(search, searchTypes[searchType], detail) && (
        <div
          key={ambulance.ambulance_id}
          className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
        >
          <div className="flex-[3]">{ambulance.ambulance_number}</div>
          <div className="flex-[3]">{ambulance.ambulance_type}</div>
          <div className="flex-[2]">{ambulance.ambulance_type}</div>
          <div className="flex-[2]">
            <button
              className="fontSize-small-l flex items-center gap-[0.5rem]"
              onClick={() =>
                router.push(`/ambulance/${ambulance.ambulance_id}/driver`)
              }
            >
              {drivers?.length === 0 ? (
                <div className=" text-main">설정하기</div>
              ) : (
                <Tag
                  text={
                    detail?.employees.filter(
                      (employee) => employee.employee.role === "DRIVER"
                    )[0]?.employee.employee_name ?? "설정하기"
                  }
                  border="none"
                  bgColor="bg"
                  color="black"
                />
              )}
            </button>
          </div>

          <div className="flex flex-[5] items-center justify-between">
            <button
              className="fontSize-small-l flex items-center gap-[0.5rem]"
              onClick={() =>
                router.push(`/ambulance/${ambulance.ambulance_id}/employee`)
              }
            >
              {detail?.employees.length > 0 ? (
                detail.employees.slice(0, 2).map((employee) => {
                  return (
                    <Tag
                      key={employee.employee.employee_name}
                      text={employee.employee.employee_name}
                      border="none"
                      bgColor="bg"
                      color="black"
                    />
                  );
                })
              ) : (
                <div className=" text-main">설정하기</div>
              )}
              {(detail?.employees.length ?? 0) > 2 &&
                `외 ${(detail?.employees.length ?? 0) - 2}명`}
            </button>
            <div className="flex gap-[2rem]">
              {/* <AmbulanceDeletePopUpButton /> */}
              {/* api 없음 */}
              <AmbulanceInfoPopUpButton
                title="수정"
                type="edit"
                Ambulance={{
                  ambulance_number: detail.ambulance_number,
                  ambulance_type: detail.ambulance_type,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const AmbulanceTable = ({
  ambulanceList,
  search,
  searchType,
}: {
  ambulanceList: AmbulanceDataFromCompanyApi[];
  search: string;
  searchType: keyof typeof searchTypes;
}) => {
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
        {ambulanceList.map((ambulance) => {
          return (
            <Ambulance
              key={ambulance.ambulance_id}
              ambulance={ambulance}
              search={search}
              searchType={searchType}
            />
          );
        })}
      </div>
    </div>
  );
};
