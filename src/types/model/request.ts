export type RequestStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "CANCELED"
  | "COMPLETED"
  | "VIEWED"
  | "REJECTED";

export interface RequestInfo {
  patient_id: string;
  emergency_center_id: string;
  request_status: RequestStatus;
  request_date: string;
  reject_reason?: string | null;
  response_date: string;
  emergency_center_name: string;
  emergency_center_latitude: number;
  emergency_center_longitude: number;
  distance: number;
}

export type ReqeustStatueKor =
  | "요청"
  | "수락"
  | "취소"
  | "완료"
  | "열람"
  | "거절";

export type ReqeustStatueKorMap = {
  [key in RequestStatus]: ReqeustStatueKor;
};

export const reqeustStatueKorMap: ReqeustStatueKorMap = {
  REQUESTED: "요청",
  ACCEPTED: "수락",
  CANCELED: "취소",
  COMPLETED: "완료",
  VIEWED: "열람",
  REJECTED: "거절",
};
