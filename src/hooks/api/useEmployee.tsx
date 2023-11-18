import { useGetApi } from ".";

export const useEmployeeTableQuery = () => {
  const { data, error } = useGetApi(
    "/ems/employees",
    { useLoader: true },
    {
      params: { query: { query: {} } },
    }
  );
  const result = data?.result.employee_list;
  return { data: result, error };
};
