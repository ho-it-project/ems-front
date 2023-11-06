import { BrandColor, FontSize } from "@/type";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;

  color?: BrandColor;
  fontSize?: FontSize;
  button?: React.ReactNode;
  description?: string;
  descriptionColor?: BrandColor;
  descriptionFontSize?: FontSize;
}

export const PageHeader = ({
  title,
  children,
  fontSize = "xlarge",
  color = "main",
  button,
  description,
  descriptionColor = "lgrey",
  descriptionFontSize = "small",
}: PageHeaderProps) => {
  //text
  const fontSizeClass = `fontSize-${fontSize}`;
  const colorClass = `text-${color}`;
  const titleClass = `${colorClass} ${fontSizeClass} flex items-center gap-[0.4rem] h-fit gap-[1rem]`;
  const descriptionClass = `text-${descriptionColor} fontSize-${descriptionFontSize}`;
  return (
    <div className="flex w-full justify-between pb-[0.8rem] pt-[1.2rem]">
      <div className={titleClass}>
        {button}
        <span>{title}</span>
        {description && (
          <div className="h-full">
            <span className={descriptionClass}>{description}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
