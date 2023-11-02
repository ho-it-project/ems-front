import { PageHeader } from "@/components/elements/PageHeader";
import { RepidEvaluationForm } from "@/components/module/RepidEvaluation/RepidEvaluationForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";

export const RepidEvalutationContainer = () => {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <PageHeader title="신속 평가">
            <div className="flex gap-[2rem]">
              <div className="w-5rem h-full bg-main" />
              <div className="w-5rem h-full bg-main" />
            </div>
          </PageHeader>
          <div className="h-full">
            <RepidEvaluationForm />
          </div>
          <ProgressTracker
            steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
            currentStep={1}
          />
        </div>
      </div>
    </>
  );
};
