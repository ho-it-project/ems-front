import { usePostApi } from "@/hooks/api";
import { env } from "@/lib/constants";
import { useAmbulanceDriverStore } from "@/store/ambulanceDriver.store";
import { Employee } from "@/types/model/employee";
import { Plus } from "lucide-react";

// const mock = new Array(20).fill(0).map((_, i) => {
//   return {
//     id: i.toString(),
//     name: "김코딩",
//     role: "개발자",
//     password: "123456",
//   };
// });

export const AmbulanceEmployeeTableContainer = ({
  data,
}: {
  data: Employee[];
}) => {
  const drivers = useAmbulanceDriverStore((store) => store.employees)?.map(
    (driver) => driver.employee_id
  );
  data = data.filter((driver) => !drivers?.includes(driver.employee_id));
  const { mutate } = usePostApi("/ems/ambulances/{ambulance_id}", {
    useLoader: true,
  });
  const { ambulance_id, refetchDriver } = useAmbulanceDriverStore((store) => ({
    ambulance_id: store.ambulance_id,
    refetchDriver: store.refetch,
  }));
  const onPlus = async (item: Employee) => {
    await mutate({
      params: { path: { ambulance_id: ambulance_id ?? "" } },
      body: {
        employee_list: [{ action: "ADD", employee_id: item.employee_id }],
      },
    });
    refetchDriver?.();
  };

  //for dev mode
  const { mutate: m } = usePostApi("/ems/employees", { useLoader: true });
  const addEmployeesForDev = () => {
    m({
      body: {
        employees: [
          {
            employee_name: "driverTest",
            id_card: "drivertest",
            password: "1234",
            role: "DRIVER",
          },
        ],
      },
    });
    m({
      body: {
        employees: [
          {
            employee_name: "adminTest",
            id_card: "adminTest",
            password: "1234",
            role: "ADMIN",
          },
        ],
      },
    });
    m({
      body: {
        employees: [
          {
            employee_name: "dispatchertest",
            id_card: "dispatcherTest",
            password: "1234",
            role: "DISPATCHER",
          },
        ],
      },
    });
    m({
      body: {
        employees: [
          {
            employee_name: "medicalTechnitionTest",
            id_card: "medicalTechnitionTest",
            password: "1234",
            role: "EMERGENCY_MEDICAL_TECHNICIAN",
          },
        ],
      },
    });
  };
  //for dev mode

  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      <div className="fontSize-small flex rounded-[1rem] border border-main bg-bg py-[0.6rem] pl-[3.2rem] text-main">
        <div className="flex-1">이름</div>
        <div className="flex-1">역할</div>
        <div className="flex-[2]">ID</div>
        <div className="flex flex-1 justify-end text-right">
          <div className="w-[6rem] text-center"></div>
        </div>
      </div>
      {env.NEXT_PUBLIC_NODE_ENV === "dev" && (
        <button onClick={addEmployeesForDev}>직원추가</button>
      )}

      <div className="h-full ">
        {data &&
          data.map((item) => {
            return (
              <div
                key={item.id_card}
                className="fontSize-regular flex border-b border-lgrey py-[1.8rem] pl-[3.2rem] text-black"
              >
                <div className="flex-1">{item.employee_name}</div>
                <div className="flex-1">{item.role}</div>
                <div className="flex-[2]">{item.id_card}</div>
                <div className="flex flex-1 items-center justify-end gap-[2rem]">
                  <button
                    onClick={() => onPlus(item)}
                    className="flex h-[2.8rem] w-[9.2rem] items-center justify-center gap-1 rounded-[2rem] bg-main text-[1.2rem] text-white"
                  >
                    <Plus width={"1.2rem"} height={"1.2rem"} /> 추가하기
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
