import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";
import { Ambulance } from "@/types/model";
import { Employee } from "@/types/model/employee";
import { COmit } from "@/types/util";
import { X } from "lucide-react";

const Employee = ({
  driver,
}: {
  driver: COmit<Ambulance["employees"][number], "employee" | "ambulance"> & {
    employee: COmit<
      Ambulance["employees"][number]["employee"],
      "ambulance_company_id"
    >;
  };
}) => {
  // const { mutate } = usePostApi("/ems/ambulances/{ambulance_id}", {
  //   useLoader: true,
  // });
  const { removeEmployee } = useAmbulanceEmployeeStore((store) => ({
    // ambulance_id: store.ambulance_id,
    // refetchDriver: store.refetch,
    removeEmployee: store.removeEmployee,
  }));
  // const [deletedData, setDeletedData] =
  //   useState<Response<"/ems/ambulances/{ambulance_id}", "post">>();
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
          <button onClick={() => removeEmployee(driver.employee_id)}>
            <X width={12} height={12} />
          </button>
        </div>

        {/* <AmbulanceEmployeeRemovePopUpButton
          onSubmit={async () => {
            const result = await mutate({
              params: { path: { ambulance_id: ambulance_id ?? "" } },
              body: {
                employee_list: [
                  { action: "REMOVE", employee_id: driver.employee_id },
                ],
              },
            });
            setDeletedData(result);
          }}
        />
        <AmbulanceEmployeeRemovedPopUp
          data={deletedData}
          onClose={() => {
            setDeletedData(undefined);
            refetchDriver?.();
          }}
        /> */}
      </div>
    </div>
  );
};

export const EmployeeInfo = () => {
  const employee_type = useAmbulanceEmployeeStore(
    (state) => state.employee_type
  );

  // const filter = useCallback(
  //   (role: EmployeeRole) =>
  //     employee_type === "DRIVER" ? role === "DRIVER" : role !== "DRIVER",
  //   [employee_type]
  // );

  const employees = useAmbulanceEmployeeStore(
    (store) => store.employees
    // store.employees?.filter((employee) => filter(employee.employee.role))
  );

  return (
    <div className="flex px-[3.2rem]">
      <div className="my-7 w-[6rem] text-xl text-main">
        {employee_type === "OTHER_EMPLOYEE" ? "팀원 지정" : "담당기사 지정"}
      </div>
      <div className="w-[1.9rem]" />
      <div className="my-7 w-full">
        <div className="flex w-auto gap-36 px-6 text-xl font-semibold text-[#979797]">
          <div className="w-24">이름</div>
          <div className="w-24">역할</div>
          <div className="w-24">ID</div>
        </div>
        <div className="h-5" />
        {employees?.map((v) => <Employee key={v.employee_id} driver={v} />)}
      </div>
    </div>
  );
};
