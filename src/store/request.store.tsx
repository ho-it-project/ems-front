import { arr_diff } from "@/lib/utils";
import { RequestInfo, RequestStatus } from "@/types/model/request";
import { create } from "zustand";

interface Query {
  page: number;
  limit: number;
  search?: string;
  search_type?:
    | "patient_name"
    | "ambulance_company_name"
    | "patient_symptom_summary";
  request_status?: (
    | "REQUESTED"
    | "ACCEPTED"
    | "CANCELED"
    | "COMPLETED"
    | "VIEWED"
    | "REJECTED"
  )[];
  patient_gender?: ("FEMALE" | "MALE")[];
  patient_severity?: ("UNKNOWN" | "SEVERE" | "MILD" | "NONE")[];
  request_start_date?: string;
}

interface RequestStore {
  request_list: RequestInfo[];
  query: Query;
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQueryStatus: (request_status?: RequestStatus[]) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setRequestList: (
    request_list: RequestInfo[] | ((prevState: RequestInfo[]) => RequestInfo[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  request_list: [],
  query: {
    limit: 20,
    page: 1,
  },
  pageLimit: {
    total_count: 0,
    total_page: 0,
  },
  setQueryStatus: (request_status?: RequestStatus[]) =>
    set((state) => {
      return {
        ...state,
        query: {
          ...state.query,
          request_status,
          page: 1,
        },
        request_list: arr_diff(
          state.query?.request_status || [],
          request_status || []
        )
          ? []
          : state.request_list,
      };
    }),

  setRequestList: (
    request_list: RequestInfo[] | ((prevState: RequestInfo[]) => RequestInfo[])
  ) =>
    set((state) => {
      return {
        ...state,
        request_list:
          typeof request_list === "function"
            ? request_list(state.request_list)
            : request_list,
      };
    }),

  setQueryPage: (page: number) =>
    set((state) => {
      return {
        ...state,
        query: {
          ...state.query,
          page,
        },
      };
    }),
  setQueryLimit: (limit: number) =>
    set((state) => {
      return {
        ...state,
        query: {
          ...state.query,
          limit,
        },
        request_list: [],
      };
    }),
  setPageLimit: (pageLimit: { total_count: number; total_page: number }) =>
    set((state) => {
      return {
        ...state,
        pageLimit,
      };
    }),
}));
