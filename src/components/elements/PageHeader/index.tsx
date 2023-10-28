import { BrandColor, FontSize } from "@/type";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;

  color?: BrandColor;
  fontSize?: FontSize;
}

export const PageHeader = ({
  title,
  children,
  fontSize = "xlarge",
  color = "main",
}: PageHeaderProps) => {
  //text
  const fontSizeClass = `fontSize-${fontSize}`;
  const colorClass = `text-${color}`;
  const titleClass = `${colorClass} ${fontSizeClass}`;

  return (
    <div className="flex w-full justify-between pb-[0.8rem] pt-[1.2rem]">
      <div className={titleClass}>{title}</div>
      {children}
    </div>
  );
};
