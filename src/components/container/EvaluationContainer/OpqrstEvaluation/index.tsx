import { PageHeader } from "@/components/elements/PageHeader";
import { OpqrstEvaluationForm } from "@/components/module/Evaluation/OpqrstEvaluation/OpqrstEvaluationForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const OpqrstEvaluationContainer = () => {
  const FORM_ID = "opqrst-evaluation-form";
  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <PageHeader title="OPQRST" color="black">
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
          <div className="flex h-full flex-col items-center gap-[2rem] px-[4.4rem]">
            <OpqrstEvaluationForm formId={FORM_ID} />
          </div>
          <ProgressTracker
            steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
            currentStep={3}
          />
        </div>
      </div>
    </>
  );
};
