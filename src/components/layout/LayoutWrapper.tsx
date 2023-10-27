"use client";
import { useWindowSize } from "@/hook/useWindows";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Nav } from "./Nav";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(!open);
  };
  useEffect(() => {
    setOpen(false);
  }, [width]);
  return (
    <div className="fontSize-medium h-screen w-full bg-bg text-black">
      <div className="flex h-full w-full justify-between gap-[2rem] px-[2rem] py-[1.6rem]">
        {width && width > 914 ? (
          <Nav />
        ) : (
          <div>
            <div
              className={`fixed left-0 top-0 z-10 h-full transform bg-white shadow-large transition-transform duration-300 ${
                open ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="h-full p-[2rem]">
                <Nav shadow="large" />
              </div>
            </div>
            <button
              className={`fixed bottom-[3.6rem] left-[3.6rem] z-20 flex h-[6rem] w-[6rem] transform rounded-[1.4rem] bg-white shadow-large transition-transform duration-300 ${
                open ? "translate-x-[20.3rem]" : "translate-x-0"
              } items-center justify-center`}
              onClick={openHandler}
            >
              <Image
                className={`${open ? "rotate-180" : ""}`}
                src={"/icon/double-arrow.svg"}
                width={36}
                height={36}
                alt="menu"
              />
            </button>
          </div>
        )}
        {children}
        <div className="invisiable" />
      </div>
    </div>
  );
};
