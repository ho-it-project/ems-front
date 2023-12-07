import { arr_diff } from "@/lib/utils";
import {
  EmergencyCenterType,
  EmergencyCenterWithDistance,
  EmergencyRoom,
} from "@/types/model/emergencyCenter";
import { create } from "zustand";

export interface EmergencyCeterQuery {
  emergency_center_type: EmergencyCenterType[];
  search?: string;
  page: number;
  limit: number;
}

export interface GetEmergencyCenterResponseDTO
  extends EmergencyCenterWithDistance {
  emergency_rooms: (EmergencyRoom & {
    _count: { emergency_room_beds: number };
  })[];
}

interface EmergencyCenterListStore {
  query: EmergencyCeterQuery;
  emergencyCenters: GetEmergencyCenterResponseDTO[];
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
      | GetEmergencyCenterResponseDTO[]
      | ((
          prevState: GetEmergencyCenterResponseDTO[]
        ) => GetEmergencyCenterResponseDTO[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

// 고민: query와 emmergencyCenters를 각각 store로 분리할지, 하나의 store로 관리할지
export const useEmergencyCenterListStore = create<EmergencyCenterListStore>(
  (set) => ({
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
          emergencyCenters: arr_diff(
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
        | GetEmergencyCenterResponseDTO[]
        | ((
            prevState: GetEmergencyCenterResponseDTO[]
          ) => GetEmergencyCenterResponseDTO[])
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
  })
);
