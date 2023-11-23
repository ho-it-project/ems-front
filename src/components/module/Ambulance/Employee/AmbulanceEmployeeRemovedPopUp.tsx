import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Response } from "@/types/api";
import { X } from "lucide-react";
import React, { useEffect } from "react";

interface EmployeeDeletedPopUp {
  data: Response<"/ems/ambulances/{ambulance_id}", "post"> | undefined;
  onClose: () => void;
}

export const AmbulanceEmployeeRemovedPopUp = ({
  data,
  onClose,
}: EmployeeDeletedPopUp) => {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(data ? true : false);
  }, [data]);

  const onClickClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[61.6rem] border-none bg-transparent shadow-none data-[state=open]:w-[80rem]">
        <div className="fontSize-regular flex w-[58.6rem] justify-center text-main">
          <div className="flex h-[20.6rem] w-[41.2rem] flex-col gap-[1.8rem] rounded-lg bg-bg px-[2.4rem] py-[2rem]">
            <div className="flex justify-end text-main">
              <button onClick={onClickClose} className="h-[3rem] w-[3rem]">
                <X width={15} height={15} />
              </button>
            </div>
            {data?.data && (
              <>
                <div className="flex justify-center">
                  <p>해제 완료</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="rounded-lg bg-main px-[9.5rem] py-[0.9rem] text-white"
                    onClick={onClickClose}
                  >
                    확인
                  </button>
                </div>
              </>
            )}
            {data?.error && (
              <>
                <div className="flex justify-center">
                  <p>해제 실패</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="rounded-lg bg-main px-[9.5rem] py-[0.9rem] text-white"
                    onClick={onClickClose}
                  >
                    {data.error.message}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
