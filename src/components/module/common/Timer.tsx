"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime?: Date;
  className?: string;
}

export const Timer = ({ startTime, className }: TimerProps) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (startTime) {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      setTime(diff / 1000);
    }
  }, [startTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {
        <span className={cn(className)}>
          {Math.floor(time / 60)}분 {Math.floor(time % 60)}초
        </span>
      }
    </>
  );
};
