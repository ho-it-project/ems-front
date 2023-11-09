import { EmergencyCenterList } from "@/components/module/EmergencyCenter/EmergencyCenterList";
import { EmergencyCenterPageHeader } from "@/components/module/EmergencyCenter/EmergencyCenterPageHeader";

export const EmergencyCenterContainer = () => {
  return (
    <div className=" h-full w-full px-[2rem] py-[1.6rem]">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="mb-[1rem]  pr-[4rem]">
          <EmergencyCenterPageHeader />
        </div>
        <div className="h-full w-full overflow-scroll pr-[4rem]">
          <EmergencyCenterList
            emergency_center_list={[
              {
                emergency_center_name: "test",
                emergency_center_type: "test",
                distance: "test",
                emergency_center_address: "test",
                phone_number: "test",
              },
              {
                emergency_center_name: "test",
                emergency_center_type: "test",
                distance: "test",
                emergency_center_address: "test",
                phone_number: "test",
              },
              {
                emergency_center_name: "test",
                emergency_center_type: "test",
                distance: "test",
                emergency_center_address: "test",
                phone_number: "test",
              },
              {
                emergency_center_name: "test",
                emergency_center_type: "test",
                distance: "test",
                emergency_center_address: "test",
                phone_number: "test",
              },
              {
                emergency_center_name: "test",
                emergency_center_type: "test",
                distance: "test",
                emergency_center_address: "test",
                phone_number: "test",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
