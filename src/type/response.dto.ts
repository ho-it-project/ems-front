import { Try } from ".";

interface LoginResponse_ {
  is_login: boolean;
  employee: {
    ambulance_company_id: string;
    employee_id: string;
    id_card: string;
    role: "ADMIN" | "DRIVER" | "EMERGENCY_MEDICAL_TECHNICIAN" | "DISPATCHER";
  };
}

export type LoginResponse = Try<LoginResponse_>;
