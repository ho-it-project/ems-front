import { cn } from "@/lib/utils";

interface DepartmentSelectButtonProps {
  onClick?: () => void;
  isSelect?: boolean;
  department_name: string;
}
export const DepartmentSelectButton = ({
  onClick,
  isSelect,
  department_name,
}: DepartmentSelectButtonProps) => {
  return (
    <button
      className={cn(
        "fontSize-regular-l flex h-[4rem] w-[15rem] flex-col items-center justify-center rounded-[1.4rem] bg-white text-center",
        isSelect ? "bg-main text-white" : ""
      )}
      onClick={onClick}
      type="button"
    >
      <div>{department_name}</div>
    </button>
  );
};
