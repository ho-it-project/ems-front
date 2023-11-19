import { Company } from ".";
import { Employee } from "./employee";

export type AmbulanceType =
  | "GENERAL"
  | "SPECIAL"
  | "BOX_TYPE"
  | "NEGATIVE_PRESSURE";

export type AmbulanceEmployee = {
  ambulance_id: string;
  employee_id: string;

  ambulance: Ambulance;
  employee: Employee;
};

export type Ambulance = {
  ambulance_id: string;
  ambulance_company_id: string;
  ambulance_type: AmbulanceType;
  ambulance_number: string;
  employees: AmbulanceEmployee[];
  ambulance_company: Company;
};
