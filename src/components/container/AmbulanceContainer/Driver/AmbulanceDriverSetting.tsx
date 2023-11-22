import {
  AmbulanceDriverRemovePopUpButton,
  AmbulanceDriverRemovedPopUp,
} from "@/components/module/Ambulance/Driver";
import { usePostApi } from "@/hooks/api";
import { useAmbulanceDriverStore } from "@/store/ambulanceDriver.store";
import { Response } from "@/types/api";
import { Ambulance } from "@/types/model";
import { COmit } from "@/types/util";
import { X } from "lucide-react";
import { useState } from "react";

const Driver = ({
  driver,
}: {
  driver: COmit<Ambulance["employees"][number], "employee" | "ambulance"> & {
    employee: COmit<
      Ambulance["employees"][number]["employee"],
      "ambulance_company_id"
    >;
  };
}) => {
  const { mutate } = usePostApi("/ems/ambulances/{ambulance_id}", {
    useLoader: true,
  });
  const { ambulance_id, refetchDriver } = useAmbulanceDriverStore((store) => ({
    ambulance_id: store.ambulance_id,
    refetchDriver: store.refetch,
  }));
  const [deletedData, setDeletedData] =
    useState<Response<"/ems/ambulances/{ambulance_id}", "post">>();
  return (
    <div className=" my-3 flex w-auto gap-36 rounded-[2.9rem] bg-white px-6 text-2xl font-medium">
      <div className="w-24">{driver.employee.employee_name}</div>
      <div className="w-24">{driver.employee.role}</div>
      <div className="w-auto">{driver.employee.id_card}</div>
      <div>
        <X />
        <AmbulanceDriverRemovePopUpButton
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
        <AmbulanceDriverRemovedPopUp
          data={deletedData}
          onClose={() => {
            setDeletedData(undefined);
            refetchDriver?.();
          }}
        />
      </div>
    </div>
  );
};

const AmbulanceInfo = () => {
  const { ambulance_number, ambulance_type } = useAmbulanceDriverStore(
    (store) => ({
      ambulance_number: store.ambulance_number,
      ambulance_type: store.ambulance_type,
    })
  );
  return (
    <div className="flex h-[5.7rem] items-center px-[3.2rem]">
      <div className="text-xl text-main">팀/차량</div>
      <div className="w-[1.9rem]" />
      <div className="text-2xl text-black">{ambulance_number}</div>
      <div className="w-[1.9rem]" />
      <div className=" flex h-10 w-24 items-center justify-center rounded-sm bg-white text-xl font-medium text-black">
        {ambulance_type}
      </div>
    </div>
  );
};

const DriverInfo = () => {
  const drivers = useAmbulanceDriverStore(
    (store) =>
      store.employees?.filter((employee) => employee.employee.role === "DRIVER")
  );
  return (
    <div className="flex px-[3.2rem]">
      <div className="my-7 w-[5.3rem] text-xl text-main">담당기사 차량</div>
      <div className="w-[1.9rem]" />
      <div className="my-7 w-auto">
        <div className="flex w-auto gap-36 px-6 text-xl font-semibold text-[#979797]">
          <div className="w-24">이름</div>
          <div className="w-24">역할</div>
          <div className="w-24">ID</div>
        </div>
        <div className="h-5" />
        {drivers?.map((v) => <Driver key={v.employee_id} driver={v} />)}
      </div>
    </div>
  );
};

export const DriverSettingContainer = () => {
  return (
    <div className="max-h-[40rem] min-h-[15rem] w-full overflow-auto rounded-[1.4rem] border border-main bg-[#F0F5F4]">
      <AmbulanceInfo />
      <div className="h-0.5 w-full bg-main" />
      <DriverInfo />
    </div>
  );
};
