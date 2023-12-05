"use client";

import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useToast } from "@/components/ui/use-toast";
import { useEmergencyCenterDetail } from "@/hooks/api/useEmergencyCenterDetail";
import { useRequest } from "@/hooks/api/useRequest";
import { useUpdateRequestStatus } from "@/hooks/mutate/useUpdateRequestStatus";
import { RequestInfo } from "@/types/model/request";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TransferCompleteContainer = () => {
  const { requests, mutate } = useRequest();
  const { toast } = useToast();
  const [rendered, setRendered] = useState(false);
  const [acceptedRequest, setAcceptedRequest] = useState<RequestInfo | null>(
    null
  );
  const { emergencyCenter } = useEmergencyCenterDetail(
    acceptedRequest?.emergency_center_id || ""
  );
  const router = useRouter();
  const { mutate: updateRequestStatus } = useUpdateRequestStatus();

  const onClickTransferButton = () => {
    updateRequestStatus({
      params: { path: { patient_id: acceptedRequest?.patient_id || "" } },
      body: { request_status: "TRANSFER_COMPLETED" },
    }).then((res) => {
      const { data, error } = res;
      if (data?.is_success) {
        toast({ description: "성공" });
        mutate();
        return;
      }
      if (error) {
        // router.push("/response");
        const { message } = error;
        if (message === "REQUEST_NOT_FOUND") {
          toast({ description: "요청이 존재하지 않습니다." });
        }
      }
    });
  };

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
    if (request_status === "TRANSFER") return;
    if (request_status === "TRANSFER_COMPLETED") {
      router.push(`/patient/handover`);
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
    <>
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
              <div className="fontSize-large">이송중입니다</div>
            </div>
            <div className="flex flex-col items-center gap-[2.4rem]">
              <div className="fontSize-regular flex flex-col items-center gap-[1rem] text-main">
                <div className="fontSize-regular">
                  {emergencyCenter && emergencyCenter?.emergency_center_name}
                </div>
                <div className="fontSize-regular  text-grey">
                  {emergencyCenter && emergencyCenter?.emergency_center_address}
                </div>
              </div>
              <div className="fontSize-regular-l text-grey">
                지도를 눌러 위치를 확인하세요
              </div>
            </div>

            <div className="h-[12rem] w-[12rem] ">
              <button
                className="fontSize-small h-[4rem] w-[12.8rem] rounded-lg bg-main text-white"
                onClick={onClickTransferButton}
              >
                이송완료
              </button>
            </div>
          </div>

          <ProgressTracker
            steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
            currentStep={5}
          />
        </div>
      </div>
    </>
  );
};
