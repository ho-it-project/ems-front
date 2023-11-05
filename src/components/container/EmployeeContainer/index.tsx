"use client";
import { EmployeePageHeader } from "@/components/module/Employee/EmployeePageHeader";
import { EmployeeTable } from "@/components/module/Employee/EmployeeTable";

export const EmployeeContainer = () => {
  return (
    <div className="h-full w-full">
      <EmployeePageHeader />
      <div className="mt-[2.5rem] h-full overflow-scroll">
        <EmployeeTable />
      </div>
    </div>
  );
};
