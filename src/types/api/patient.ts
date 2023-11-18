export interface CreatePatientResponse {
  is_success: true;
  result: {
    patient_id: string;
  };
  message: string;
}

export interface CreatePatientErrorResponse {
  is_success: false;
  message: string;
}
