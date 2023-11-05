import { cn } from "@/lib/utils";
import { BrandColor } from "@/type";
import { HTMLAttributes, MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  textColor?: BrandColor;
  color?: BrandColor;
  border?: "normal" | "large" | "none";
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: BrandColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  rounded?: "none" | "small" | "medium" | "large";
  className?: HTMLAttributes<HTMLButtonElement>["className"];
}

export const Button = ({
  text,
  color = "main",
  textColor = "black",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={cn(`bg-${color} rounded-[2rem] text-${textColor}`, className)}
      onClick={onClick}
    >
      <div>{text}</div>
    </button>
  );
};
