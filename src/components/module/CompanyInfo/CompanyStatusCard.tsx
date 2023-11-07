import { BrandColor, FontSize } from "@/types";

interface CompanyStatusCardProps {
  title: string;
  status: string;
  titleColor?: BrandColor;
  statusColor?: BrandColor;
  titleSize?: FontSize;
}
export const CompanyStatusCard = ({
  title,
  titleSize = "medium",
  status,
  titleColor = "main",
  statusColor = "red",
}: CompanyStatusCardProps) => {
  //title
  const titleSizeClass = `fontSize-${titleSize}`;
  const titleColorClass = `text-${titleColor}`;

  //status
  const statusColorClass = `text-${statusColor}`;

  return (
    <div className="shadow-medium flex h-[15rem] w-[21rem] flex-col justify-between rounded-lg bg-white p-[1.6rem]">
      <div className="flex justify-between">
        <h2 className={`${titleSizeClass} ${titleColorClass}`}>{title}</h2>
        <div className="h-[2.4rem] w-[2.4rem] bg-bg" />
      </div>
      <div className="font-nanum flex justify-end text-[7rem] font-[100]">
        <div className={statusColorClass}>{status}</div>
      </div>
    </div>
  );
};
