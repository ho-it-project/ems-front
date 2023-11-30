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
    | "TRANSFER"
    | "TRANSFER_COMPLETED"
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
  requestDate?: Date;
  sort: () => void;
}

export const useRequestStore = create<RequestStore>((set, get) => ({
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
      const requestDate = newRequests.reduce((prev, curr) => {
        const currDate = new Date(curr.request_date);
        if (!prev) return currDate;
        if (prev.getTime() > currDate.getTime()) return currDate;
        return prev;
      }, new Date());

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
        requestDate,
      };
    }),
  order: true,
  setOrder: (orderBy) => set((state) => ({ ...state, order: orderBy })),
  orderby: "DISTANCE",
  setOrderBy: (orderBy) => set((state) => ({ ...state, orderby: orderBy })),
  sort: () => {
    const { requests, order, orderby } = get();
    const sortedRequests = requests.sort((a, b) => {
      if (orderby === "DISTANCE") {
        if (a.distance > b.distance) return order ? 1 : -1;
        if (a.distance < b.distance) return order ? -1 : 1;
        return 0;
      }
      if (a.request_date > b.request_date) return order ? 1 : -1;
      if (a.request_date < b.request_date) return order ? -1 : 1;
      return 0;
    });
    set((state) => ({
      ...state,
      requests: sortedRequests,
      rejectedRequests: sortedRequests.filter(
        (request) => request.request_status === "REJECTED"
      ),
      requestedRequests: sortedRequests.filter(
        (request) =>
          request.request_status === "REQUESTED" ||
          request.request_status === "VIEWED"
      ),
    }));
  },
}));
