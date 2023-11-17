export type EmployeeRole =
  | "ADMIN"
  | "DRIVER"
  | "EMERGENCY_MEDICAL_TECHNICIAN"
  | "DISPATCHER";

export const EmployeeRoleLabel: Record<EmployeeRole, string> = {
  ADMIN: "관리자",
  DRIVER: "기사",
  EMERGENCY_MEDICAL_TECHNICIAN: "응급구조사",
  DISPATCHER: "디스패처",
};

export interface Employee {
  employee_id: string;
  id_card: string;
  role: EmployeeRole;
  ambulance_company_id: string;
  employee_name: string;
}
