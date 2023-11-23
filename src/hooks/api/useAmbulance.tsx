import { useAuth } from "@/providers/AuthProvider";
import { useGetApi } from ".";

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
  const {
    data,
    error: errorOnDetail,
    refetch: _refetch,
  } = useGetApi(
    "/ems/ambulances/{ambulance_id}",
    { useLoader: true },
    { params: { path: { ambulance_id } } }
  );

  const detail = data?.result;
  const refetch = async () => (await _refetch())?.result;

  return { detail, errorOnDetail, refetch };
};
