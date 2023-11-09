import { EmergencyCenterCard } from "./EmergencyCenterCard";

interface EmergencyCenterListProps {
  emergency_center_list: {
    emergency_center_name: string;
    emergency_center_type: string;
    distance: string;
    phone_number: string;
    emergency_center_address: string;
  }[];
}

export const EmergencyCenterList = ({
  emergency_center_list,
}: EmergencyCenterListProps) => {
  return (
    <div>
      {emergency_center_list.map((emergency_center, i) => {
        return (
          <div key={i} className="mb-[2rem]">
            <div className="flex  w-full">
              <div className="min-w-[7.2rem]">{i + 1}</div>
              <EmergencyCenterCard {...emergency_center} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
