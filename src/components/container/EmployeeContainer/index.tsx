"use client";
import { EmployeePageHeader } from "@/components/module/Employee/EmployeePageHeader";
import { EmployeeTable } from "@/components/module/Employee/EmployeeTable";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { PathQuery } from "@/types/api";
import { useState } from "react";

export const EmployeeContainer = () => {
  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data, refetch } = useEmployeeTableQuery(query);

  const searchTypeObject = {
    이름: "employee_name",
    ID: "id_card",
  } as const;
  return (
    <div className="h-full w-full">
      <EmployeePageHeader
        onSearch={(searchType, value) => () =>
          setQuery({
            search: value,
            search_type: searchTypeObject[searchType ?? "ID"],
          })
        }
      />
      <div className="mt-[2.5rem] h-full">
        {data && <EmployeeTable data={data} refetch={refetch} />}
      </div>
    </div>
  );
};
