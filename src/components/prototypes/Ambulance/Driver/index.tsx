import {
  AmbulanceDriverPageHeaderContainer,
  AmbulanceEmployeeTableContainer,
  DriverSettingContainer,
  NotFoundPopUpContainer,
  SearchContainer,
} from "@/components/container/AmbulanceContainer/Driver";
import { useAmbulanceDetail } from "@/hooks/api/useAmbulance";
import { useEmployeeTableQuery } from "@/hooks/api/useEmployee";
import { useAmbulanceDriverStore } from "@/store/ambulanceDriver.store";
import { PathQuery } from "@/types/api";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export const AmbulanceDriverPrototype = ({
  ambulance_id,
}: {
  ambulance_id: string;
}) => {
  // return <AmbulanceDriverContainer />;
  const { detail, errorOnDetail, refetch } = useAmbulanceDetail(ambulance_id);
  const { setAmbulance, setRefetch } = useAmbulanceDriverStore(
    useShallow((state) => ({
      setAmbulance: state.setAmbulance,
      setRefetch: state.setRefetch,
    }))
  );

  const [query, setQuery] = useState<PathQuery<"/ems/employees", "get">>({});
  const { data } = useEmployeeTableQuery(query);

  useEffect(() => {
    if (detail) setAmbulance({ ...detail });
    if (refetch) setRefetch(refetch);
  }, [detail, errorOnDetail, refetch]);

  if (errorOnDetail?.http_status_code === 404)
    return <NotFoundPopUpContainer />;

  return (
    <div className="h-full w-full">
      <AmbulanceDriverPageHeaderContainer />
      <div className="h-10" />
      <DriverSettingContainer />
      <div className="h-8" />
      <div className="flex flex-row-reverse">
        <SearchContainer setQuery={setQuery} />
      </div>
      <div className="mt-[2.5rem] h-full">
        {data && <AmbulanceEmployeeTableContainer data={data} />}
      </div>
    </div>
  );
};
