import { BrandColor, FontSize } from "@/types";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;

  color?: BrandColor;
  fontSize?: FontSize;
  button?: React.ReactNode;
}

export const PageHeader = ({
  title,
  children,
  fontSize = "xlarge",
  color = "main",
  button,
}: PageHeaderProps) => {
  //text
  const fontSizeClass = `fontSize-${fontSize}`;
  const colorClass = `text-${color}`;
  const titleClass = `${colorClass} ${fontSizeClass} flex items-center gap-[0.4rem] h-fit`;

  return (
    <div className="flex w-full justify-between pb-[0.8rem] pt-[1.2rem]">
      <div className={titleClass}>
        {button}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
};
