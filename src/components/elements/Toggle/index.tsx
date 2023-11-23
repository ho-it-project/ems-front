"use client";

import { BrandColor, FontSize } from "@/types";

interface ToggleProps {
  id?: string;
  size?: "small" | "medium" | "large";
  toggleText?: string;
  checkedColor?: BrandColor;
  noneCheckedColor?: BrandColor;
  texts?: [string, string]; // [left, right]
  textOnButton?: boolean;
  textOnButtonColor?: BrandColor;
  textColor?: BrandColor;
  fontSize?: FontSize;
  checked: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor?: BrandColor;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export const Toggle = ({
  id,
  size = "medium",
  checkedColor = "main",
  noneCheckedColor = "lgrey",
  texts,
  textOnButton = false,
  textOnButtonColor = "white",
  textColor = "lgrey",
  fontSize = "small",
  checked,
  onChange,
  bgColor = "bg",
}: ToggleProps) => {
  //common
  const sizeClass =
    size === "small"
      ? `w-[4.4rem] h-[2.4rem]`
      : size === "medium"
      ? `w-[6rem] h-[3rem]`
      : `w-[28rem] h-[4rem]`;

  const toggleButtonSizeClass =
    size === "small"
      ? `w-[1.8rem] h-[1.8rem]`
      : size === "medium"
      ? `w-[2.4rem] h-[2.4rem]`
      : `w-[13.3rem] h-[4rem]`;

  const translateClass =
    size === "small"
      ? `translate-x-[2rem] transform`
      : size === "medium"
      ? `translate-x-[3rem] transform`
      : `translate-x-[14.7rem] transform`;

  const noneChecketBackgroundClass = `
    border border-${noneCheckedColor}
  `;
  const checkedBackgroundClass = `
    border border-${checkedColor}
  `;

  const checkedStyle = `
    bg-${checkedColor}
    ${translateClass}
  `;
  const noneCheckedStyle = `
    bg-${noneCheckedColor}
  `;

  // style Class
  const wraperClass = `
    flex items-center justify-center
    ${sizeClass}
  `;

  const backgroundClass = `
    flex items-center 
    justify-between
    text-black
    rounded-full
    transition-all duration-300
    cursor-pointer
    ${size === "large" ? "" : "px-[0.2rem]"}
    ${bgColor ? `bg-${bgColor}` : ""}
    ${sizeClass}
    ${checked ? checkedBackgroundClass : noneChecketBackgroundClass}
  `;

  const toggleButtonClass = `
  absolute
  rounded-full
  transition-all 
  z-10
  ${toggleButtonSizeClass}
  ${checked ? checkedStyle : noneCheckedStyle}
`;
  const textClass = `
    ${textOnButton ? "z-20" : ""}
    flex items-center justify-center
    ${toggleButtonSizeClass}
    ${fontSize ? `fontSize-${fontSize}` : ""}
  `;

  const leftTextClass = `
    ${textClass}
    ${checked ? `text-${textColor}` : `text-${textOnButtonColor}`}
  `;

  const rightTextClass = `
    ${textClass}
    ${checked ? `text-${textOnButtonColor}` : `text-${textColor}`}
  `;

  return (
    <div className={wraperClass}>
      <input
        type="checkbox"
        id={id}
        className="hidden"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className={`${backgroundClass}`}>
        <div className={toggleButtonClass}></div>
        {texts && <div className={leftTextClass}>{texts[0]}</div>}
        {texts && <div className={rightTextClass}>{texts[1]}</div>}
      </label>
    </div>
  );
};
