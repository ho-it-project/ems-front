import { Input } from "@/components/elements/Input";
import { PageHeader } from "@/components/elements/PageHeader";
import { useToast } from "@/components/ui/use-toast";
import { usePostApi } from "@/hooks/api";
import { EmployeeAdd, employeeRoles } from "@/types/model/employee";
import Joi from "joi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { EmployeeInfoPopUpButton } from "./EmployeeInfoPopUpButton";
const searchTypes = ["이름", "ID"] as const;

export const EmployeePageHeader = ({
  onSearch,
  refetch,
}: {
  onSearch: (
    searchType: (typeof searchTypes)[number],
    value: string
  ) => () => void;
  refetch: () => unknown;
}) => {
  const [searchType, setSearchType] =
    useState<(typeof searchTypes)[number]>("ID");

  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const { mutate: mutateOnAdd } = usePostApi("/ems/employees", {
    useLoader: true,
  });
  const { toast } = useToast();

  const schema = useMemo(() => {
    return Joi.object({
      id_card: Joi.string().min(1),
      password: Joi.string().min(1),
      employee_name: Joi.string().min(1),
      role: Joi.string().valid(...employeeRoles),
    });
  }, []);

  const onSubmit = async (employeeInfo: EmployeeAdd) => {
    const { error } = schema.validate(employeeInfo);
    if (error) {
      // console.error(error);
      toast({ description: error.message });
      return false;
    } else {
      await mutateOnAdd({ body: { employees: [employeeInfo] } });
      refetch();
      return true;
    }
  };

  return (
    <PageHeader
      title="회사 정보"
      fontSize="small-l"
      color="grey"
      button={
        <button
          className="h-fit rounded-full text-[0.8rem] text-white"
          onClick={() => router.push("/")}
        >
          <Image
            src="/icon/back-arrow.svg"
            width={24}
            height={24}
            alt="back-arrow"
          />
        </button>
      }
    >
      <div className="flex gap-[1rem]">
        <div className="fontSize-small rounded-lg border-[0.2rem] border-main px-[1.2rem] text-main">
          <div className="flex items-center gap-[0.6rem]">
            {/* 검색 */}
            <select
              name="role"
              onChange={(e) =>
                setSearchType(
                  e.currentTarget.value as (typeof searchTypes)[number]
                )
              }
              value={searchType}
              className="bg-white  text-center text-main"
            >
              {searchTypes.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <div className="h-6 self-center border-r-2 border-gray-300" />
            <Input
              // placeholder="ID를 입력하세요"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              border="none"
              width="w-[80%]"
            />
            <button onClick={onSearch(searchType, value)}>
              <Image
                src="/icon/icon-search.png"
                width={24}
                height={24}
                alt="search"
              />
            </button>
          </div>
        </div>
        <EmployeeInfoPopUpButton
          title="직원 추가하기"
          submitButtonName="추가하기"
          type="add"
          onSubmit={onSubmit}
        />
      </div>
    </PageHeader>
  );
};
