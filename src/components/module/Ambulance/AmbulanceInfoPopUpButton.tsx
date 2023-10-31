"use clinet";
import { Input } from "@/components/elements/Input";
import { Toggle } from "@/components/elements/Toggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { TabModalWrapper } from "../common/TabModalWrapper";

interface AmbulanceInfoPopUpButtonProps {
  title: string;
  onSubmmit?: () => void;
  submitButtonName?: string;
  Ambulance?: {
    name: string;
    role: string;
    id: string;
    password: string;
  };
  type?: "add" | "edit";
}

export const AmbulanceInfoPopUpButton = ({
  title,
  onSubmmit,
  Ambulance = {
    name: "",
    role: "",
    id: "",
    password: "",
  },
  submitButtonName = "추가하기",
  type = "add",
}: AmbulanceInfoPopUpButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onClickAdd = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setOpen(false);
  };
  const [AmbulanceInfo, setAmbulanceInfo] = useState(Ambulance);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAmbulanceInfo({
      ...AmbulanceInfo,
      [name]: value,
    });
    console.log(AmbulanceInfo);
  };
  const trigger =
    type === "add" ? (
      <DialogTrigger
        className="fontSize-small rounded-lg bg-main px-[1.2rem] py-[0.8rem] text-white"
        onClick={onClickAdd}
      >
        <div className="flex items-center gap-[0.6rem]">
          차량 추가하기
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
                <div className="flex w-full justify-between">
                  <div className="col-span-3">
                    <div className="mt-[2rem] flex items-center justify-between gap-[0.8rem]">
                      <div className="fontSize-medium h-full min-w-[8rem] flex-1">
                        차량번호
                      </div>
                      <Input
                        placeholder="차량번호"
                        value={AmbulanceInfo.name || ""}
                        name="name"
                        onChange={onChange}
                      />
                    </div>

                    <div className="mt-[2rem] flex items-center justify-between  gap-[0.8rem]">
                      <div className="fontSize-medium flex min-w-[8rem] flex-1 ">
                        차종
                      </div>
                      <Input
                        placeholder="차종"
                        value={AmbulanceInfo.role || ""}
                        name="role"
                        onChange={onChange}
                      />
                    </div>
                    <div className="col-span-2 mt-[2rem] flex items-center gap-[0.8rem]">
                      <div className="fontSize-medium flex  min-w-[8rem] ">
                        유형
                      </div>
                      <Toggle
                        size="large"
                        checkedColor="main"
                        noneCheckedColor="main"
                        textOnButton={true}
                        texts={["일반", "특수"]}
                        fontSize="medium"
                        checked={true}
                        bgColor="white"
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="fontSize-small rounded-lg bg-main px-[4rem] py-[1.2rem] text-white"
                      onClick={onSubmmit}
                    >
                      {submitButtonName}
                    </button>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
