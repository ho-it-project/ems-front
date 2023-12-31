export interface Patient {
  patient_id: string;
  patient_name: string;
  patient_birth: string;
  patient_identity_number: string;
  patient_gender: "FEMALE" | "MALE";
  patient_phone: string;
  patient_address: string;
  patient_latitude: number;
  patient_longitude: number;
  patient_severity: "SEVERE" | "MILD" | "NONE" | "UNKNOWN";
  patient_emergency_cause:
    | "TRAFFIC_ACCIDENT"
    | "FIRE"
    | "CRIMINAL"
    | "DISASTER"
    | "DISEASE"
    | "OTHER";
}

export interface Guardian {
  guardian_name: string;
  guardian_phone: string;
  guardian_address: string;
  guardian_relation:
    | "OTHER"
    | "PARENT"
    | "SPOUSE"
    | "CHILD"
    | "SIBLING"
    | "FRIEND";
}

//TODO : API TYPE 만들어지면 이동

export interface CreatePatientRequest extends Patient {
  patient_guardian?: Guardian;
}

export type GuardianRelation =
  | "OTHER"
  | "PARENT"
  | "SPOUSE"
  | "CHILD"
  | "SIBLING"
  | "FRIEND";

export type GuardianRelationKor =
  | "기타"
  | "부모"
  | "배우자"
  | "자녀"
  | "형제"
  | "친구";

export const GuardianRelationKorMap: Record<
  GuardianRelation,
  GuardianRelationKor
> = {
  OTHER: "기타",
  PARENT: "부모",
  SPOUSE: "배우자",
  CHILD: "자녀",
  SIBLING: "형제",
  FRIEND: "친구",
};
