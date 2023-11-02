import { PageHeader } from "@/components/elements/PageHeader";
import { SliderDemo } from "@/components/elements/Slider";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";

export default function Home() {
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
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] flex-col justify-center">
                <span className="text-main">Onset</span>
                <span className="fontSize-small text-lgrey">
                  증상발현 시 한 행동
                </span>
              </div>
              <div className="h-full w-full rounded-lg bg-white"></div>
            </div>
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                <span className="text-main">Provoke</span>
                <span className="fontSize-small break-keep text-lgrey">
                  증상을 약화/완화 시키는 외부요인
                </span>
              </div>
              <div className="h-full w-full rounded-lg bg-white"></div>
            </div>
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                <span className="text-main">Quality</span>
                <span className="fontSize-small break-keep text-lgrey">
                  어떻게 아픈지?
                </span>
              </div>
              <div className="h-full w-full rounded-lg bg-white"></div>
            </div>
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                <span className="text-main">Radiation</span>
                <span className="fontSize-small break-keep text-lgrey">
                  아픈 부위가 어디인지?
                </span>
              </div>
              <div className="h-full w-full rounded-lg bg-white"></div>
            </div>
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                <span className="text-main">Severity</span>
                <span className="fontSize-small break-keep text-lgrey">
                  얼마나 아픈지?
                </span>
              </div>
              <SliderDemo />
            </div>
            <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
              <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                <span className="text-main">Time</span>
                <span className="fontSize-small break-keep text-lgrey">
                  시간에 따라 아픈 정도 (지속시간, 변화 등)
                </span>
              </div>
              <div className="h-full w-full rounded-lg bg-white"></div>
            </div>
          </div>
          <ProgressTracker
            steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
            currentStep={3}
          />
        </div>
      </div>
    </>
  );
}
