"use client";
import { BrandColor } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { X } from "lucide-react";
import React from "react";

interface TabWrapperProps {
  contents: {
    title: string;
    content: React.ReactNode;
  }[];
  wdith?: string;
  bgColor?: BrandColor;
  closeButton?: boolean;
  onClickClose?: () => void;
}

export const TabWrapper = ({
  contents,
  bgColor = "white",
  closeButton = false,
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
    <Tabs
      defaultValue={contents[0].title}
      className="flex h-full flex-col rounded-lg"
    >
      <TabsList className="flex w-full gap-[2rem] bg-transparent ">
        {contents.map((content) => {
          return (
            <div key={`tab-${content.title}`} className="flex">
              <TabsTrigger
                value={content.title}
                aria-controls={`tab-${content.title}`}
                className={`fontSize-regular relative z-10 flex h-[4rem] w-[25rem] items-center rounded-t-lg px-[2rem] pb-[0.8rem]
              pt-[1.2rem]  text-main opacity-80
              data-[state=active]:${bgColorClass}
              justify-between 
              data-[state=active]:opacity-100
              ${bgColorClass}
              `}
              >
                {content.title}
                {closeButton && (
                  <div>
                    <X
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onClickClose && onClickClose();
                      }}
                    />
                  </div>
                )}
              </TabsTrigger>
            </div>
          );
        })}
      </TabsList>
      {contents.map((content) => {
        return (
          <TabsContent
            key={`tab-${content.title}-content`}
            value={content.title}
            id={`tab-${content.title}`}
            className={`h-full flex-1 overflow-hidden rounded-b-lg rounded-tr-lg px-[1.6rem] py-[0.4rem]  shadow-md   ${bgColorClass}`}
          >
            {content.content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};
