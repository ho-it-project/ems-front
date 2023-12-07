"use client";
import {
  AmbulanceEmployeePageHeaderContainer,
  AmbulanceEmployeeTableContainer,
  EmployeeSettingContainer,
  NotFoundPopUpContainer,
  SearchContainer,
} from "@/components/container/AmbulanceContainer/Employee";
import { useAmbulanceDetail } from "@/hooks/api/useAmbulanceDetail";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { useAmbulanceEmployeeStore } from "@/store/ambulanceEmployee.store";
import { PathQuery } from "@/types/api";
import { Ambulance, AmbulanceEmployee } from "@/types/model";
import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const AmbulanceEmployeePrototype = ({
  ambulance_id,
}: {
  ambulance_id: string;
}) => {
  const { ambulanceDetail, errorOnAmbulanceDetail } =
    useAmbulanceDetail(ambulance_id);
  const { setAmbulance, setType } = useAmbulanceEmployeeStore(
    useShallow((state) => ({
      setAmbulance: state.setEmployee,
      setType: state.setType,
    }))
  );

  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data } = useEmployeeTableQuery(query);

  const ambulance: Ambulance | undefined = useMemo(
    () =>
      ambulanceDetail && {
        ambulance_company: ambulanceDetail.ambulance_company,
        ambulance_company_id: ambulanceDetail.ambulance_company_id,
        ambulance_id: ambulanceDetail.ambulance_id,
        ambulance_number: ambulanceDetail.ambulance_number,
        ambulance_type: ambulanceDetail.ambulance_type,
        employees: ambulanceDetail.employees,
      },
    [ambulanceDetail]
  );

  const employees: AmbulanceEmployee[] | undefined = useMemo(
    () =>
      ambulanceDetail &&
      ambulanceDetail.employees.map((v) => ({
        employee: v.employee,
        team_role: v.team_role,
      })),
    [ambulanceDetail]
  );

  useEffect(() => {
    if (ambulanceDetail) setAmbulance({ ambulance, employees });
    setType("OTHER");
  }, [ambulanceDetail, setAmbulance, ambulance, employees, setType]);

  if (errorOnAmbulanceDetail?.http_status_code === 404)
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
        {data && <AmbulanceEmployeeTableContainer data={data ?? []} />}
      </div>
    </div>
  );
};
