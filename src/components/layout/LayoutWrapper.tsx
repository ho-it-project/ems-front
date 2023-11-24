"use client";
import { useWindowSize } from "@/hooks";
import { useRequestSocket } from "@/hooks/socket/useRequestSocket";
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

  // 소켓 핸들러  /// 아래 훅은 소켓 이벤트 핸들러입니다 지우지마세요
  useRequestSocket();

  // 소켓 초기화
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
