import { useCallback } from "react";
import { useGetApi } from ".";

export const useAmbulanceDetail = (ambulance_id: string) => {
  const {
    data,
    error: errorOnAmbulanceDetail,
    refetch: _refetch,
  } = useGetApi(
    "/ems/ambulances/{ambulance_id}",
    { useLoader: true },
    { params: { path: { ambulance_id } } }
  );

  const ambulanceDetail = data?.result;
  const refetchAmbulanceDetail = useCallback(
    async () => (await _refetch())?.result,
    [_refetch]
  );

  return { ambulanceDetail, errorOnAmbulanceDetail, refetchAmbulanceDetail };
};
