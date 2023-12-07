import { ErrorResponse, SuccessResponse } from "../api";

export type EmergencyCenterType =
  | "NON_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
  | "LOCAL_EMERGENCY_MEDICAL_CENTER"
  | "REGIONAL_EMERGENCY_MEDICAL_CENTER";

export type EmergencyRoomType =
  | "GENERAL"
  | "COHORT_ISOLATION"
  | "NEGATIVE_PRESSURE_ISOLATION"
  | "STANDARD_ISOLATION"
  | "PEDIATRIC"
  | "PEDIATRIC_NEGATIVE_PRESSURE_ISOLATION"
  | "PEDIATRIC_STANDARD_ISOLATION";

export type EmergencyRoomBedStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "CLEANING"
  | "MAINTENANCE";

export interface EmergencyCenter {
  emergency_center_id: string;
  hospital_id: string;
  emergency_center_type_code: string;
  emergency_center_type: EmergencyCenterType;
  emergency_center_name: string;
  emergency_center_address: string;
  emergency_center_primary_phone: string;
  emergency_center_secondary_phone: string | null;
  emergency_center_latitude: number;
  emergency_center_longitude: number;
}

export interface EmergencyCenterWithDistance extends EmergencyCenter {
  distance: number;
}

export interface EmergencyRoom {
  emergency_room_id: string;
  emergency_center_id: string;
  emergency_room_type: EmergencyRoomType;
  emergency_room_name: string;
  emergency_room_beds: EmergencyRoomBed[];
}

export interface EmergencyRoomBed {
  emergency_room_id: string;
  emergency_room_bed_num: number;
  emergency_room_bed_status: EmergencyRoomBedStatus;
  patient_id: string | null;
}

export interface EmergencyRoomWithBeds extends EmergencyRoom {
  emergency_room_beds: EmergencyRoomBed[];
  _count: {
    emergency_room_beds: number;
  };
}

export const EMERGENCY_ROOM_TYPE_KOR: {
  [key in EmergencyRoomType]: string;
} = {
  GENERAL: "일반",
  COHORT_ISOLATION: "코호트",
  NEGATIVE_PRESSURE_ISOLATION: "음압격리",
  STANDARD_ISOLATION: "일반격리",
  PEDIATRIC: "소아",
  PEDIATRIC_NEGATIVE_PRESSURE_ISOLATION: "소아음압격리",
  PEDIATRIC_STANDARD_ISOLATION: "소아일반격리",
};

export const EMERGENCY_CENTER_TYPE: {
  [key in EmergencyCenterType]: string;
} = {
  NON_EMERGENCY_MEDICAL_INSTITUTION: "일반의료기관",
  LOCAL_EMERGENCY_MEDICAL_INSTITUTION: "지역응급의료기관",
  LOCAL_EMERGENCY_MEDICAL_CENTER: "지역응급의료센터",
  REGIONAL_EMERGENCY_MEDICAL_CENTER: "권역응급의료센터",
};

export type GetEmergencyCenterDetailSuccessResponse = SuccessResponse<
  "/er/emergency-centers/{emergency_center_id}",
  "get"
>;
export type GetEmergencyCenterDetailFailureResponse = ErrorResponse<
  "/er/emergency-centers/{emergency_center_id}",
  "get"
>;
