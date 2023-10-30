"use client";
import { EmployeeTable } from "@/components/module/Employee/EmployeeTable";
import { EmployeePageHeader } from "@/components/module/Employee/Header";

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
