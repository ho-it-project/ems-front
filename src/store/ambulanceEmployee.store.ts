import { Ambulance } from "@/types/model";
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
  >
>;

type Action = {
  setAmbulance: (values: Expand<Option<State>>) => void;
  refetch: undefined | (() => void);
  setRefetch: (
    refetch: () => Promise<COmit<State, "employee_type"> | undefined>
  ) => void;
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
  refetch: undefined,
  setRefetch: (_refetch) =>
    set({ refetch: async () => set({ ...(await _refetch()) }) }),
}));
