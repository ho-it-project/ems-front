import { PageHeader } from "@/components/elements/PageHeader";
import { OpqrstEvaluationForm } from "@/components/module/Evaluation/OpqrstEvaluation/OpqrstEvaluationForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";

export const OpqrstEvaluationContainer = () => {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <PageHeader title="OPQRST">
            <div className="flex gap-[2rem]">
              <div className="h-full w-[5rem] bg-main" />
              <div className="h-full w-[5rem] bg-main" />
            </div>
          </PageHeader>

          <div className="flex h-full flex-col items-center gap-[2rem] px-[4.4rem]">
            <OpqrstEvaluationForm />
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
