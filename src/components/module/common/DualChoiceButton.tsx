import { cn } from "@/lib/utils";

interface DualChoiceButtonProps {
  title: string;
  leftButton: string;
  rightButton: string;
  select?: "left" | "right";
  onClickLeftButton?: () => void;
  onClickRightButton?: () => void;
}

export const DualChoiceButton = ({
  title,
  leftButton,
  rightButton,
  onClickLeftButton,
  onClickRightButton,
  select,
}: DualChoiceButtonProps) => {
  return (
    <div className="flex flex-col gap-[1.5rem] text-center text-main">
      <p>{title}</p>
      <div className="flex h-[6.5rem] w-[31.4rem] rounded-lg bg-white text-lgrey">
        <button
          className={cn(
            "h-full w-full rounded-l-lg border-r ",
            select === "left" ? "bg-main text-white" : ""
          )}
          onClick={onClickLeftButton}
        >
          {leftButton}
        </button>
        <button
          className={cn(
            "h-full w-full rounded-r-lg border-r ",
            select === "right" ? "bg-main text-white" : ""
          )}
          onClick={onClickRightButton}
        >
          {rightButton}
        </button>
      </div>
    </div>
  );
};
