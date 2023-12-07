import { cn } from "@/lib/utils";
import { Department } from "@/types/department/client";

interface EmergencyCenterIllnessStatusCardProps {
  // departemnts: (HospitalDepartment & { department: Department })[];
  departemnts: Department[];
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
                department.status === "ACTIVE" ? "text-black" : "text-lgrey"
              )}
            >
              {department.department_name}
            </span>
          );
        })}
      </div>
    </>
  );
};
