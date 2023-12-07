"use client";
import { useWindowSize } from "@/hooks";
import { useDepartment } from "@/hooks/api/useDepartment";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { DepartmentSelectButton } from "./DepartmentSelectButton";

interface DepartmentFormProps {
  formId: string;
}

export const DepartmentForm = ({ formId }: DepartmentFormProps) => {
  const [selectDepartment, setSelectDepartment] = useState<number[]>([]);
  const { classificatedDepartments } = useDepartment();
  const { haveSubDepartments, noSubDepartments } = classificatedDepartments;
  const { width } = useWindowSize();
  const grid = width && width > 914 ? 3 : 2;
  const gridStyle = grid === 2 ? "grid-cols-2" : "grid-cols-3";

  const handleSelectDepartment = (department_id: number) => () => {
    if (selectDepartment.includes(department_id)) {
      setSelectDepartment(
        selectDepartment.filter((item) => item !== department_id)
      );
      return;
    }
    const unique = [...new Set([...selectDepartment, department_id])].sort(
      (a, b) => a - b
    );
    setSelectDepartment(unique);
  };

  const isSelected = (department_id: number) => {
    return selectDepartment.includes(department_id);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //로직 추가
  };

  return (
    <form
      className="flex h-full w-full justify-center"
      id={formId}
      onSubmit={onSubmit}
    >
      {haveSubDepartments.map((item) => {
        return (
          <div
            key={item.department_id}
            className="relative flex h-full flex-col items-center gap-[1.2rem] border-r border-r-lgrey px-[2.4rem]"
          >
            <p className="fontSize-small-l absolute w-full -translate-y-[100%] px-[2.4rem] text-left text-lgrey">
              {item.department_name}
            </p>
            {item.sub_departments &&
              item.sub_departments.map((sub) => {
                return (
                  <DepartmentSelectButton
                    onClick={handleSelectDepartment(sub.department_id)}
                    isSelect={isSelected(sub.department_id)}
                    department_name={sub.department_name}
                    key={sub.department_id}
                  />
                );
              })}
          </div>
        );
      })}
      <div
        className={cn(
          "grid h-fit gap-x-[1.2rem] gap-y-[1.2rem] px-[2.4rem]",
          gridStyle
        )}
      >
        {noSubDepartments.map((item) => {
          return (
            <DepartmentSelectButton
              onClick={handleSelectDepartment(item.department_id)}
              isSelect={isSelected(item.department_id)}
              department_name={item.department_name}
              key={item.department_id}
            />
          );
        })}
      </div>
    </form>
  );
};
