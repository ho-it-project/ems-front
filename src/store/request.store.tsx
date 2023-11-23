import { RequestInfo } from "@/types/model/request";
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
  requests: RequestInfo[];
  rejectedRequests: RequestInfo[];
  requestedRequests: RequestInfo[];
  pageStatus: "ALL" | "REQUESTED" | "REJECTED";
  setPageStatus: (status: "ALL" | "REQUESTED" | "REJECTED") => void;
  query: Query;
  setRequestList: (
    requests: RequestInfo[] | ((prevState: RequestInfo[]) => RequestInfo[])
  ) => void;
  // 정렬은 시간순과 거리순으로나누어짐 그에따른 상태는
  //
  order: boolean;
  setOrder: (orderBy: boolean) => void;
  orderby: "TIME" | "DISTANCE";
  setOrderBy: (orderBy: "TIME" | "DISTANCE") => void;
  // sort: () => void;
}

export const useRequestStore = create<RequestStore>((set) => ({
  requests: [],
  rejectedRequests: [],
  requestedRequests: [],
  pageStatus: "ALL",
  setPageStatus: (status) => set((state) => ({ ...state, pageStatus: status })),
  query: {
    limit: 1000,
    page: 1,
    request_status: ["REQUESTED", "REJECTED", "VIEWED", "ACCEPTED"],
  },
  setRequestList: (requests) =>
    set((state) => {
      const newRequests =
        typeof requests === "function" ? requests(state.requests) : requests;
      return {
        ...state,
        requests: newRequests,
        rejectedRequests: newRequests.filter(
          (request) => request.request_status === "REJECTED"
        ),
        requestedRequests: newRequests.filter(
          (request) =>
            request.request_status === "REQUESTED" ||
            request.request_status === "VIEWED"
        ),
      };
    }),
  order: true,
  setOrder: (orderBy) => set((state) => ({ ...state, order: orderBy })),
  orderby: "DISTANCE",
  setOrderBy: (orderBy) => set((state) => ({ ...state, orderby: orderBy })),
}));
