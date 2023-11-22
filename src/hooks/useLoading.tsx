"use client";
import { createContext, useContext, useId, useMemo } from "react";

export type LoadingContextState = {
  on: (key: string) => unknown;
  off: (key: string) => unknown;
};

export const LoadingContext = createContext<LoadingContextState>({
  on: () => null,
  off: () => null,
});

export function useLoading() {
  const id = useId();

  const context = useContext(LoadingContext);

  return useMemo(
    () => ({
      on: () => {
        // console.log("on:", id);
        context.on(id);
      },
      off: () => {
        // console.log("off:", id);
        context.off(id);
      },
      // id,
    }),
    [context, id]
  );
}
