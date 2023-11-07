import { useSWRApi } from "@/lib/utils/api";
import { useDepartmentStore } from "@/store/department.store";
import { useEffect } from "react";
import { GetDepartmentResponse } from "../type/department/remote";

export const useDepartment = () => {
  const {
    departments,
    setDepartments,
    classificatedDepartments,
    setHaveSubDepartments,
    setNoSubDepartments,
  } = useDepartmentStore();

  const { data, error } = useSWRApi<GetDepartmentResponse>(
    "/api/er/departments"
  );

  useEffect(() => {
    if (data && data.is_success) {
      const parentDepartments = data.result.filter(
        (item) => !item.parent_department_id
      );
      const classify = parentDepartments.map((parent) => ({
        ...parent,
        sub_departments: data.result.filter(
          (sub) => sub.parent_department_id === parent.department_id
        ),
      }));
      const haveSubDepartments = classify.filter(
        (item) => item.sub_departments.length
      );
      const noSubDepartments = classify.filter(
        (item) => !item.sub_departments.length
      );

      setHaveSubDepartments(haveSubDepartments);
      setNoSubDepartments(noSubDepartments);
      setDepartments(data.result);
    }
  }, [data, setDepartments, setHaveSubDepartments, setNoSubDepartments]);

  return { departments, classificatedDepartments, error };
};
