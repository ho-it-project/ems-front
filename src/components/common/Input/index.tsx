import { FontSize } from "@/type";
import Image from "next/image";

interface InputProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rounded?: "nomal" | "large";
  fontSize?: FontSize;
  name?: string;
  bgColor?: "transparent" | "bg" | "white";
  color?: "white" | "black";
  width?: string;
  height?: "nomal" | "large";
  border?: "nomal" | "large" | "none";
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: "black" | "gray" | "main";
  textLocation?: "left" | "center" | "right";
  img?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  rounded = "nomal",
  fontSize = "medium",
  name,
  bgColor = "white",
  color = "black",
  width,
  height = "nomal",
  border = "nomal",
  borderStyle = "solid",
  borderColor = "main",
  textLocation = "center",
  img,
}: InputProps) => {
  // Input Size
  const heightClass = height === "nomal" ? "h-[4rem]" : "h-[6rem]";
  const widthClass = width === "nomal" ? "w-[20rem]" : "w-[30rem]";

  // Style
  const roundedClass =
    rounded === "nomal" ? "rounded-[0.8rem]" : "rounded-[3rem]";
  const bgColorClass =
    bgColor === "transparent"
      ? "bg-transparent"
      : bgColor === "bg"
      ? "bg-bg"
      : "bg-white";

  // Input Border
  const borderClass =
    border === "nomal" ? "border-[0.1rem]" : "border-[0.2rem]";
  const borderStyleClass =
    borderStyle === "solid"
      ? "border-solid"
      : borderStyle === "dashed"
      ? "border-dashed"
      : "border-dotted";
  const borderColorClass =
    borderColor === "main"
      ? "border-main"
      : borderColor === "gray"
      ? "border-gray"
      : "border-black";

  // Input Font
  const fontSizeClass = `fontSize-${fontSize}`;
  const colorClass = color === "white" ? "text-white" : "text-black";
  const textLocationClass =
    textLocation === "left"
      ? "text-left"
      : textLocation === "center"
      ? "text-center"
      : "text-right";

  const InputBoxClass = `
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
  `;
  const InputClass = ` 
    w-full 
    h-full    
    ${fontSizeClass}
    ${textLocationClass} 
    ${colorClass}
    bg-transparent 
    outline-none
    placeholder-gray
    focus:placeholder-transparent
  `;

  return (
    <div className={InputBoxClass}>
      {img && (
        <div>
          <Image src={img} width={24} height={24} alt="input iamge" />
        </div>
      )}
      <input
        className={InputClass}
        value={value || undefined}
        onChange={onChange || undefined}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};
