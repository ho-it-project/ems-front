import { cn } from "@/lib/utils";
import { BrandColor, FontSize } from "@/types";

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;

  color?: BrandColor;
  fontSize?: FontSize;
  button?: React.ReactNode;
  description?: string;
  descriptionColor?: BrandColor;
  descriptionFontSize?: FontSize;
  wrapperClassName?: string;
  LeftSectionClassName?: string;
  descriptionWrapperClassName?: string;
  descriptionClassName?: string;
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
  wrapperClassName,
  LeftSectionClassName,
  descriptionWrapperClassName,
  descriptionClassName,
}: PageHeaderProps) => {
  //text
  const fontSizeClass = `fontSize-${fontSize}`;
  const colorClass = `text-${color}`;
  const titleClass = `${colorClass} ${fontSizeClass} flex items-center gap-[0.4rem] h-fit gap-[1rem]`;
  const descriptionClass = `text-${descriptionColor} fontSize-${descriptionFontSize}`;
  return (
    <div
      className={
        (cn("flex w-full justify-between pb-[0.8rem] pt-[1.2rem]"),
        wrapperClassName)
      }
    >
      <div className={cn(titleClass, LeftSectionClassName)}>
        {button}
        <span>{title}</span>
        {description && (
          <div className={cn("h-full", descriptionWrapperClassName)}>
            <span className={cn(descriptionClass, descriptionClassName)}>
              {description}
            </span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
