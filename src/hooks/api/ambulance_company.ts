import { useAuth } from "@/providers/AuthProvider";
import _ from "lodash";
import { useGetApi } from "./api";

export const useCompanyDetailQuery = () => {
  const { user } = useAuth();

  const { data: detailData, error: detailErr } = useGetApi(
    "/ems/ambulance-companies/{ems_ambulance_company_id}",
    true,
    {
      params: {
        path: {
          ems_ambulance_company_id: user?.ambulance_company_id ?? "",
        },
      },
    }
  );
  const { data: adminData, error: adminErr } = useGetApi(
    "/ems/employees",
    true,
    {
      params: { query: { query: { role: ["ADMIN"] } } },
    }
  );

  if (!detailData || !adminData)
    return { data: undefined, error: { detailErr, adminErr } };

  if (detailErr || adminErr)
    return { data: undefined, error: { detailErr, adminErr } };

  const admin_employee_name = adminData.result.employee_list[0].employee_name;

  return {
    data: {
      ..._.pick(detailData.result, [
        "ambulance_company_name",
        "ambulance_company_address",
        "ambulance_company_area",
        "ambulance_company_phone",
      ]),
      admin_name: admin_employee_name,
    },
    error: undefined,
  };
};
