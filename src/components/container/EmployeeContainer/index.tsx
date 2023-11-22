"use client";
import { EmployeePageHeader } from "@/components/module/Employee/EmployeePageHeader";
import { EmployeeTable } from "@/components/module/Employee/EmployeeTable";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { PathQuery } from "@/types/api";
import { useState } from "react";

// const Action = ({
//   item,
//   refetch,
// }: {
//   item: Employee;
//   refetch: () => unknown;
// }) => {
//   const { mutate } = usePutApi("/ems/employees/{employee_id}", {
//     useLoader: true,
//   });

//   const [deletedData, setDeletedData] =
//     useState<Response<"/ems/employees/{employee_id}", "put">>();
//   return (
//     <>
//       <EmployeeDeletePopUpButton
//         onSubmmit={async () => {
//           const result = await mutate({
//             params: { path: { employee_id: item.employee_id } },
//           });
//           setDeletedData(result);
//         }}
//       />
//       <EmployeeDeletedPopUp
//         data={deletedData}
//         onClose={() => {
//           setDeletedData(undefined);
//           refetch();
//         }}
//       />
//     </>
//   );
// };

export const searchTypeObject = {
  이름: "employee_name",
  ID: "id_card",
} as const;
export const EmployeeContainer = () => {
  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data, refetch } = useEmployeeTableQuery(query);

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
