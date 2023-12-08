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
