import { Employee } from "./employee";

export type AmbulanceType =
  | "GENERAL"
  | "SPECIAL"
  | "BOX_TYPE"
  | "NEGATIVE_PRESSURE";

export type TeamRole =
  | "DRIVER"
  | "EMERGENCY_MEDICAL_TECHNICIAN"
  | "DISPATCHER"
  | "OTHER";

export type AmbulanceEmployee = {
  // ambulance_id: string;
  // employee_id: string;

  // ambulance: Ambulance;
  employee: Omit<Employee, "ambulance_company_id">;
  team_role: TeamRole;
};

export type Ambulance = {
  ambulance_id: string;
  ambulance_company_id: string;
  ambulance_type: AmbulanceType;
  ambulance_number: string;
  // employees: AmbulanceEmployee[];
  // ambulance_company: Company;
};
