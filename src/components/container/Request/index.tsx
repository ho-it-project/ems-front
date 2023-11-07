import { ProgressTracker } from "@/components/module/common/ProgressTracker";
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
  const numberOfDots = 12;
  const radius = 8.2; // Half of 16.4rem

  const adjustedRadius = radius; // Adjust for dot size
  return (
    <>
      <div className=" h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <div className=" relative flex h-full flex-col items-center gap-[2rem] px-[4.4rem]">
            <div className="absolute top-[50%] z-[1] h-[12rem] w-[12rem] -translate-y-[50%] rounded-full bg-main"></div>
            <div className="absolute top-[50%] z-[1] h-[16.4rem] w-[16.4rem] -translate-y-[50%] rounded-full  border-[0.2rem] bg-transparent">
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
