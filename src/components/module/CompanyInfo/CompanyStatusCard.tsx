import { BrandColor, FontSize } from "@/types";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompanyStatusCardProps {
  title: string;
  status: string;
  titleColor?: BrandColor;
  statusColor?: BrandColor;
  titleSize?: FontSize;
  route: string;
}
export const CompanyStatusCard = ({
  title,
  titleSize = "medium",
  status,
  titleColor = "main",
  statusColor = "red",
  route,
}: CompanyStatusCardProps) => {
  const router = useRouter();

  //title
  const titleSizeClass = `fontSize-${titleSize}`;
  const titleColorClass = `text-${titleColor}`;

  //status
  const statusColorClass = `text-${statusColor}`;

  return (
    <div className="shadow-medium flex h-[15rem] w-[21rem] flex-col justify-between rounded-lg bg-white p-[1.6rem]">
      <div className="flex justify-between">
        <h2 className={`${titleSizeClass} ${titleColorClass}`}>{title}</h2>
        <div className="h-[2.4rem] w-[2.4rem] bg-white">
          <button onClick={() => router.push(route)}>
            <ChevronRight color="#979797" />
            {/* <Image
              src="/icon/right-arrow.svg"
              width={24}
              height={24}
              alt="back-arrow"
            /> */}
          </button>
        </div>
      </div>
      <div className="font-nanum flex justify-end text-[7rem] font-[100]">
        <div className={statusColorClass}>{status}</div>
      </div>
    </div>
  );
};
