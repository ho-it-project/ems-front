"use client";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useEmergencyCenterDetail } from "@/hooks/api/useEmergencyCenterDetail";
import { useRequestStore } from "@/store/request.store";
import { RequestInfo } from "@/types/model/request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TransferContainer = () => {
  const { requests } = useRequestStore();
  const [rendered, setRendered] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState<RequestInfo | null>(
    null
  );
  const { emergencyCenter } = useEmergencyCenterDetail(
    acceptedRequest?.emergency_center_id || ""
  );
  const router = useRouter();
  useEffect(() => {
    if (!requests) return;
    if (requests.length > 0) {
      setAcceptedRequest(requests[0]);
    }
    if (requests.length > 0) {
      setRendered(true);
    }
  }, [requests, router]);
  useEffect(() => {
    if (!acceptedRequest) return;
    if (acceptedRequest.request_status !== "ACCEPTED") {
      router.push("/response");
    }
  }, [router, acceptedRequest]);

  if (!rendered) return <></>;

  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <div className="flex h-full w-full flex-col items-center justify-center gap-[4rem] bg-black text-main">
            <div className="fontSize-large">요청이 수락되었습니다!</div>
            <div className="flex flex-col items-center gap-[2rem]">
              <div className="fontSize-regular">
                {emergencyCenter && emergencyCenter.emergency_center_address}
              </div>
              <div className="fontSize-regular">
                왼쪽 위 지도를 눌러서 위치를 확인해주세요!
              </div>
            </div>

            <div className="h-[12rem] w-[12rem] ">
              <button className="h-full w-full rounded-full bg-main text-white">
                이송하기
              </button>
            </div>
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
