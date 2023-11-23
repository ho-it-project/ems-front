import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const NotFoundPopUpContainer = () => {
  const [open, setOpen] = useState<boolean>(true);
  const router = useRouter();
  const onClickClose = () => {
    setOpen(false);
    router.back();
  };
  return (
    <div className="fixed left-0 right-0 top-1/2 flex h-screen w-screen -translate-y-1/2 items-center justify-center">
      <Dialog open={open}>
        <DialogContent className="max-w-[61.6rem] border-none bg-transparent shadow-none data-[state=open]:w-[80rem]">
          <div className="fontSize-regular flex w-[58.6rem] justify-center text-main">
            <div className="flex h-[20.6rem] w-[41.2rem] flex-col gap-[1.8rem] rounded-lg bg-[#ddf3eed9] px-[2.4rem] py-[2rem]">
              <div className="flex justify-end text-main">
                <button onClick={onClickClose} className="h-[3rem] w-[3rem]">
                  <X width={15} height={15} />
                </button>
              </div>
              <div className="flex justify-center">
                구급차 ID가 존재하지 않습니다.
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-lg bg-main px-[9.5rem] py-[0.9rem] text-white"
                  onClick={onClickClose}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
