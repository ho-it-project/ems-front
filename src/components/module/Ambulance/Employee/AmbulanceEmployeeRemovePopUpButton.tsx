import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import React from "react";

interface EmployeeDeletePopUpButtonProps {
  onSubmit?: () => void;
  employee?: {
    name: string;
    role: string;
    id: string;
    password: string;
  };
}

export const AmbulanceEmployeeRemovePopUpButton = ({
  onSubmit,
}: EmployeeDeletePopUpButtonProps) => {
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
        className="fontSize-small rounded-full text-grey"
        onClick={onClickTrigger}
      >
        <div className="flex h-[2.4rem] w-[2.4rem] items-center justify-center">
          <X width={12} height={12} />
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
              <p>직원 등록을 해제하겠습니까?</p>
            </div>
            <div className="flex justify-center">
              <button
                className="rounded-lg bg-main px-[9.5rem] py-[0.9rem] text-white"
                onClick={() => {
                  onSubmit?.();
                  onClickClose();
                }}
              >
                해제
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
