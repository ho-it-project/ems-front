import { arr_diff } from "@/lib/utils";
import { create } from "zustand";

export type EmergencyCenterType =
  | "NON_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_CENTER"
  | "REGIONAL_EMERGENCY_MEDICAL_CENTER";

export const EMERGENCY_CENTER_TYPE: {
  [key in EmergencyCenterType]: string;
} = {
  NON_EMERGENCY_MEDICAL_INSTITUTION: "일반의료기관",
  LOCAL_EMERGENCY_MEDICAL_INSTITUTION: "지역응급의료기관",
  LOCAL_EMERGENCY_MEDICAL_CENTER: "지역응급의료센터",
  REGIONAL_EMERGENCY_MEDICAL_CENTER: "권역응급의료센터",
};

export interface EmergencyCeterQuery {
  emergency_center_type: EmergencyCenterType[];
  search?: string;
  page: number;
  limit: number;
}

export interface EmergencyCenter {
  emergency_center_name: string;
  emergency_center_type: EmergencyCenterType;
  distance: string;
  emergency_center_primary_phone: string;
  emergency_center_address: string;
}

interface EmergencyCenterStore {
  query: EmergencyCeterQuery;
  emergencyCenters: EmergencyCenter[];
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQueryType: (type: EmergencyCenterType[]) => void;
  setQeurySearch: (search: string) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setEmergencyCenters: (
    emmergencyCenters:
      | EmergencyCenter[]
      | ((prevState: EmergencyCenter[]) => EmergencyCenter[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

// 고민: query와 emmergencyCenters를 각각 store로 분리할지, 하나의 store로 관리할지
export const useEmergencyCenterStore = create<EmergencyCenterStore>((set) => ({
  query: {
    emergency_center_type: [],
    search: "",
    page: 1,
    limit: 10,
  },
  pageLimit: {
    total_count: 0,
    total_page: 0,
  },
  emergencyCenters: [],

  setQueryType: (emergency_center_type: EmergencyCenterType[]) =>
    set((state) => {
      return {
        ...state,
        emmergencyCenters: arr_diff(
          emergency_center_type,
          state.query.emergency_center_type
        )
          ? []
          : state.emergencyCenters,
        query: { ...state.query, emergency_center_type, page: 1, search: "" },
      };
    }),
  setQeurySearch: (search: string) =>
    set((state) => ({
      ...state,
      emergencyCenters:
        search !== state.query.search ? [] : state.emergencyCenters,
      query: { ...state.query, search, page: 1 },
    })),
  setQueryPage: (page: number) =>
    set((state) => ({ ...state, query: { ...state.query, page } })),
  setQueryLimit: (limit: number) =>
    set((state) => ({ ...state, query: { ...state.query, limit } })),

  setEmergencyCenters: (
    emergencyCenters:
      | EmergencyCenter[]
      | ((prevState: EmergencyCenter[]) => EmergencyCenter[])
  ) =>
    set((state) => {
      // Check if emergencyCenters is a function and call it with the current state if it is
      const newEmergencyCenters =
        typeof emergencyCenters === "function"
          ? emergencyCenters(state.emergencyCenters)
          : emergencyCenters;

      return { ...state, emergencyCenters: newEmergencyCenters };
    }),
  setPageLimit: (pageLimit: { total_count: number; total_page: number }) =>
    set((state) => ({ ...state, pageLimit })),
}));
