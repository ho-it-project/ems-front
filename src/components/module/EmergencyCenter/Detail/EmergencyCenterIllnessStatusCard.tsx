import {
  Department,
  HospitalDepartment,
} from "@/lib/type/emergencyCenter.type";
import { cn } from "@/lib/utils";

interface EmergencyCenterIllnessStatusCardProps {
  departemnts: (HospitalDepartment & { department: Department })[];
}

export const EmergencyCenterIllnessStatusCard = ({
  departemnts,
}: EmergencyCenterIllnessStatusCardProps) => {
  return (
    <>
      <p className="fontSize-small-l text-lgrey">진료과</p>
      <div className="grid grid-cols-2">
        {departemnts.map((department) => {
          return (
            <span
              key={department.department_id}
              className={cn(
                "fontSize-regular-l",
                department.status === "ACITVE" ? "text-black" : "text-lgrey"
              )}
            >
              {department.department.department_name}
            </span>
          );
        })}
      </div>
    </>
  );
};
