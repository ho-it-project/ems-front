"use client";
import Spinner from "@/components/Spinner";
import { LoadingContext, LoadingContextState } from "@/hooks/useLoading";
import { ReactNode, useMemo, useState } from "react";

const SpinnerOverlay = ({
  children,
  zIndex = "z-50",
}: {
  children: ReactNode;
  zIndex: string | number;
}) => {
  return (
    <div
      className={`fixed left-0 right-0 top-1/2 mx-auto flex h-screen w-screen -translate-y-1/2 items-center justify-center bg-transparent ${zIndex}`}
    >
      <div className="fixed h-full w-full bg-gray-600/10 opacity-50"></div>
      {children}
    </div>
  );
};

type LoadingProviderProps = {
  children?: ReactNode;
};

export const LoadingProvider = (props: LoadingProviderProps) => {
  const [loadingState, setLoadingState] = useState<{ [key: string]: true }>({});
  const { children } = props;

  const value = useMemo<LoadingContextState>(
    () => ({
      on: (key: string) =>
        setLoadingState((set) => {
          return {
            ...set,
            [key]: true,
          };
        }),
      off: (key: string) =>
        setLoadingState((set) => {
          const newSet = { ...set };

          delete newSet[key];

          return newSet;
        }),
    }),
    []
  );

  const isLoading = Object.keys(loadingState).length > 0;

  return (
    <LoadingContext.Provider value={value}>
      {isLoading && (
        <SpinnerOverlay zIndex={100}>
          <Spinner />
        </SpinnerOverlay>
      )}

      {children}
    </LoadingContext.Provider>
  );
};
