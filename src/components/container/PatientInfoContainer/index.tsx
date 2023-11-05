import { PageHeader } from "@/components/elements/PageHeader";
import { PatientInfoForm } from "@/components/module/PatientInfo/PatientInfoForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";

export const PatientInfoContainer = () => {
  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col gap-[6rem] rounded-lg">
        <PageHeader
          title={"환자 정보 입력"}
          fontSize="xlarge-l"
          color="black"
        />
        <div className="h-full">
          <div className="m-auto w-[50rem] rounded-lg bg-white p-[3rem] pb-[4rem]">
            <PatientInfoForm />
          </div>
        </div>

        <ProgressTracker
          steps={["증상 확인1", "증상 기록2", "증상 3", "증상 4", "증상 5"]}
          currentStep={0}
        />
      </div>
    </div>
  );
};
