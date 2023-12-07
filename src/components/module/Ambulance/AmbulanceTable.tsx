import { Badge } from "@/components/ui/badge";
import { useAmbulanceDetail } from "@/hooks/api/useAmbulanceDetail";
import { Ambulance, AmbulanceEmployee } from "@/types/model";
import { useRouter } from "next/navigation";
import { AmbulanceInfoPopUpButton } from "./AmbulanceInfoPopUpButton";

type AmbulanceDetail = Ambulance & {
  employees: AmbulanceEmployee[];
};

const matchSearch = (
  search: string,
  searchType: (typeof searchTypes)[keyof typeof searchTypes],
  ambulanceDetail: AmbulanceDetail
) => {
  switch (searchType) {
    case "ambulance_number":
    case "ambulance_type":
      return ambulanceDetail[searchType].includes(search);
    case "driver":
      return search === ""
        ? true
        : ambulanceDetail.employees
            .filter(({ team_role }) => team_role === "DRIVER")[0]
            ?.employee.employee_name.includes(search);
    case "employees":
      return search === ""
        ? true
        : ambulanceDetail.employees.filter(({ employee }) =>
            employee.employee_name.includes(search)
          ).length > 0;
  }
};

export const searchTypes = {
  차량번호: "ambulance_number",
  차종: "ambulance_type",
  유형: "ambulance_type",
  담당기사: "driver",
  팀원: "employees",
} as const;

export const AmbulanceDetail = ({
  ambulance,
  search,
  searchType,
}: {
  ambulance: Ambulance;
  search: string;
  searchType: keyof typeof searchTypes;
}) => {
  const { ambulanceDetail, errorOnAmbulanceDetail } = useAmbulanceDetail(
    ambulance.ambulance_id
  );
  const drivers = ambulanceDetail?.employees.filter(
    (v) => v.team_role === "DRIVER"
  );

  const employees = ambulanceDetail?.employees.filter(
    (employee) => employee.team_role !== "DRIVER"
  );

  const router = useRouter();
  errorOnAmbulanceDetail;
  const flag =
    ambulanceDetail &&
    matchSearch(search, searchTypes[searchType], ambulanceDetail);
  return (
    <>
      {ambulanceDetail && flag && (
        <div
          key={ambulance.ambulance_id}
          className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
        >
          <div className="flex-[3]">{ambulance.ambulance_number}</div>
          <div className="flex-[3]">{ambulance.ambulance_type}</div>
          <div className="flex-[2]">{ambulance.ambulance_type}</div>
          <div className="flex-[2]">
            <button
              className="fontSize-small-l flex h-full w-full items-center gap-[0.5rem] overflow-hidden overflow-ellipsis whitespace-nowrap"
              onClick={() =>
                router.push(`/ambulance/${ambulance.ambulance_id}/driver`)
              }
            >
              {drivers && drivers.length > 0 ? (
                <Badge className="h-[2.4rem] w-[6rem] rounded-[3rem] border-[0.2rem] bg-bg text-black">
                  <div className=" overflow-hidden overflow-ellipsis whitespace-nowrap text-[1.2rem] font-medium">
                    {drivers[0].employee.employee_name ?? ""}
                  </div>
                </Badge>
              ) : (
                <div className="flex h-full items-center justify-center text-main">
                  <div>설정하기</div>
                </div>
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
              {employees && employees.length > 0 ? (
                employees.slice(0, 2).map((employee) => {
                  return (
                    <Badge
                      key={employee.employee.employee_name}
                      className=" h-[2.4rem] w-[6rem] rounded-[3rem] border-[0.2rem] bg-bg text-black"
                    >
                      <div className=" overflow-hidden overflow-ellipsis whitespace-nowrap text-[1.2rem] font-medium">
                        {employee.employee.employee_name ?? ""}
                      </div>
                    </Badge>
                  );
                })
              ) : (
                <div className=" flex items-center text-main">설정하기</div>
              )}
              {(employees?.length ?? 0) > 2 &&
                `외 ${(ambulanceDetail?.employees.length ?? 0) - 2}명`}
            </button>
            <div className="flex gap-[2rem]">
              {/* <AmbulanceDeletePopUpButton /> */}
              {/* api 없음 */}
              <AmbulanceInfoPopUpButton
                title="수정"
                type="edit"
                Ambulance={{
                  ambulance_number: ambulanceDetail.ambulance_number,
                  ambulance_type: ambulanceDetail.ambulance_type,
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
  ambulanceList: Ambulance[];
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
            <AmbulanceDetail
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
