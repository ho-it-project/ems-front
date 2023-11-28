import { BrandColor, FontSize } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface CompanyStatusCardProps {
  title: string;
  status: string;
  titleColor?: BrandColor;
  statusColor?: BrandColor;
  titleSize?: FontSize;
  link?: string;
}
export const CompanyStatusCard = ({
  title,
  titleSize = "medium",
  status,
  titleColor = "main",
  statusColor = "red",
  link,
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
        <Link href={link || "/"}>
          <ChevronRightIcon size={24} className="text-lgrey" />
        </Link>
      </div>
      <div className="font-nanum flex justify-end text-[7rem] font-[100]">
        <div className={statusColorClass}>{status}</div>
      </div>
    </div>
  );
};
