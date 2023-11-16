export type Employee = {
  employee_id: string;
  employee_name: string;
  hospital_id: string;
  id_card: string;
  password: string;
  role: "ADMIN" | "SPECIALIST" | "RESIDENT" | "NURSE" | "EMT" | "RECEPTIONIST ";

  department_id?: number;
};
