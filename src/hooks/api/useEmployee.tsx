import { PathQuery } from "@/types/api";
import _ from "lodash";
import { useGetApi } from ".";

export const useEmployeeTableQuery = (
  query: PathQuery<"/ems/employees", "get">
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
