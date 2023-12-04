import { SuccessResponse } from "@/types/api";
import { create } from "zustand";

type GetPatientDetailResponse = SuccessResponse<
  "/ems/patients/{patient_id}",
  "get"
>["result"];

interface PatientDetailStore {
  patientId: string;
  patientInfo: GetPatientDetailResponse | null;
  setPatientId: (patient_id: string) => void;
  setPatientInfo: (patient_info: GetPatientDetailResponse) => void;
}

export const usePatientDetailStore = create<PatientDetailStore>((set) => ({
  patientId: "",
  patientInfo: null,
  setPatientId: (patientId: string) => set({ patientId }),
  setPatientInfo: (patient_info: GetPatientDetailResponse) =>
    set({ patientInfo: patient_info }),
}));
