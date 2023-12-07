import { useAuth } from "@/providers/AuthProvider";
import { useProfileStore } from "@/store/profile.store";
import { useEffect } from "react";
import { useGetApi } from ".";

export const useProfile = () => {
  const { user } = useAuth();
  const { profile, setCompany, setUser } = useProfileStore();

  const { data, error } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    { useLoader: true, enabled: !!user },
    {
      params: {
        path: {
          ems_ambulance_company_id: user?.ambulance_company_id || "",
        },
      },
    }
  );
  useEffect(() => {
    if (data?.is_success && user) {
      setCompany(data.result);
      setUser(user);
    }
  }, [data, setCompany, user, setUser]);

  return { profile, error };
};
