"use client";
import {
  AmbulanceEmployeePageHeaderContainer,
  AmbulanceEmployeeTableContainer,
  EmployeeSettingContainer,
  NotFoundPopUpContainer,
  SearchContainer,
} from "@/components/container/AmbulanceContainer/Employee";
import { useAmbulanceDetail } from "@/hooks/api/useAmbulance";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";
import { PathQuery } from "@/types/api";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const AmbulanceEmployeePrototype = ({
  ambulance_id,
}: {
  ambulance_id: string;
}) => {
  const { detail, errorOnDetail } = useAmbulanceDetail(ambulance_id);
  const { setAmbulance } = useAmbulanceEmployeeStore(
    useShallow((state) => ({
      setAmbulance: state.setAmbulance,
    }))
  );

  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data: employees } = useEmployeeTableQuery(query);
  // const employees = _employees?.filter(
  //   (employee) => employee.role !== "DRIVER"
  // );

  useEffect(() => {
    if (detail) setAmbulance({ ...detail, employee_type: "OTHER_EMPLOYEE" });
  }, [detail, errorOnDetail, setAmbulance]);

  if (errorOnDetail?.http_status_code === 404)
    return <NotFoundPopUpContainer />;

  return (
    <div className="h-full w-full">
      <AmbulanceEmployeePageHeaderContainer />
      <div className="h-10" />
      <EmployeeSettingContainer />
      <div className="h-8" />
      <div className="flex flex-row-reverse">
        <SearchContainer setQuery={setQuery} />
      </div>
      <div className="mt-[2.5rem] h-full">
        {employees && <AmbulanceEmployeeTableContainer data={employees} />}
      </div>
    </div>
  );
};
