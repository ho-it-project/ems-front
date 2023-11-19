import { useAuth } from "@/providers/AuthProvider";
import { PathQuery } from "@/types/api";
import { useGetApi } from ".";

export type AmbulanceQuery = PathQuery<
  "/ems/ambulance-companies/{ems_ambulance_company_id}",
  "get"
>;
export const useAbmulance = () => {
  const { user } = useAuth({ isLogin: true });

  const {
    data,
    error: ambulanceInfoErr,
    refetch: ambulanceInfoRefetch,
  } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    { useLoader: true },
    {
      params: {
        path: {
          ems_ambulance_company_id: user.ambulance_company_id,
        },
      },
    }
  );

  const ambulanceInfo = data?.result.ambulances;

  return { ambulanceInfo, ambulanceInfoErr, ambulanceInfoRefetch };
};

export const useAmbulanceDetail = (ambulance_id: string) => {
  const { data, error: errorOnDetail } = useGetApi(
    "/ems/ambulances/{ambulance_id}",
    { useLoader: true },
    { params: { path: { ambulance_id } } }
  );

  const detail = data?.result;

  return { detail, errorOnDetail };
};
