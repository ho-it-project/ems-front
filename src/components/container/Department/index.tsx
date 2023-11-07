import { PageHeader } from "@/components/elements/PageHeader";
import { DepartmentForm } from "@/components/module/Department/DepartmentForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const DepartmentContainer = () => {
  const FORM_ID = "department-form";

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-[3rem]">
        <PageHeader title="진료과선택">
          <div className="flex gap-[2rem]">
            <button className=" h-full w-[5rem] rounded-[1rem] bg-lgrey ">
              <div className="fontSize-regular flex items-center justify-between px-[1.4rem]  py-[1rem] text-white">
                <ArrowLeft width={24} />
              </div>
            </button>
            <button
              className=" h-full w-[12.7rem] rounded-[1rem] bg-main "
              form={FORM_ID}
              type="submit"
            >
              <div className="fontSize-regular flex items-center justify-between px-[1.4rem]  py-[1rem] text-white">
                <span>다 음</span>
                <ArrowRight width={24} />
              </div>
            </button>
          </div>
        </PageHeader>
        <div className="flex h-full w-full">
          <DepartmentForm formId={FORM_ID} />
        </div>
        <ProgressTracker
          steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
          currentStep={1}
        />
      </div>
    </div>
  );
};
