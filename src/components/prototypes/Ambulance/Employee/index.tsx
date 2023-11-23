"use client";
import {
  AmbulanceDriverPageHeaderContainer,
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
  const { detail, errorOnDetail, refetch } = useAmbulanceDetail(ambulance_id);
  const { setAmbulance, setRefetch } = useAmbulanceEmployeeStore(
    useShallow((state) => ({
      setAmbulance: state.setAmbulance,
      setRefetch: state.setRefetch,
    }))
  );

  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data: _employees } = useEmployeeTableQuery(query);
  const employees = _employees?.filter(
    (employee) => employee.role !== "DRIVER"
  );

  useEffect(() => {
    if (detail) setAmbulance({ ...detail, employee_type: "OTHER_EMPLOYEE" });
    if (refetch) setRefetch(refetch);
  }, [detail, errorOnDetail, refetch]);

  if (errorOnDetail?.http_status_code === 404)
    return <NotFoundPopUpContainer />;

  return (
    <div className="h-full w-full">
      <AmbulanceDriverPageHeaderContainer />
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
