export type EmployeeRole =
  | "ADMIN"
  | "DRIVER"
  | "EMERGENCY_MEDICAL_TECHNICIAN"
  | "DISPATCHER";

export interface Employee {
  employee_id: string;
  id_card: string;
  role: EmployeeRole;
  ambulance_company_id: string;
}
