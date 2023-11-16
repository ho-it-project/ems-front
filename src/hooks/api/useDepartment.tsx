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

  const { data, error } = useGetApi("/er/departments");

  useEffect(() => {
    if (data) {
      const parentDepartments = data.filter(
        (item) => !item.parent_department_id
      );
      const classify = parentDepartments.map((parent) => ({
        ...parent,
        sub_departments: data.filter(
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
      setDepartments(data);
    }
  }, [data, setDepartments, setHaveSubDepartments, setNoSubDepartments]);

  return { departments, classificatedDepartments, error };
};
