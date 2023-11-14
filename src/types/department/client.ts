export interface Department {
  department_id: number;
  department_name: string;
  parent_department_id?: number | null;
  sub_departments: Department[];
}
