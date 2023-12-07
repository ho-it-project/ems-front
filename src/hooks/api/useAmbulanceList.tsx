import { useAuth } from "@/providers/AuthProvider";
import { useGetApi } from ".";

export const useAbmulanceList = () => {
  const { user } = useAuth({ isLogin: true });

  const {
    data,
    error: ambulanceListErr,
    refetch: ambulanceListRefetch,
  } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    { useLoader: true, enabled: !!user },
    {
      params: {
        path: {
          ems_ambulance_company_id: user?.ambulance_company_id ?? "",
        },
      },
    }
  );

  const ambulanceList = data?.result.ambulances;

  return { ambulanceList, ambulanceListErr, ambulanceListRefetch };
};
