import { useAuth } from "@/lib/auth/AuthProvider";
import { useSWRApi } from "@/lib/utils";
import { CompanyDetailReturn } from "@/types";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();
  return useSWRApi<CompanyDetailReturn>(
    `/api/ems/ambulance-companies/${user?.ambulance_company_id}`
  );
};
