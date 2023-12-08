import { EmergencyCenterList } from "@/components/module/EmergencyCenter/EmergencyCenterList";
import { EmergencyCenterPageHeader } from "@/components/module/EmergencyCenter/EmergencyCenterPageHeader";

export const EmergencyCenterContainer = () => {
  return (
    <>
      <div className=" h-full w-full px-[0.4rem] py-[1.6rem]">
        <div className="flex h-full w-full flex-col overflow-hidden">
          <div className="mb-[1rem]  pr-[4rem]">
            <EmergencyCenterPageHeader />
          </div>
          <div className="h-full w-full">
            <EmergencyCenterList />
          </div>
        </div>
      </div>
    </>
  );
};
