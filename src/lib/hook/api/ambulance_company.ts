import { useAuth } from "@/lib/auth/AuthProvider";
import { useSWRApi } from "@/lib/utils/api";
import { CompanyDetailResponse } from "@/types";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();

  return useSWRApi<CompanyDetailResponse>(
    `/api/ems/ambulance-companies/${user?.ambulance_company_id}`
  );
};
