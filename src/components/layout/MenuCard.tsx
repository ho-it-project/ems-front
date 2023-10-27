interface MenuCardProps {
  children: React.ReactNode;
  size?: "x-small" | "small" | "medium" | "large";
  shadow?: "large" | "medium";
}

export const MenuCard = ({
  size = "medium",
  children,
  shadow = "medium",
}: MenuCardProps) => {
  const heightClass =
    size === "large"
      ? "h-[17rem]"
      : size === "medium"
      ? "h-[8rem]"
      : size === "small"
      ? "h-[6.8rem]"
      : "h-[5.4rem]";

  const widthClass = `w-full`;

  const roundedClass = `
    rounded-[1.4rem]
  `;
  const shadowClass =
    shadow === "medium"
      ? "shadow-medium"
      : shadow === "large"
      ? "shadow-large"
      : "";

  const cardClass = `
    flex items-center justify-center
    bg-white
    ${heightClass}
    ${widthClass}
    ${roundedClass}
    ${shadowClass}
  `;
  return <div className={cardClass}>{children}</div>;
};
