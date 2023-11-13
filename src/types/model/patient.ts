export interface Patient {
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
    | "OTHERS";
}

export interface Guardian {
  guardian_name: string;
  guardian_phone: string;
  guardian_address: string;
  guardian_relation:
    | "OTHERS"
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
