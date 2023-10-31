import { PageHeader } from "@/components/elements/PageHeader";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";

export default function Home() {
  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full flex-col rounded-lg">
          <PageHeader
            title={"환자 정보 입력"}
            fontSize="xlarge-l"
            color="black"
          />
          <div className=" h-full">
            <div className="m-auto w-[50rem] rounded-lg bg-white p-[3rem]">
              <PageHeader
                title={"광진소방서"}
                fontSize="medium"
                color="black"
              />
            </div>
          </div>
          <ProgressTracker
            steps={[
              "증상 확인",
              "증상 기록",
              "증상 기록",
              "증상 기록",
              "증상 기록",
            ]}
            currentStep={4}
            progressColor="main"
            defaultColor="lgrey"
          />
        </div>
      </div>
    </>
  );
}