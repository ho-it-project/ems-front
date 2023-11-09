import { create } from "zustand";

export type EmergencyCenterType =
  | "NON_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_CENTER"
  | "REGIONAL_EMERGENCY_MEDICAL_CENTER";

export interface EmergencyCeterQuery {
  type: EmergencyCenterType[];
  search?: string;
  page?: number;
  limit?: number;
}

export interface EmergencyCenter {
  status: "ACTIVE" | "INACTIVE";
  distance: number;
}

interface EmergencyCenterStore {
  query: EmergencyCeterQuery;
  emmergencyCenters: EmergencyCenter[];
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQueryType: (type: EmergencyCenterType[]) => void;
  setQeurySearch: (search: string) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setEmergencyCenters: (emmergencyCenters: EmergencyCenter[]) => void;
}

// 고민: query와 emmergencyCenters를 각각 store로 분리할지, 하나의 store로 관리할지
export const useEmergencyCenterStore = create<EmergencyCenterStore>((set) => ({
  query: {
    type: [],
    search: "",
    page: 1,
    limit: 10,
  },
  pageLimit: {
    total_count: 0,
    total_page: 0,
  },
  emmergencyCenters: [],

  setQueryType: (type: EmergencyCenterType[]) =>
    set((state) => ({
      ...state,
      query: {
        type,
        search: "",
      },
    })),
  setQeurySearch: (search: string) =>
    set((state) => ({ ...state, query: { type: state.query.type, search } })),
  setQueryPage: (page: number) =>
    set((state) => ({ ...state, query: { ...state.query, page } })),
  setQueryLimit: (limit: number) =>
    set((state) => ({ ...state, query: { ...state.query, limit } })),

  setEmergencyCenters: (emmergencyCenters: EmergencyCenter[]) =>
    set((state) => ({ ...state, emmergencyCenters })),
}));
