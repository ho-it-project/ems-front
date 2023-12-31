import { useAuth } from "@/providers/AuthProvider";
import { useEmergencyCenterListStore } from "@/store/emergencyCenter.store";
import { SuccessResponse } from "@/types/api";
import { useEffect } from "react";
import useSWR from "swr";
import { useGeoLocation } from "../useGeoLocation";

type GetEmergencyCenterListResponse = SuccessResponse<
  "/er/emergency-centers",
  "get"
>;
const fetcherWithToken = ({
  url,
  accessToken,
}: {
  url: string;
  accessToken: string | null;
}) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
export const useEmergencyCenterList = () => {
  const laction = useGeoLocation();
  const { emergencyCenters, query, setPageLimit, setEmergencyCenters } =
    useEmergencyCenterListStore();
  const latitude = laction?.[0].toString() || "0";
  const longitude = laction?.[1].toString() || "0";
  const { accessToken } = useAuth();

  const queryParam = new URLSearchParams();

  queryParam.append("latitude", latitude);
  queryParam.append("longitude", longitude);
  queryParam.append("page", query.page.toString());
  queryParam.append("limit", query.limit.toString());
  queryParam.append("search", query.search || "");
  query.emergency_center_type.forEach((type) =>
    queryParam.append("emergency_center_type", type)
  );

  // `/api/er/emergency-centers?${queryParam.toString()}`,
  const { data, error, isLoading } = useSWR<GetEmergencyCenterListResponse>(
    `/api/er/emergency-centers?${queryParam.toString()}`,
    (url: string) => fetcherWithToken({ url, accessToken })
  );
  // const { data, error, isLoading } = useSWR<GetEmergencyCenterListResponse>(
  //   `/api/er/emergency-centers?${queryParam.toString()}`,
  //   fetcher
  // );

  useEffect(() => {
    if (data) {
      const { emergency_center_list, count } = data.result;
      setEmergencyCenters((prev) => {
        if (
          prev.find(
            (item) =>
              item.emergency_center_id ===
              emergency_center_list[0].emergency_center_id
          )
        ) {
          return prev;
        }
        return [...prev, ...emergency_center_list];
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setEmergencyCenters, setPageLimit, query.limit]);
  return { isLoading, emergencyCenters, error };
};
