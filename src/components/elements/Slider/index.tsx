"use client";
import { cn } from "@/lib/utils";
import { ForwardedRef, forwardRef } from "react";

interface SliderProps {
  className?: string;
  defaultValue?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Slider = forwardRef(
  (
    {
      max = 10,
      step = 1,
      value = 0,
      onChange,
      ...props
    }: SliderProps & React.ComponentPropsWithoutRef<"input">,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const markArray = Array.from(Array(max + 1).keys());
    return (
      <div className="relative flex w-full flex-col gap-[0.8rem]">
        <div className="relative flex w-full ">
          <div
            className="itmes-center absolute flex h-[1rem] justify-between "
            style={{ width: "calc(100% - 1rem)" }}
          >
            <div className="flex w-full translate-x-[0.5rem] items-center">
              {markArray.slice(0, max).map((mark, index) => {
                return (
                  <span
                    key={index}
                    className={cn(
                      "h-1 w-full",
                      index < value ? "bg-main" : "bg-lgrey"
                    )}
                  />
                );
              })}
            </div>
            {markArray.map((_, index) =>
              index % 5 === 0 ? (
                <div
                  className={cn(
                    "absolute flex h-[1rem] w-[1rem] justify-center"
                  )}
                  style={{ left: `${(100 / max) * index}%` }}
                  key={index}
                >
                  <span
                    className={cn(
                      "h-full w-full rounded-full ",
                      index <= value ? "bg-main" : "bg-lgrey"
                    )}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "absolute flex h-[1rem] w-[1rem] justify-center"
                  )}
                  style={{ left: `${(100 / max) * index}%` }}
                  key={index}
                >
                  <span
                    className={cn(
                      "absolute block h-[0.9rem] w-[0.1rem] ",
                      index <= value ? "bg-main" : "bg-lgrey"
                    )}
                    key={index}
                  />
                </div>
              )
            )}{" "}
          </div>
        </div>
        <span
          className="absolute  -left-[0.7rem] -top-[0.7rem] h-[2.4rem] w-[2.4rem] rounded-full bg-white opacity-100"
          style={{
            zIndex: 1,
            left: `calc(${(100 / max) * value}% - ${
              0.7 + (1 / max) * value
            }rem)`,
          }}
        />
        <span
          className="fontSize-regular  absolute -left-[0.7rem] -top-[0.7rem] mt-[2.4rem] h-[2.4rem]  w-[2.4rem] text-center"
          style={{
            zIndex: 1,
            left: `calc(${(100 / max) * value}% - ${
              0.7 + (1 / max) * value
            }rem)`,
          }}
        >
          {value}
        </span>
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="absolute  -top-[0.5rem] h-[2.4rem] w-full cursor-pointer appearance-none rounded-full bg-white opacity-0 "
          style={{ zIndex: 2 }}
          {...props}
          ref={ref}
        />
        <div className="fontSize-small flex w-full justify-between text-center text-lgrey">
          {markArray.map((mark, index) =>
            index % 5 === 0 && value !== index ? (
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
      </div>
    );
  }
);

Slider.displayName = "Slider";
