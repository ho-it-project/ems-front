import { Ambulance, AmbulanceEmployee, TeamRole } from "@/types/model";
import { Expand } from "@/types/util";
import { create } from "zustand";
import { ExpandRecursively } from "./../types/util";

type AmbulanceEmployeeState = {
  ambulance?: Ambulance;
  employees?: AmbulanceEmployee[];
};

type ModifyQueueState = {
  employee_modify_queue: {
    action: "ADD" | "REMOVE";
    employee_id: string;
    team_role: TeamRole;
  }[];
};

type Type = { type?: "DRIVER" | "OTHER" };

type State = ExpandRecursively<
  AmbulanceEmployeeState & ModifyQueueState & Type
>;

type Action = {
  setEmployee: (values: Expand<Partial<AmbulanceEmployeeState>>) => void;
  setType: (type: Type["type"]) => void;
  removeEmployee: (employee_id: string, team_role: TeamRole) => void;
  appendEmployee: (employee: AmbulanceEmployee) => void;
  resetQueue: () => void;
};

export const useAmbulanceEmployeeStore = create<State & Action>((set) => ({
  ambulance: undefined,
  employees: undefined,
  employee_modify_queue: [],
  setEmployee: (values) => set({ ...values }),
  type: undefined,
  setType: (type) => set({ type }),
  appendEmployee: ({ employee, team_role }) =>
    set(({ employee_modify_queue: q, employees }) => {
      //중복 방지: 이미 있다면, 필터를 통해서 해당 내용을 없는 것으로 취급.
      const queue = q.filter((v) => v.employee_id !== employee.employee_id);
      if (q.findIndex((v) => v.employee_id === employee.employee_id) == -1)
        queue.push({
          action: "ADD",
          employee_id: employee.employee_id,
          team_role: team_role,
        });

      //추가된 결과.
      const _employees = employees ?? [];
      _employees.push({
        employee: {
          employee_id: employee.employee_id,
          employee_name: employee.employee_name,
          id_card: employee.id_card,
          role: employee.role,
        },
        team_role: team_role,
      });

      return { employee_modify_queue: queue, employees: [..._employees] };
    }),
  removeEmployee: (employee_id, team_role) =>
    set(({ employee_modify_queue: q, employees }) => {
      //중복 방지: 이미 있다면, 필터를 통해서 해당 내용을 없는 것으로 취급.
      const queue = q.filter((v) => v.employee_id !== employee_id);
      if (q.findIndex((v) => v.employee_id === employee_id) == -1)
        queue.push({ action: "REMOVE", employee_id, team_role });

      //삭제된 결과.
      const _employees = employees?.filter(
        (v) => v.employee.employee_id !== employee_id
      );

      return { employee_modify_queue: queue, employees: _employees };
    }),
  resetQueue: () => set({ employee_modify_queue: [] }),
}));
