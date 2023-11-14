import { Model } from ".";

export type Patient = Model<{
  patient_id: "string";
  airway_status: "OPEN";
  breathing_rate: 0;
  breathing_quality: "NORMAL";
  circulation_pulse: 0;
  circulation_systolic_blood_pressure: 0;
  circulation_diastolic_blood_pressure: 0;
  disability_avpu: "ALERT";
  exposure_notes: "string";
}>;
