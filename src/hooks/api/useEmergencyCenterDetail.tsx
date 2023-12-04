import { paths } from "@/types/api/api";
import useSWR from "swr";

type ResponseType =
  paths["/er/emergency-centers/{emergency_center_id}"]["get"]["responses"];
type SuccessType = ResponseType["200"]["content"]["application/json"];
type ErrorType = ResponseType["404"]["content"]["application/json"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const useEmergencyCenterDetail = (emergency_center_id: string) => {
  const { data, isLoading, error } = useSWR<SuccessType, ErrorType>(
    `/api/er/emergency-centers/${emergency_center_id}`,
    fetcher
  );

  return { emergencyCenter: data?.result, isLoading, error };
};
