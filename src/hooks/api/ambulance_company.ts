import { useAuth } from "@/providers/AuthProvider";
import { useGetApi } from "./api";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();
  return useGetApi("/ems/ambulance-companies/{ems_ambulance_company_id}", {
    params: {
      path: {
        ems_ambulance_company_id: user?.ambulance_company_id ?? "",
      },
    },
  });
};
