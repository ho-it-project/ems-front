"use client";
import { ThemeProvider } from "next-themes";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
export default LayoutProvider;
