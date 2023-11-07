import { Try } from ".";

export type LoginResponse = Try<{
  is_login: boolean;
  employee: {
    ambulance_company_id: string;
    employee_id: string;
    id_card: string;
    role: "ADMIN" | "DRIVER" | "EMERGENCY_MEDICAL_TECHNICIAN" | "DISPATCHER";
  };
}>;
