import { paths } from "@/types/api/api";
import _ from "lodash";
import { useGetApi } from ".";

export const useEmployeeTableQuery = (
  query: paths["/ems/employees"]["get"]["parameters"]["query"]["query"]
) => {
  const { data, error, refetch } = useGetApi(
    "/ems/employees",
    { useLoader: true },
    { params: { query: { query } } }
  );
  const result = data?.result.employee_list.map((v) => {
    return _.omit(v, "created_at", "updated_at", "status");
  });
  return { data: result, error, refetch };
};
