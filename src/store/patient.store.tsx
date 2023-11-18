import { Guardian, Patient } from "@/types/model/patient";
import { create } from "zustand";

interface PatientStore {
  patient?: Patient;
  guardian?: Guardian;
  setPatient: (patient: Patient) => void;
  setGuardian: (guardian: Guardian) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patient: undefined,
  guardian: undefined,
  setPatient: (patient: Patient) => set((state) => ({ ...state, patient })),
  setGuardian: (guardian: Guardian) => set((state) => ({ ...state, guardian })),
}));
