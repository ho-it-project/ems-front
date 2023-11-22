import { Ambulance } from "@/types/model";
import { COmit, Expand, Option, WithUndefined } from "@/types/util";
import { create } from "zustand";
import { ExpandRecursively } from "./../types/util";

type AmbulanceDataFromCompanyApi = ExpandRecursively<
  COmit<Ambulance, "employees"> & {
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
>;

export type AmbulanceDriver = Expand<
  WithUndefined<AmbulanceDataFromCompanyApi>
> & {
  setAmbulance: (values: Expand<Option<AmbulanceDataFromCompanyApi>>) => void;
  refetch: undefined | (() => void);
  setRefetch: (
    refetch: () => Promise<AmbulanceDataFromCompanyApi | undefined>
  ) => void;
};

export const useAmbulanceDriverStore = create<AmbulanceDriver>((set) => ({
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
// export const useAmbulanceDriverStore = create<AmbulanceDriver>((set) => ({
//   ambulance_id: undefined,
//   ambulance_company: undefined,
//   ambulance_company_id: undefined,
//   ambulance_number: undefined,
//   ambulance_type: undefined,
//   employees: undefined,
//   setAmbulance: (values) => set((prev) => Object.assign(prev, values)),
//   refetch: undefined,
//   setRefetch: (_refetch) =>
//     set((prev) =>
//       Object.assign(prev, {
//         refetch: async () => set({ ...(await _refetch()) }),
//       })
//     ),
// }));
