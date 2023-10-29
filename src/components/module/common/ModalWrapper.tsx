"use client";
import { cn } from "@/lib/utils";
import { BrandColor } from "@/type";
import { X } from "lucide-react";
import React from "react";

interface TabWrapperProps {
  content: {
    title: string;
    content: React.ReactNode;
  };
  wdith?: string;
  bgColor?: BrandColor;
  onClickClose?: () => void;
}

export const ModalWrapper = ({
  content,
  bgColor = "white",
  onClickClose,
}: TabWrapperProps) => {
  const [rendered, setRendered] = React.useState(false);
  React.useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) {
    return null;
  }
  const bgColorClass = `bg-${bgColor}`;

  return (
    <div className="fontSize-regular flex flex-col text-main">
      <div className="h-[4.2rem] w-full">
        <div
          className={cn(
            "flex w-[26rem] items-center justify-between rounded-t-lg pb-[0.8rem] pl-[3rem] pr-[1.2rem] pt-[1.2rem]",
            bgColorClass
          )}
        >
          <p>{content.title}</p>
          <X
            width={30}
            height={30}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClickClose && onClickClose();
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div
        className={cn(
          "flex rounded-b-lg rounded-tr-lg pb-[3rem] pl-[3rem] pr-[1.6rem] pt-[1.4rem]",
          bgColorClass
        )}
      >
        {content.content}
      </div>
    </div>
  );
};
