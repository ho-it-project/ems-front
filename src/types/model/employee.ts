export const employeeRoles = [
  "ADMIN",
  "DISPATCHER",
  "DRIVER",
  "EMERGENCY_MEDICAL_TECHNICIAN",
] as const;

export type EmployeeRole = (typeof employeeRoles)[number];

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

//Model을 사용한, 2군데 이상에서 쓰이는 타입들. (위는 model에 대한 것. 아래는 모델 응용 타입)
export type EmployeeAdd = Pick<
  Employee,
  "id_card" | "employee_name" | "role"
> & {
  password: string;
};

export type EmployeeEdit = Pick<
  Employee,
  "employee_id" | "id_card" | "employee_name" | "role"
>;
