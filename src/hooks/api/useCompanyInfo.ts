import { useAuth } from "@/providers/AuthProvider";
import { useGetApi } from "./api";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth({ isLogin: true });

  const { data: detailData, error: detailErr } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    { useLoader: true },
    {
      params: {
        path: {
          ems_ambulance_company_id: user?.ambulance_company_id || "",
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

  const { data: completedRequestData, error: completedRequestErr } = useGetApi(
    "/requests/ems-to-er/ems",
    { useLoader: true },
    {
      params: {
        query: {
          query: {
            request_status: ["COMPLETED"],
          },
        },
      },
    }
  );

  if (!detailData || !employeeData || !completedRequestData)
    return {
      data: undefined,
      error: { detailErr, adminErr, completedRequestErr },
    };

  if (detailErr || adminErr || completedRequestErr)
    return {
      data: undefined,
      error: { detailErr, adminErr, completedRequestErr },
    };

  const admin_employee_name = employeeData.result.employee_list.filter(
    (v) => v.role === "ADMIN"
  )[0].employee_name;

  return {
    data: {
      ...detailData.result,
      admin_name: admin_employee_name,
      employee_count: employeeData.result.employee_list.length.toString(),
      ambulance_count: detailData.result.ambulances.length.toString(),
      completed_request_count:
        completedRequestData.result.request_list.length.toString(),
    },
    error: undefined,
  };
};
