"use client";
import Spinner from "@/components/Spinner";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useEmergencyCenterDetail } from "@/hooks/api/useEmergencyCenterDetail";
import { useRequest } from "@/hooks/api/useRequest";
import { RequestInfo } from "@/types/model/request";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const HandoverContainer = () => {
  const { requests } = useRequest();
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
    const { request_status } = acceptedRequest;
    if (request_status === "TRANSFER_COMPLETED") return;
    if (request_status === "COMPLETED") {
      router.push(`/`);
      return;
    }
    if (request_status === "ACCEPTED") {
      router.push("/patient/transfer");
      return;
    }

    router.push("/response");
  }, [router, acceptedRequest]);
  if (!rendered) return <></>;
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-[3rem]">
        <div className="flex h-full w-full flex-col items-center justify-center gap-[4rem] text-main">
          <div className="flex flex-col items-center gap-[2.4rem]">
            <Image
              src={"/icon/ambulance.svg"}
              alt="ambulance"
              width={64}
              height={64}
            />
            <div className="flex flex-col items-center gap-[1rem]">
              <div className="fontSize-large">
                {emergencyCenter && emergencyCenter.emergency_center_name}의
                인수인계를 기다리고있습니다
              </div>
              <div className="fontSize-regular-l text-grey">
                인수인계가 완료되었음에도 완료처리가 안될경우 새로고침해주세요
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center gap-[2.4rem]">
            <Spinner />
          </div>
        </div>

        <ProgressTracker
          steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
          currentStep={5}
        />
      </div>
    </div>
  );
};
