"use clinet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import React from "react";

interface AmbulanceDeletePopUpButtonProps {
  onSubmmit?: () => void;
  Ambulance?: {
    id: string;
    car_num: "78구1500";
    car_type: "스톼뤡수";
    type: "일반" | "응급";
    driver: string;
    team: string[];
  };
}

export const AmbulanceDeletePopUpButton = ({
  onSubmmit,
}: AmbulanceDeletePopUpButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const onClickTrigger = () => {
    setOpen(true);
  };
  const onClickClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="fontSize-small rounded-full bg-bg  text-lgrey"
        onClick={onClickTrigger}
      >
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <Plus size={15} hanging={15} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[61.6rem] border-none bg-transparent shadow-none data-[state=open]:w-[80rem]">
        <div className="fontSize-regular flex w-[58.6rem] justify-center text-main">
          <div className="flex h-[20.6rem] w-[41.2rem] flex-col gap-[1.8rem] rounded-lg bg-bg px-[2.4rem] py-[2rem]">
            <div className="flex justify-end text-main">
              <button onClick={onClickClose} className="h-[3rem] w-[3rem]">
                <X width={15} height={15} />
              </button>
            </div>
            <div className="flex justify-center">
              <p>팀원을 삭제하시겠습니까?</p>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-lg bg-main px-[9.5rem] py-[0.9rem] text-white"
                onClick={onSubmmit}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
