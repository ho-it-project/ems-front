import {
  AmbulanceInfo,
  EmployeeInfo,
} from "@/components/module/Ambulance/Employee";

export const EmployeeSettingContainer = () => {
  return (
    <div className="max-h-[40rem] min-h-[15rem] w-full overflow-auto rounded-[1.4rem] border border-main bg-[#F0F5F4]">
      <AmbulanceInfo />
      <div className="h-0.5 w-full bg-main" />
      <EmployeeInfo />
    </div>
  );
};
