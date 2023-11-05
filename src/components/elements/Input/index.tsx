import { cn } from "@/lib/utils";
import { FontSize } from "@/type";
import Image from "next/image";
import React, { ForwardedRef } from "react";
interface InputProps {
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  placeholderColor?: "grey" | "main";
  rounded?: "normal" | "large";
  fontSize?: FontSize;
  name?: string;
  bgColor?: "transparent" | "bg" | "white";
  color?: "white" | "black";
  width?: string;
  height?: "normal" | "large";
  border?: "normal" | "large" | "none";
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: "black" | "grey" | "main";
  textLocation?: "left" | "center" | "right";
  img?: string;
  className?: string;
}

export const Input = React.forwardRef(
  (
    {
      value,
      onChange,
      placeholder,
      placeholderColor = "grey",
      rounded = "normal",
      fontSize = "medium",
      name,
      bgColor = "white",
      color = "black",
      width,
      height = "normal",
      border = "normal",
      borderStyle = "solid",
      borderColor = "main",
      textLocation = "center",
      img,
      className,
      ...props
    }: InputProps & React.ComponentPropsWithoutRef<"input">,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    // Input Size
    const heightClass = height === "normal" ? "h-[4rem]" : "h-[6rem]";
    const widthClass = width ? width : "w-full";

    // Style
    const roundedClass =
      rounded === "normal" ? "rounded-[0.8rem]" : "rounded-[3rem]";
    const bgColorClass =
      bgColor === "transparent"
        ? "bg-transparent"
        : bgColor === "bg"
        ? "bg-bg"
        : "bg-white";

    // Input Border
    const borderClass =
      border !== "none" &&
      (border === "normal" ? "border-[0.1rem]" : "border-[0.2rem]");
    const borderStyleClass =
      border !== "none" &&
      (borderStyle === "solid"
        ? "border-solid"
        : borderStyle === "dashed"
        ? "border-dashed"
        : "border-dotted");
    const borderColorClass =
      border !== "none" &&
      (borderColor === "main"
        ? "border-main"
        : borderColor === "grey"
        ? "border-grey"
        : "border-black");

    // Input Font
    const fontSizeClass = `fontSize-${fontSize}`;
    const colorClass = color === "white" ? "text-white" : "text-black";
    const textLocationClass =
      textLocation === "left"
        ? "text-left"
        : textLocation === "center"
        ? "text-center"
        : "text-right";

    // Input placeholder
    const placeholderColorClass =
      placeholderColor === "main" ? "placeholder-main" : "placeholder-grey";

    const InputBoxClass = cn(
      `
    flex 
    items-center
    ${heightClass} 
    ${widthClass}
    ${roundedClass} 
    ${bgColorClass} 
    ${borderClass} 
    ${borderStyleClass} 
    ${borderColorClass} 
    ${textLocationClass} 
    ${colorClass} 
    py-[0.8rem]
    px-[1.6rem]
    gap-[1.6rem]
  `
    );
    const InputClass = cn(
      ` 
    w-full 
    h-full 
    ${fontSizeClass} 
    ${textLocationClass} 
    ${colorClass} 
    bg-transparent 
    outline-none 
    focus:placeholder-transparent 
    ${placeholderColorClass}
  `,
      className
    );
    return (
      <div className={InputBoxClass}>
        {img && (
          <div>
            <Image src={img} width={24} height={24} alt="input iamge" />
          </div>
        )}
        <input
          className={InputClass}
          value={value || ""}
          onChange={onChange || undefined}
          placeholder={placeholder}
          name={name}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
