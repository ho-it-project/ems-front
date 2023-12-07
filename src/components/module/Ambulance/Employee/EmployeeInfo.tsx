import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";
import { AmbulanceEmployee, TeamRole } from "@/types/model";
import { X } from "lucide-react";
import { useCallback } from "react";

const Employee = ({ driver }: { driver: AmbulanceEmployee }) => {
  const { removeEmployee, type } = useAmbulanceEmployeeStore((store) => ({
    type: store.type,
    removeEmployee: store.removeEmployee,
  }));
  return (
    <div className="my-3 flex justify-between rounded-[2.9rem] bg-white px-6 text-2xl font-medium">
      <div className="flex gap-36">
        <div className="w-24">{driver.employee.employee_name}</div>
        <div className="w-24">{driver.employee.role}</div>
        <div className="w-56">{driver.employee.id_card}</div>
        {/* <div className="flex w-full flex-row-reverse"> */}
      </div>
      <div>
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <button
            onClick={() =>
              type && removeEmployee(driver.employee.employee_id, type)
            }
          >
            <X width={12} height={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const EmployeeInfo = () => {
  const type = useAmbulanceEmployeeStore((state) => state.type);

  const filter = useCallback(
    (team_role: TeamRole) =>
      type === "DRIVER" ? team_role === "DRIVER" : team_role === "OTHER",
    [type]
  );

  const employees = useAmbulanceEmployeeStore(
    (store) => store.employees
  )?.filter((employee) => filter(employee.team_role));

  return (
    <div className="flex px-[3.2rem]">
      <div className="my-7 w-[6rem] text-xl text-main">
        {type === "OTHER" ? "팀원 지정" : "담당기사 지정"}
      </div>
      <div className="w-[1.9rem]" />
      <div className="my-7 w-full">
        <div className="flex w-auto gap-36 px-6 text-xl font-semibold text-[#979797]">
          <div className="w-24">이름</div>
          <div className="w-24">역할</div>
          <div className="w-24">ID</div>
        </div>
        <div className="h-5" />
        {employees?.map((v) => (
          <Employee key={v.employee.employee_id} driver={v} />
        ))}
      </div>
    </div>
  );
};
