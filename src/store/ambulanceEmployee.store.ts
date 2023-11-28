import { Ambulance } from "@/types/model";
import { Employee } from "@/types/model/employee";
import {
  COmit,
  Expand,
  ExpandRecursively,
  Option,
  WithUndefined,
} from "@/types/util";
import { create } from "zustand";

//model과 실제 api에서 오는 데이터가 달라, omit을 다소 사용.
type State = ExpandRecursively<
  WithUndefined<
    {
      employee_type: undefined | "DRIVER" | "OTHER_EMPLOYEE";
    } & COmit<Ambulance, "employees"> & {
        employees: (COmit<
          Ambulance["employees"][number],
          "employee" | "ambulance"
        > & {
          employee: COmit<
            Ambulance["employees"][number]["employee"],
            "ambulance_company_id"
          >;
        })[];
      }
  > & {
    employee_modify_queue: Array<{
      action: "ADD" | "REMOVE";
      employee_id: string;
    }>;
  }
>;

type Action = {
  setAmbulance: (values: Expand<Option<State>>) => void;
  removeEmployee: (employee_id: string) => void;
  appendEmployee: (employee: Employee) => void;
  resetQueue: () => void;
};

export const useAmbulanceEmployeeStore = create<State & Action>((set) => ({
  employee_type: undefined,
  ambulance_id: undefined,
  ambulance_company: undefined,
  ambulance_company_id: undefined,
  ambulance_number: undefined,
  ambulance_type: undefined,
  employees: undefined,
  setAmbulance: (values) => set({ ...values }),
  employee_modify_queue: [],
  appendEmployee: (employee: Employee) =>
    set(({ employee_modify_queue: q, employees }) => {
      const queue = q.filter((v) => v.employee_id !== employee.employee_id);
      queue.push({ action: "ADD", employee_id: employee.employee_id });
      const _employees = employees ?? [];

      _employees.push({
        ambulance_id: employee.employee_id,
        employee_id: employee.employee_id,
        employee: {
          employee_id: employee.employee_id,
          employee_name: employee.employee_name,
          id_card: employee.id_card,
          role: employee.role,
        },
      });

      return { employee_modify_queue: queue, employees: [..._employees] };
    }),
  removeEmployee: (employee_id: string) =>
    set(({ employee_modify_queue: q, employees }) => {
      const queue = q.filter((v) => v.employee_id !== employee_id);
      queue.push({ action: "REMOVE", employee_id });

      const _employees = employees?.filter(
        (v) => v.employee_id !== employee_id
      );

      return { employee_modify_queue: queue, employees: _employees };
    }),
  resetQueue: () => set({ employee_modify_queue: [] }),
}));
