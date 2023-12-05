"use client";
import { PageHeader } from "@/components/elements/PageHeader";
import { usePatient } from "@/hooks/api/usePatient";
import { usePatientDetail } from "@/hooks/api/usePatinetDetail";
import { usePatientDetailStore } from "@/store/patientDetail.store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export const AdditionalEvaluationContainer = () => {
  const { patient } = usePatient();
  const { patientInfo } = usePatientDetail();
  const setPatientId = usePatientDetailStore((state) => state.setPatientId);
  useEffect(() => {
    setPatientId(patient?.patient_id || "");
  }, [patient, setPatientId]);

  return (
    <div className="h-full w-full">
      <div className="w-full">
        <PageHeader
          title=""
          button={
            <Link
              href={`/patient/${patient?.patient_id}`}
              className="fontSize-small flex items-center text-grey"
            >
              <ChevronLeft />
              <span>환자/보호자 정보 수정하기</span>
            </Link>
          }
        />
      </div>

      <div
        className="flex h-full w-full flex-col items-center justify-center gap-[5.5rem] text-main
      "
      >
        <div>추가 평가할 항목을 선택해주세요</div>
        <div className="flex flex-col gap-[2.4rem]">
          <div className="flex w-full items-center  justify-center gap-[2.4rem]">
            <Link
              href="/patient/rapid"
              className="flex h-[12rem] w-[20rem] flex-col items-center justify-center rounded-lg bg-white text-grey"
            >
              <div>신속평가</div>
              {patientInfo && patientInfo.rapid.length > 0 && (
                <div className="fontSize-small-l">
                  평가개수: {patientInfo.rapid.length}개
                </div>
              )}
            </Link>
            <Link
              href="/patient/opqrst"
              className="flex h-[12rem] w-[20rem] flex-col items-center justify-center rounded-lg bg-white text-grey"
            >
              <div>OPQRST</div>
              {patientInfo && patientInfo.opqrst.length > 0 && (
                <div className="fontSize-small-l">
                  평가개수: {patientInfo.opqrst.length}개
                </div>
              )}
            </Link>
            <Link
              href="/patient/vs"
              className="flex h-[12rem] w-[20rem] flex-col items-center justify-center rounded-lg bg-white text-grey"
            >
              <div>VS</div>
              {patientInfo && patientInfo.vs.length > 0 && (
                <div className="fontSize-small-l">
                  평가개수: {patientInfo.vs.length}개
                </div>
              )}
            </Link>
          </div>
          <div className="flex w-full items-center justify-center gap-[2rem]">
            <Link
              href="/patient/sample"
              className="flex h-[12rem] w-[20rem] flex-col items-center justify-center rounded-lg bg-white text-grey"
            >
              <div>SAMPLE</div>
              {patientInfo && patientInfo.sample.length > 0 && (
                <div className="fontSize-small-l">
                  평가개수: {patientInfo.sample.length}개
                </div>
              )}
            </Link>
            <Link
              href="/patient/dcap-btls"
              className="flex h-[12rem] w-[20rem] flex-col items-center justify-center rounded-lg bg-white text-grey"
            >
              <div>DCAP-BTLS</div>
              {patientInfo && patientInfo.dcap_btls.length > 0 && (
                <div className="fontSize-small-l">
                  평가개수: {patientInfo.dcap_btls.length}개
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
