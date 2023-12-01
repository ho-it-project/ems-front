"use client";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useToast } from "@/components/ui/use-toast";
import { useEmergencyCenterDetail } from "@/hooks/api/useEmergencyCenterDetail";
import { useRequest } from "@/hooks/api/useRequest";
import { useUpdateRequestStatus } from "@/hooks/mutate/useUpdateRequestStatus";
import { RequestInfo } from "@/types/model/request";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const TransferContainer = () => {
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
      body: { request_status: "TRANSFER" },
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
    const { request_status, emergency_center_id } = acceptedRequest;
    if (request_status === "TRANSFER_COMPLETED") {
      router.push(`/emergency-center/${emergency_center_id}`);
      return;
    }
    if (request_status === "TRANSFER") {
      router.push("/patient/transfer/complete");
      return;
    }
    if (request_status !== "ACCEPTED") {
      router.push("/response");
      return;
    }
  }, [router, acceptedRequest]);

  if (!rendered) return <></>;

  return (
    <>
      <div className="h-full w-full">
        <div className="flex h-full w-full flex-col gap-[3rem]">
          <div className="flex h-full w-full flex-col items-center justify-center gap-[4rem] text-main">
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
              <button
                className="h-full w-full rounded-full bg-main text-white"
                onClick={onClickTransferButton}
              >
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
