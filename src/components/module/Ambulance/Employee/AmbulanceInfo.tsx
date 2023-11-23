import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";

export const AmbulanceInfo = () => {
  const { ambulance_number, ambulance_type } = useAmbulanceEmployeeStore(
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
