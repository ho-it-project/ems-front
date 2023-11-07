import { cn } from "@/lib/utils";
import { BrandColor } from "@/types";

interface SymptomLabeledProps {
  title: string;
  description: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  bgColor?: BrandColor;
}

export const SymptomLabel = ({
  title,
  description,
  children,
  bgColor = "white",
}: SymptomLabeledProps) => {
  const bgColorClass = `bg-${bgColor}`;
  return (
    <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
      <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
        <span className="fontSize-medium text-main">{title}</span>
        <span className="fontSize-small text-lgrey">{description}</span>
      </div>
      <div
        className={cn(
          "flex h-full w-full flex-col justify-center rounded-lg",
          bgColorClass
        )}
      >
        {children}
      </div>
    </div>
  );
};
