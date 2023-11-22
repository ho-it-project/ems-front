export * from "./AmbulanceDriverEmployeeTable";
export * from "./AmbulanceDriverPageHeader";
export * from "./AmbulanceDriverSetting";
export * from "./AmbulanceEmployeeSearch";
export * from "./AmbulanceNotFoundPopUp";

// import { AmbulanceEmployeeTable } from "@/components/container/AmbulanceContainer/Driver/AmbulanceDriverEmployeeTable";
// import { AmbulanceDriverPageHeader } from "@/components/container/AmbulanceContainer/Driver/AmbulanceDriverPageHeader";
// import { DriverSetting } from "@/components/container/AmbulanceContainer/Driver/AmbulanceDriverSetting";
// import { Search } from "@/components/container/AmbulanceContainer/Driver/AmbulanceEmployeeSearch";
// import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
// import { PathQuery } from "@/types/api";
// import { useState } from "react";

// export const AmbulanceDriverContainer = () => {
//   const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
//   const { data } = useEmployeeTableQuery(query);
//   return (
//     <div className="h-full w-full">
//       <AmbulanceDriverPageHeader />
//       <div className="h-10" />
//       <DriverSetting />
//       <div className="h-8" />
//       <div className="flex flex-row-reverse">
//         <Search setQuery={setQuery} />
//       </div>
//       <div className="mt-[2.5rem] h-full">
//         {data && <AmbulanceEmployeeTable data={data} />}
//       </div>
//     </div>
//   );
// };
