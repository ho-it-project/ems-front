import { BrandColor } from "@/type";

interface ButtonProps {
  text: string;
  color?: BrandColor;
  border?: "normal" | "large" | "none";
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: BrandColor;

  


  onClick?: () => void;
  rounded?: "none" | "small" | "medium" | "large";
}

export const Button = ({ text, color = "main" }: ButtonProps) => {
  return (
    <button className={`bg-${color} rounded-[2rem]`}>
      <div>{text}</div>
    </button>
  );
};
