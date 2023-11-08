import { useSWRApi } from "@/hooks/api";
import { useAuth } from "@/providers/AuthProvider";
import { CompanyDetailReturn } from "@/types/api";
export const useCompanyDetailQuery = () => {
  const { user } = useAuth();
  return useSWRApi<CompanyDetailReturn>(
    `/api/ems/ambulance-companies/${user?.ambulance_company_id}`
  );
};
