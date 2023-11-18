import { useGetApi } from "@/hooks/api";
import { useDepartmentStore } from "@/store/department.store";
import { useEffect } from "react";

export const useDepartment = () => {
  const {
    departments,
    setDepartments,
    classificatedDepartments,
    setHaveSubDepartments,
    setNoSubDepartments,
  } = useDepartmentStore();

  const { data, error } = useGetApi("/er/departments", { useLoader: true });

  useEffect(() => {
    if (data) {
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
