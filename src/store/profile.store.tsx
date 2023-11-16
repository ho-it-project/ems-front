import { Company } from "@/types/model";
import { Employee } from "@/types/model/employee";
import { create } from "zustand";

interface ProfileStore {
  profile: {
    user?: Employee;
    company?: Pick<Company, "ambulance_company_id" | "ambulance_company_name">;
  };
  setUser: (user: Employee) => void;
  setCompany: (company: Company) => void;
}

// 고민: query와 emmergencyCenters를 각각 store로 분리할지, 하나의 store로 관리할지
export const useProfileStore = create<ProfileStore>((set) => ({
  profile: {},
  setUser: (user: Employee) =>
    set((state) => ({ profile: { ...state.profile, user } })),
  setCompany: (company: Company) =>
    set((state) => ({ profile: { ...state.profile, company } })),
}));
