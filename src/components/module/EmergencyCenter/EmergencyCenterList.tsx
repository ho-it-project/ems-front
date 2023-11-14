import { EmergencyCenter } from "@/store/emergencyCenter.store";
import Link from "next/link";
import { EmergencyCenterCard } from "./EmergencyCenterCard";

interface EmergencyCenterListProps {
  emergency_center_list: EmergencyCenter[];
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
              <Link
                href={`/emergency-center/${emergency_center.emergency_center_id}`}
                className="w-full"
              >
                <EmergencyCenterCard emergencyCenter={emergency_center} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
