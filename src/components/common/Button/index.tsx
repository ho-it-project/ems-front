import { ButtonColor } from "@/type";

interface ButtonProps {
  text: string;
  color?: ButtonColor;
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
