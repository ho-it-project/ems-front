import { Input } from "@/components/elements/Input";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface SteperProps {
  className?: string;
  unit?: string;
  value: number | string;
  leftButtonOnClick?: () => void;
  rightButtonOnClick?: () => void;
  label?: string;
  onChageHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Steper = ({
  className,
  value = 1,
  unit,
  label,
  leftButtonOnClick,
  rightButtonOnClick,
  onChageHandler,
}: SteperProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={cn(
        "h-hull  flex min-h-[7.5rem] w-full flex-col gap-[0.2rem] rounded-lg bg-white py-[0.8rem]",
        className
      )}
    >
      {label && (
        <div className="fontSize-small flex items-center justify-center text-lgrey">
          {label}
        </div>
      )}
      <div
        className={cn("flex h-full w-full justify-between rounded-lg bg-white")}
      >
        <div className="z-10 flex flex-[0.5] items-center justify-center">
          <button onClick={leftButtonOnClick} type="button">
            <Minus width={24} />
          </button>
        </div>
        <div
          className="flex h-full w-full min-w-[10rem] flex-1 items-center justify-center gap-[1.2rem] rounded-lg border
          border-lgrey
        "
        >
          <div className="absolute opacity-0 ">
            <Input
              value={value}
              onChange={onChageHandler}
              type="text"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <span className="flex items-center">
            {value}
            {isFocused && (
              <span className="blink-cursor h-[2rem] w-[1px] bg-black " />
            )}
          </span>
          {unit && <span>{unit}</span>}
        </div>

        <div className="z-10 flex flex-[0.5] items-center justify-center">
          <button onClick={rightButtonOnClick} type="button">
            <Plus width={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
