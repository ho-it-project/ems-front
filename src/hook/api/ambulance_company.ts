import { useAuth } from "@/lib/auth/AuthProvider";
import { useSWRApi } from "@/lib/utils";
import { CompanyDetailResponse } from "@/type";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();
  return useSWRApi<CompanyDetailResponse>(
    `/api/ems/ambulance-companies/${user?.ambulance_company_id}`
  );
};
