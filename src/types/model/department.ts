export interface Department {
  department_id: number;
  department_name: string;
  parent_department_id: number | null;
}
export interface HospitalDepartment {
  hospital_id: string;
  department_id: number;
  status: "ACITVE" | "INACTIVE";
}
