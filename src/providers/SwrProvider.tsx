"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: React.PropsWithChildren) => {
  return <SWRConfig>{children}</SWRConfig>;
};
