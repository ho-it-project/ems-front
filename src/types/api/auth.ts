export type LoginResponse = {
  result: {
    is_login: boolean;
    employee: {
      ambulance_company_id: string;
      employee_id: string;
      employee_name: string;
      id_card: string;
      role: "ADMIN" | "DRIVER" | "EMERGENCY_MEDICAL_TECHNICIAN" | "DISPATCHER";
    };
  };
  request_to_response: number;
  http_status_code: number;
  message: string;
  is_success: true;
};
