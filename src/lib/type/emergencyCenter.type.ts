///TODO: EmergencyCenterDetail api †ype 적용해야함
export interface EmergencyCenter_ {
  emergency_center_id: string;
  hospital_id: string;
  emergency_center_type_code: string;
  emergency_center_type:
    | "NON_EMERGENCY_MEDICAL_INSTITUTION"
    | "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
    | "LOCAL_EMERGENCY_MEDICAL_CENTER"
    | "REGIONAL_EMERGENCY_MEDICAL_CENTER";
  emergency_center_name: string;
  emergency_center_address: string;
  emergency_center_primary_phone: string;
  emergency_center_secondary_phone: string | null;
  emergency_center_latitude: number;
  emergency_center_longitude: number;
}

export interface Hospital {
  hospital_id: string;
  hospital_name: string;
  hospital_address: string;
  hospital_phone: string | null;
  hospital_city: string;
  hospital_district: string;
  latitude: number | null;
  longitude: number | null;
}

export interface HospitalDepartment {
  hospital_id: string;
  department_id: number;
  status: "ACITVE" | "INACTIVE";
}
export interface Department {
  department_id: number;
  department_name: string;
  parent_department_id: number | null;
}

export interface HospitalMedicalEquipment {
  hospital_id: string;
  medical_equipment_id: number;
  medical_equipment_count: number;
  status: "ACTIVE" | "INACTIVE";
}

export interface MedicalEquipment {
  medical_equipment_id: number;
  medical_equipment_name: string;
}

export interface HospitalServereIllness {
  hospital_id: string;
  servere_illness_id: string;
  status: "ACTIVE" | "INACTIVE";
}
export interface ServereIllness {
  servere_illness_id: string;
  servere_illness_name: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface EmergencyRoom {
  emergency_room_id: string;
  emergency_center_id: string;
  emergency_room_type: EmergencyRoomType;
  emergency_room_name: string;
}

export interface EmergencyRoomBed {
  emergency_room_id: string;
  emergency_room_bed_num: number;
  emergency_room_bed_status:
    | "AVAILABLE"
    | "OCCUPIED"
    | "CLEANING"
    | "MAINTENANCE";
  status: "ACTIVE" | "INACTIVE";
}

export interface GetEmergencyCenterDetailResponse extends EmergencyCenter_ {
  hospital: Hospital & {
    hospital_departments: (HospitalDepartment & {
      department: Department;
    })[];
    hospital_medical_equipment: (HospitalMedicalEquipment & {
      medical_equipment: MedicalEquipment;
    })[];
    hospital_severe_illnesse: (HospitalServereIllness & {
      severe_illness: ServereIllness;
    })[];
  };
  emergency_rooms: (EmergencyRoom & {
    emergency_room_beds: EmergencyRoomBed[];
    _count: {
      emergency_room_beds: number;
    };
  })[];
}

export type EmergencyRoomType =
  | "GENERAL"
  | "COHORT_ISOLATION"
  | "NEGATIVE_PRESSURE_ISOLATION"
  | "STANDARD_ISOLATION"
  | "PEDIATRIC"
  | "PEDIATRIC_NEGATIVE_PRESSURE_ISOLATION"
  | "PEDIATRIC_STANDARD_ISOLATION";

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
