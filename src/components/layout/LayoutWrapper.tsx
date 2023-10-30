"use client";
import { useWindowSize } from "@/hook/useWindows";
import { Nav } from "./Nav";
import { SlideNav } from "./SlideNav";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  return (
    <div className="fontSize-medium h-screen w-full bg-bg text-black">
      <div className="flex h-full w-full justify-between gap-[2rem] px-[2rem] py-[1.6rem]">
        {width && width > 914 ? <Nav /> : <SlideNav />}
        {children}
        <div className="invisiable" />
      </div>
    </div>
  );
};
