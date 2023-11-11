import {
  EmergencyCenter,
  useEmergencyCenterListStore,
} from "@/store/emergencyCenter.store";
import { useEffect } from "react";
import useSWR from "swr";
import { useGeoLocation } from "./useGeoLocation";

interface GetEmergencyCenterListResponse {
  result: {
    emergency_center_list: EmergencyCenter[];
    count: number;
  };
  is_success: boolean;
  message: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useEmergencyCenterList = () => {
  const laction = useGeoLocation();
  const { emergencyCenters, query, setPageLimit, setEmergencyCenters } =
    useEmergencyCenterListStore();
  const latitude = laction?.[0].toString() || "0";
  const longitude = laction?.[1].toString() || "0";

  const queryParam = new URLSearchParams();

  queryParam.append("latitude", latitude);
  queryParam.append("longitude", longitude);
  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  queryParam.append("search", query.search || "");
  query.emergency_center_type.forEach((type) =>
    queryParam.append("emergency_center_type", type)
  );

  const { data, error, isLoading } = useSWR<GetEmergencyCenterListResponse>(
    `/api/er/emergency-centers?${queryParam.toString()}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const { emergency_center_list, count } = data.result;
      setEmergencyCenters((prev) => [...prev, ...emergency_center_list]);
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setEmergencyCenters, setPageLimit, query.limit]);
  return { isLoading, emergencyCenters, error };
};
