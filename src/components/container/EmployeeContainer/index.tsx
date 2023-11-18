"use client";
import { EmployeePageHeader } from "@/components/module/Employee/EmployeePageHeader";
import { EmployeeTable } from "@/components/module/Employee/EmployeeTable";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { paths } from "@/types/api/api";
import { useState } from "react";

export const EmployeeContainer = () => {
  const [query, setQuery] = useState<
    paths["/ems/employees"]["get"]["parameters"]["query"]["query"]
  >({});
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
      <div className="mt-[2.5rem] h-full overflow-scroll">
        {data && <EmployeeTable data={data} refetch={refetch} />}
      </div>
    </div>
  );
};
