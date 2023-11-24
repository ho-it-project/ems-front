"use client";
import { useWindowSize } from "@/hooks";
import { useAuth } from "@/providers/AuthProvider";
import { useSocketStore } from "@/store/socket.store";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { Nav } from "./Nav";
import { SlideNav } from "./SlideNav";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowSize();
  const { initSocket, resetSocket } = useSocketStore();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;
    initSocket(accessToken);
    return () => {
      resetSocket();
    };
  }, [accessToken, initSocket, resetSocket]);

  if (!width) return <Spinner />;

  return (
    <div className="fontSize-medium h-screen w-full overflow-hidden bg-bg text-black">
      <div className="flex h-full w-full justify-between gap-[2rem] px-[2rem] py-[1.6rem]">
        {width && width > 914 ? <Nav /> : <SlideNav />}
        {children}
        <div className="invisiable" />
      </div>
    </div>
  );
};
