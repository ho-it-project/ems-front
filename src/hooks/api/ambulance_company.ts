import { useAuth } from "@/providers/AuthProvider";
import { useGetApi } from "./api";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();

  const { data: detailData, error: detailErr } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    { useLoader: true },
    {
      params: {
        path: {
          ems_ambulance_company_id: user?.ambulance_company_id ?? "",
        },
      },
    }
  );
  const { data: employeeData, error: adminErr } = useGetApi(
    "/ems/employees",
    { useLoader: true },
    {
      params: { query: { query: {} } },
    }
  );

  if (!detailData || !employeeData)
    return { data: undefined, error: { detailErr, adminErr } };

  if (detailErr || adminErr)
    return { data: undefined, error: { detailErr, adminErr } };

  const admin_employee_name = employeeData.result.employee_list.filter(
    (v) => v.role === "ADMIN"
  )[0].employee_name;

  return {
    data: {
      ...detailData.result,
      admin_name: admin_employee_name,
      employee_count: employeeData.result.employee_list.length.toString(),
      ambulance_count: detailData.result.ambulances.length.toString(),
    },
    error: undefined,
  };
};
