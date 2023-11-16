import { Department } from "./client";

export type GetDepartmentResponse = {
  result: Department[];
  is_success: boolean;
  message: string;
};
