import { create } from "zustand";

interface Department {
  department_id: number;
  department_name: string;
  parent_department_id?: number | null;
  sub_departments: Department[];
}
type DepartmentStore = {
  departments: Department[];
  classificatedDepartments: {
    haveSubDepartments: Department[];
    noSubDepartments: Department[];
  };
  setDepartments: (departments: Department[]) => void;
  setHaveSubDepartments: (departments: Department[]) => void;
  setNoSubDepartments: (departments: Department[]) => void;
};

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  classificatedDepartments: {
    haveSubDepartments: [],
    noSubDepartments: [],
  },
  setDepartments: (departments: Department[]) =>
    set((state) => ({ ...state, departments })),
  setHaveSubDepartments: (departments: Department[]) =>
    set((state) => ({
      ...state,
      classificatedDepartments: {
        ...state.classificatedDepartments,
        haveSubDepartments: departments,
      },
    })),
  setNoSubDepartments: (departments: Department[]) =>
    set((state) => ({
      ...state,
      classificatedDepartments: {
        ...state.classificatedDepartments,
        noSubDepartments: departments,
      },
    })),
}));
