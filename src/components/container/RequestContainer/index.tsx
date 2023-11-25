"use client";
import { Tag } from "@/components/elements/Tag";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/hooks/api/usePatient";
import { useAuth } from "@/providers/AuthProvider";
import { useRequestStore } from "@/store/request.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function coordinateOnCircle(
  radius: number,
  angleDegrees: number
): [number, number] {
  // Convert angle from degrees to radians
  const angleRadians: number = angleDegrees * (Math.PI / 180);

  // Calculate the x and y coordinates
  const x: number = radius * Math.cos(angleRadians);
  const y: number = radius * Math.sin(angleRadians);

  return [x, y];
}

/**
 * TODO: RequestContainer
 * 요청값에대한 위도경도 값이 들어오면 해당위치에 점을 찍어주는 컴포넌트
 *
 * 공식 정의해야함
 * 각요청은 5분간격으로 10km씩 요청함
 *
 *
 * 11월 8일 생각
 * 각 요청의 평균 거리를 구해서 원의 반지름을 구함
 *
 *
 */
export const RequestContainer = () => {
  const { accessToken } = useAuth();
  const numberOfDots = 12;
  const radius = 8.2; // Half of 16.4rem
  const adjustedRadius = radius; // Adjust for dot size
  const { toast } = useToast();
  const router = useRouter();
  const { requests } = useRequestStore();
  const { patient } = usePatient();
  const requestOnClick = () => {
    if (!patient) {
      toast({ description: "환자 정보가 없습니다." });
      router.push("/patient/rapid-evaluation");
      return;
    }

    fetch("/api/requests/ems-to-er", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res: { is_success: boolean; message: string }) => {
        if (res.is_success) {
          toast({ description: "요청이 완료되었습니다." });
          return;
        }
        console.log(res.message);
        if (res.message === "REQUEST_ALREADY_PROCESSED") {
          toast({ description: "이미 요청을 진행중인 환자입니다." });
          return;
        }
        toast({ description: "요청에 실패하였습니다." });
      });
  };
  useEffect(() => {
    if (requests.length > 0) {
      router.push("/response");
    }
  }, [requests, router]);

  return (
    <>
      <div className=" h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <div className="relative flex h-full flex-col items-center gap-[2rem] px-[4.4rem]">
            <div className="fixed right-[2.4rem] z-50 flex flex-col gap-[0.8rem]">
              <div className="fontSize-regular -gap-[0.5rem] flex h-[5rem] w-[5rem] flex-col items-center justify-center rounded-lg border-[0.2rem] border-main text-center">
                <span className="h-[1.6rem]">요청</span>
                <span>10</span>
              </div>
              <div className="fontSize-regular -gap-[0.5rem] flex h-[5rem] w-[5rem] flex-col items-center justify-center rounded-lg border-[0.2rem] border-main text-center">
                <span className="h-[1.6rem]">요청</span>
                <span>10</span>
              </div>
              <div className="fontSize-regular -gap-[0.5rem] flex h-[5rem] w-[5rem] flex-col items-center justify-center rounded-lg border-[0.2rem] border-main text-center">
                <span className="h-[1.6rem]">요청</span>
                <span>10</span>
              </div>
              <div className="fontSize-regular -gap-[0.5rem] flex h-[5rem] w-[5rem] flex-col items-center justify-center rounded-lg border-[0.2rem] border-main text-center">
                <span className="h-[1.6rem]">요청</span>
                <span>10</span>
              </div>
              <div>
                <Tag
                  text="요청중"
                  className="w-[5rem]"
                  bgColor="main"
                  border="none"
                  color="white"
                />
                <Tag
                  text="6:11"
                  className="w-[5rem]"
                  bgColor="transparent"
                  color="grey"
                  border="none"
                />
              </div>
            </div>
            <div className="absolute top-[50%] z-[400] h-[12rem] w-[12rem] -translate-y-[50%] rounded-full bg-main">
              <button
                className=" h-full w-full text-center"
                onClick={requestOnClick}
              >
                요청
              </button>
            </div>
            <div className="absolute top-[50%]  h-[16.4rem] w-[16.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent">
              {Array.from({ length: numberOfDots }, (_, index) => {
                const angle = (360 / numberOfDots) * index;
                const [x, y] = coordinateOnCircle(adjustedRadius, angle);
                return (
                  <div
                    key={index}
                    style={{
                      top: `calc(50% + ${y}rem)`,
                      left: `calc(50% + ${x}rem)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="absolute z-[1] h-[1rem] w-[1rem] rounded-full bg-slate-300"
                  />
                );
              })}
            </div>
            <div className="absolute top-[50%] z-[1] h-[20.4rem] w-[20.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent" />
            <div className="absolute top-[50%] z-[1] h-[30.4rem] w-[30.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent" />
            <div className="absolute top-[50%] z-[1] h-[50.4rem] w-[50.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent" />
            <div className="absolute top-[50%] z-[1] h-[92.4rem] w-[92.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent" />
            <div className="absolute top-[50%] z-[1] h-[120.4rem] w-[120.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent" />
          </div>
          <ProgressTracker
            steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
            currentStep={4}
          />
        </div>
      </div>
    </>
  );
};
