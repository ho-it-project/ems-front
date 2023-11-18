"use clinet";
import { Input } from "@/components/elements/Input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EmployeeRole } from "@/types/model/employee";
import Image from "next/image";
import React, { useState } from "react";
import { TabModalWrapper } from "../common/TabModalWrapper";

interface EmployeeInfoPopUpButtonProps {
  title: string;
  onSubmmit?: () => void;
  submitButtonName?: string;
  employee?: {
    employee_name: string;
    role: string;
    id_card: string;
  };
  type?: "add" | "edit";
}

export const EmployeeInfoPopUpButton = ({
  title,
  employee = {
    employee_name: "",
    role: "",
    id_card: "",
  },
  submitButtonName = "수정하기",
  type = "add",
}: EmployeeInfoPopUpButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onClickAdd = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setEmployeeInfo(employee);
    setOpen(false);
  };
  const [employeeInfo, setEmployeeInfo] = useState(employee);

  const roles: Array<EmployeeRole> = [
    "ADMIN",
    "DISPATCHER",
    "DRIVER",
    "EMERGENCY_MEDICAL_TECHNICIAN",
  ];

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setEmployeeInfo({
      ...employeeInfo,
      [name]: value,
    });
    console.log(employeeInfo);
  };

  const onSubmit = () => {};

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
                        onClick={onSubmit}
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
                        {roles.map((item) => (
                          <option value={item} key={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      {/* <Input
                        placeholder="역할로 바꿔야함"
                        value={employeeInfo.role || ""}
                        name="role"
                        onChange={onChange}
                      /> */}
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
                    {/* <div className="col-span-2 mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                      <div className="fontSize-medium flex  min-w-[8rem] flex-1 ">
                        비밀번호
                      </div>
                      <Input
                        placeholder="비밀번호를 입력하세요"
                        value={employeeInfo.password || ""}
                        name="password"
                        onChange={onChange}
                      />
                    </div> */}
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
