import { BrandColor, FontSize } from "@/types";

interface TagProps {
  text: string;
  color?: BrandColor;
  rounded?: "normal" | "large";
  width?: string;
  height?: string;
  fontSize?: FontSize;
  border?: "normal" | "large" | "none";
  borderStyle?: "solid" | "dashed" | "dotted";
  borderColor?: BrandColor;
  bgColor?: BrandColor;
}

/**
 * 상태 또는 정보를 나타내는 태그 컴포넌트
 *
 * 상태 예시
 * - 초대중
 * - 초대완료
 * - 진행중
 * - 완료
 *
 * 정보예시
 * - 사람 이름
 *   - 한세종
 *   - 김철수
 *   - 박영희
 *
 * 해당 컴포넌트는 버튼기능을 하면 안됨
 */

export const Tag = ({
  text,
  color = "main",
  rounded = "large",
  width = "w-[6rem]",
  height,
  fontSize = "small-l",
  border = "normal",
  borderStyle = "solid",
  borderColor = "main",
  bgColor = "white",
}: TagProps) => {
  // Tag Size
  const heightClass = height ? height : "h-[2.4rem]";
  const widthClass = width ? width : "w-full";

  // Tag Style
  const roundedClass =
    rounded === "normal" ? "rounded-[0.8rem]" : "rounded-[3rem]";
  const bgColorClass = `bg-${bgColor}`;
  const colorClass = `text-${color}`;

  // Tag Border
  const borderClass =
    border === "normal"
      ? "border-[0.1rem]"
      : border === "large"
      ? "border-[0.2rem]"
      : "";
  const borderStyleClass =
    borderStyle === "solid"
      ? "border-solid"
      : borderStyle === "dashed"
      ? "border-dashed"
      : borderStyle === "dotted"
      ? "border-dotted"
      : "";
  const borderColorClass = `border-${borderColor}`;

  // Tag Font
  const fontSizeClass = `fontSize-${fontSize}`;

  const tagClass = `
    inline-block
    flex
    items-center
    justify-center
    ${bgColorClass}
    ${heightClass}
    ${widthClass}
    ${roundedClass}
    ${borderClass}
    ${borderStyleClass}
    ${borderColorClass}
    ${fontSizeClass}
    ${colorClass}
  `;

  return <div className={tagClass}>{text}</div>;
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
