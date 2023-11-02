"use client";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({
  className,
  defaultValue,
  max = 10,
  ...props
}: SliderProps) {
  const [value, setValue] = useState(defaultValue || [0]);
  const markArray = Array.from(Array(max + 1).keys());
  const onChange = (value: number[]) => {
    setValue(value);
  };
  console.log(value);
  return (
    <div className="relative flex w-full flex-col gap-[0.8rem]">
      <div className="relative flex w-full ">
        <div
          className="itmes-center absolute flex h-[1rem] justify-between px-[1.2rem]"
          style={{ width: "calc(100% - 1rem)" }}
        >
          {markArray.map((_, index) =>
            index % 5 === 0 ? (
              <span
                className={cn(
                  " absolute top-[0.05rem] block h-[1rem] w-[1rem] -translate-y-1/2 rounded-full",
                  index <= value[0] ? "bg-main" : "bg-lgrey"
                )}
                style={{ left: `${(100 / max) * index}%` }}
                key={index}
              />
            ) : (
              <span
                className={cn(
                  "absolute  top-[0.05rem] block h-[0.9rem] w-[0.1rem] -translate-y-1/2 ",
                  index <= value[0] ? "bg-main" : "bg-lgrey"
                )}
                style={{ left: `${(100 / max) * index}%` }}
                key={index}
              />
            )
          )}
        </div>

        <Slider
          defaultValue={value}
          max={max}
          step={1}
          className={cn(className)}
          {...props}
          onValueChange={onChange}
        />
      </div>
      <div className="fontSize-small flex w-full justify-between text-center text-lgrey">
        {markArray.map((mark, index) =>
          index % 5 === 0 && value[0] !== index ? (
            <span
              className={cn("block h-[1rem] w-[1rem] rounded-full")}
              key={index}
            >
              {index}
            </span>
          ) : (
            <span className={cn("block h-[0.9rem] w-[1rem]")} key={index} />
          )
        )}
      </div>
      <div className="fontSize-small fontSize-regular absolute top-[1.6rem] flex w-full justify-between text-center">
        {markArray.map((mark, index) =>
          value[0] === index ? (
            <span
              className={cn("block h-[1rem] w-[2.4rem] rounded-full")}
              key={index}
            >
              {value}
            </span>
          ) : (
            <span className={cn("block h-[0.9rem] w-[1rem]")} key={index} />
          )
        )}
      </div>
    </div>
  );
}

{
  /* <div className="flex w-full justify-between">
{markArray.map((mark, index) =>
  index % 5 === 0 ? (
    <span
      className={cn(
        "absolute block h-[1rem] w-[1rem] -translate-y-1/2 rounded-full",
        index <= value ? "bg-main" : "bg-lgrey"
      )}
      style={{ left: `${(100 / max) * index}%` }}
      key={index}
    />
  ) : (
    <span
      className={cn(
        "absolute block h-[1rem] w-[0.1rem] -translate-y-1/2",
        index <= value ? "bg-main" : "bg-lgrey"
      )}
      style={{ left: `${(100 / max) * index}%` }}
      key={index}
    />
  )
)}
</div> */
}
