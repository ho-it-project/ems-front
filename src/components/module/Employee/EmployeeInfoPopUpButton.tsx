"use clinet";
import { Input } from "@/components/elements/Input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { ModalWrapper } from "../common/ModalWrapper";

interface EmployeeInfoPopUpButtonProps {
  title: string;
  onSubmmit?: () => void;
  submitButtonName?: string;
  employee?: {
    name: string;
    role: string;
    id: string;
    password: string;
  };
  type?: "add" | "edit";
}

export const EmployeeInfoPopUpButton = ({
  title,
  onSubmmit,
  employee = {
    name: "",
    role: "",
    id: "",
    password: "",
  },
  submitButtonName = "추가하기",
  type = "add",
}: EmployeeInfoPopUpButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onClickAdd = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setOpen(false);
  };
  const [employeeInfo, setEmployeeInfo] = useState(employee);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeInfo({
      ...employeeInfo,
      [name]: value,
    });
    console.log(employeeInfo);
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
          <ModalWrapper
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
                        value={employeeInfo.name || ""}
                        name="name"
                        onChange={onChange}
                      />
                    </div>
                    <div className="flex items-start justify-end">
                      <button
                        className="fontSize-small rounded-lg bg-main px-[4rem] py-[1.2rem] text-white"
                        onClick={onSubmmit}
                      >
                        {submitButtonName}
                      </button>
                    </div>
                    <div className="mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                      <div className="fontSize-medium flex min-w-[8rem] flex-1 ">
                        역할
                      </div>
                      <Input
                        placeholder="역할로 바꿔야함"
                        value={employeeInfo.role || ""}
                        name="role"
                        onChange={onChange}
                      />
                    </div>
                    <div className="mt-[2rem] flex items-center justify-between  gap-[0.8rem]"></div>
                    <div className="col-span-2 mt-[2rem] flex items-center gap-[0.8rem]">
                      <div className="fontSize-medium flex  min-w-[8rem] ">
                        ID
                      </div>
                      <Input
                        placeholder="ID를 입력하세요"
                        value={employeeInfo.id || ""}
                        name="id"
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-span-2 mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                      <div className="fontSize-medium flex  min-w-[8rem] flex-1 ">
                        비밀번호
                      </div>
                      <Input
                        placeholder="비밀번호를 입력하세요"
                        value={employeeInfo.password || ""}
                        name="password"
                        onChange={onChange}
                      />
                    </div>
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
