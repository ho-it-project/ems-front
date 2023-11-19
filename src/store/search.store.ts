import { PathMethod, PathQuery } from "@/types/api";
import { paths } from "@/types/api/api";
import { StoreApi, UseBoundStore, create } from "zustand";

interface QueryStore<P extends keyof paths, M extends PathMethod<P>> {
  query: PathQuery<P, M> | undefined;
  setQuery: (queries: PathQuery<P, M>) => void;
  refetch: (() => unknown) | undefined;
  setRefetch: (refetch: () => unknown) => void;
}

export function createQueryStore<
  P extends keyof paths,
  M extends PathMethod<P>,
>(url: P, method: M) {
  url;
  method;
  return create<QueryStore<P, M>>((set) => ({
    query: undefined,
    setQuery: (queries: PathQuery<P, M>) =>
      set({
        query: queries,
      }),
    refetch: undefined,
    setRefetch: (refetch: () => unknown) => set({ refetch }),
  })) as PathQuery<P, M> extends undefined
    ? never
    : UseBoundStore<StoreApi<QueryStore<P, M>>>;
}
