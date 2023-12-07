"use clinet";
import { Input } from "@/components/elements/Input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Employee, EmployeeAdd, employeeRoles } from "@/types/model/employee";
import Image from "next/image";
import { useState } from "react";
import { TabModalWrapper } from "../common/TabModalWrapper";

type EmployeeEdit = Pick<
  Employee,
  "employee_id" | "id_card" | "employee_name" | "role"
>;

type Foo = { add: EmployeeAdd; edit: EmployeeEdit };
function getDefaultEmployee<T extends "add" | "edit">(
  type: T,
  _employee: undefined | (T extends "edit" ? EmployeeEdit : undefined)
): Foo[T] {
  const emadd = {
    employee_name: "",
    id_card: "",
    role: "ADMIN" as const,
    password: "",
  };

  const addd = {
    employee_id: _employee?.employee_id ?? "",
    employee_name: _employee?.employee_name ?? "",
    id_card: _employee?.id_card ?? "",
    role: _employee?.role ?? "ADMIN",
  };
  const res: Foo[T] = { add: emadd, edit: addd }[type];
  return res;
}

interface EmployeeInfoPopUpButtonProps<T extends "add" | "edit"> {
  title: string;
  /**
   * onSubmit
   * @param props Employee Data
   * @returns Promise<whether to close PopUp>
   */
  onSubmit: (props: Foo[T]) => Promise<boolean>;
  submitButtonName: string;
  employee?: T extends "edit" ? EmployeeEdit : undefined;
  type: T;
}

export const EmployeeInfoPopUpButton = <T extends "add" | "edit">({
  title,
  onSubmit,
  employee: _employee,
  submitButtonName,
  type,
}: EmployeeInfoPopUpButtonProps<T>) => {
  const employee: Foo[T] = getDefaultEmployee(type, _employee);

  const [open, setOpen] = useState(false);
  const onClickAdd = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setEmployeeInfo(
      type === "edit"
        ? getDefaultEmployee(type, _employee)
        : getDefaultEmployee(type, undefined)
    );
    setOpen(false);
  };
  const [employeeInfo, setEmployeeInfo] = useState<Foo[T]>(employee);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeInfo({
      ...employeeInfo,
      [name]: value,
    });
  };

  const trigger =
    type === "add" ? (
      <DialogTrigger
        className="fontSize-small rounded-lg bg-main px-[1.2rem] py-[0.8rem] text-white"
        onClick={onClickAdd}
      >
        <div className="flex items-center gap-[0.6rem]">
          직원 추가하기
          <Image
            src="/icon/icon-search.png"
            width={24}
            height={24}
            alt="search"
          />
        </div>
      </DialogTrigger>
    ) : (
      <DialogTrigger
        className="fontSize-small h-[2.4rem] w-[4.4rem] items-center rounded-lg bg-bg text-white "
        onClick={onClickAdd}
      >
        <div className="flex items-center justify-center gap-[0.6rem] text-lgrey">
          수정
        </div>
      </DialogTrigger>
    );

  return (
    <Dialog open={open}>
      {trigger}
      <DialogContent className="max-w-[61.6rem] border-none bg-transparent shadow-none data-[state=open]:w-[80rem]">
        <div className="w-[58.6rem]">
          <TabModalWrapper
            bgColor="bg"
            onClickClose={onClickClose}
            content={{
              title,
              content: (
                <>
                  <div className="grid grid-cols-2">
                    <div className="mt-[2rem] flex items-center justify-between gap-[0.8rem]">
                      <div className="fontSize-medium h-full min-w-[8rem] flex-1">
                        이름
                      </div>
                      <Input
                        placeholder="이름"
                        value={employeeInfo.employee_name || ""}
                        name="employee_name"
                        onChange={onChange}
                      />
                    </div>
                    <div className="flex items-start justify-end">
                      <button
                        className="fontSize-small rounded-lg bg-main px-[4rem] py-[1.2rem] text-white"
                        onClick={async () => {
                          if (await onSubmit(employeeInfo)) onClickClose();
                        }}
                      >
                        {submitButtonName}
                      </button>
                    </div>
                    <div className="mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                      <div className="fontSize-medium flex min-w-[8rem] flex-1 ">
                        역할
                      </div>
                      <select
                        name="role"
                        onChange={onChange}
                        value={employeeInfo.role}
                        className="fontSize-medium gap-[1.6rem] rounded-[0.8rem] border border-main bg-white px-[1.6rem] py-[0.8rem] text-center text-black"
                      >
                        {employeeRoles.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* <div className="mt-[2rem] flex items-center justify-between  gap-[0.8rem]"></div> */}
                    <div className="col-span-2 mt-[2rem] flex items-center gap-[0.8rem]">
                      <div className="fontSize-medium flex  min-w-[8rem] ">
                        ID
                      </div>
                      <Input
                        placeholder="ID를 입력하세요"
                        value={employeeInfo.id_card || ""}
                        name="id_card"
                        onChange={onChange}
                      />
                    </div>
                    {type === "add" && (
                      <div className="col-span-2 mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                        <div className="fontSize-medium flex  min-w-[8rem] flex-1 ">
                          비밀번호
                        </div>
                        <Input
                          placeholder="비밀번호를 입력하세요"
                          value={(employeeInfo as EmployeeAdd).password || ""}
                          name="password"
                          onChange={onChange}
                        />
                      </div>
                    )}
                  </div>
                </>
              ),
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
