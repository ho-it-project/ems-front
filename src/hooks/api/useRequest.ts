import { useRequestStore } from "@/store/request.store";
import { useEffect } from "react";
import { useGetApi } from ".";

export const useRequest = () => {
  const { request_list, query, setRequestList, setPageLimit } =
    useRequestStore();
  const { data, isLoading } = useGetApi(
    "/requests/ems-to-er/ems",
    { useLoader: true },
    {
      params: {
        query: { query: { ...query } },
      },
    }
  );
  useEffect(() => {
    if (data) {
      const { result } = data;
      const { request_list, count } = result;
      setRequestList((prev) => {
        if (!request_list.length) return prev;
        if (
          prev.find(
            (item) =>
              item.emergency_center_id === request_list[0].emergency_center_id
          )
        )
          return prev;
        return [...prev, ...request_list];
      });
      setPageLimit({
        total_count: count,
        total_page: Math.ceil(count / query.limit),
      });
    }
  }, [data, setRequestList, setPageLimit, query?.limit]);

  return { request_list, isLoading };
};
