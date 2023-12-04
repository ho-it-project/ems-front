import { SuccessResponse } from "@/types/api";
import { useEffect, useState } from "react";
import { useGetApi } from ".";

type GetEmployeeDetailDTO = SuccessResponse<
  "/ems/employees/{employee_id}",
  "get"
>["result"];

export const useEmployeeDetail = (id?: string) => {
  const [employeeDetail, setEmployeeDetail] =
    useState<GetEmployeeDetailDTO | null>(null);
  const { data, isLoading } = useGetApi(
    "/ems/employees/{employee_id}",
    { useLoader: true },
    {
      params: {
        path: {
          employee_id: id || "undefined",
        },
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    const { is_success } = data;
    if (!is_success) return;
    const { result } = data;
    console.log(result);
    setEmployeeDetail(result);
  }, [data, setEmployeeDetail]);

  return { employeeDetail, isLoading };
};
