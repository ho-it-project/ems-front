import { Input } from "@/components/elements/Input";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface SteperProps {
  className?: string;
  unit?: string;
  value: number;
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
        <div className="flex flex-[0.5] items-center justify-center">
          <button onClick={leftButtonOnClick} type="button">
            <Minus width={24} />
          </button>
        </div>
        <div
          className="flex h-full w-full min-w-[10rem] flex-1 items-center justify-center gap-[1.2rem] rounded-lg border
          border-lgrey
        "
        >
          <div className="absolute opacity-0">
            <Input value={value} onChange={onChageHandler} type="text" />
          </div>
          {value}
          {unit && <span>{unit}</span>}
        </div>

        <div className="flex flex-[0.5] items-center justify-center">
          <button onClick={rightButtonOnClick}>
            <Plus width={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
