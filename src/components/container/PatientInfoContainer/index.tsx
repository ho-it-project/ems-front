"use client";
import { PageHeader } from "@/components/elements/PageHeader";
import { Tag } from "@/components/elements/Tag";
import { useToast } from "@/components/ui/use-toast";
import { usePutApi } from "@/hooks/api";
import { useEmployeeDetail } from "@/hooks/api/useEmployeeDetail";
import { usePatient } from "@/hooks/api/usePatient";
import { usePatientDetail } from "@/hooks/api/usePatinetDetail";
import { usePatientStore } from "@/store/patient.store";
import { useRequestStore } from "@/store/request.store";
import {
  DCAP_BTLS_AFFECT,
  DCAP_BTLS_AFFECT_AREA_KOR,
  DCAP_BTLS_AFFECT_KOR,
  DCAP_BTLS_AffectArea,
} from "@/types/evaluation";
import { EmployeeRoleLabel } from "@/types/model/employee";
import { GuardianRelationKorMap } from "@/types/model/patient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const PatientInfoContainer = () => {
  const { patientInfo } = usePatientDetail();
  const { employeeDetail } = useEmployeeDetail(patientInfo?.ems_employee_id);
  const { mutation } = usePatient();
  const { requests, setRequestList } = useRequestStore(); // TODO : request_id로 요청시간 가져오기
  const { mutate: cancelBeforeRequest } = usePutApi(
    "/ems/patients/{patient_id}",
    {
      useLoader: true,
    }
  );
  const { mutate: cancleAfterRequest } = usePutApi(
    "/requests/ems-to-er/{patient_id}",
    {
      useLoader: true,
    }
  );
  const router = useRouter();
  const { toast } = useToast();
  const patientInit = usePatientStore((state) => state.init);
  const onCancelPatient = () => {
    if (requests.length === 0)
      cancelBeforeRequest({
        params: {
          path: { patient_id: patientInfo?.patient_id || "" },
        },
      }).then((res) => {
        const { error } = res;
        if (error) {
          toast({
            title: "환자 취소 실패",
            description: "환자 취소에 실패했습니다.",
          });
          return;
        }
        toast({
          title: "환자 취소 성공",
          description: "환자 취소에 성공했습니다.",
        });
        patientInit();
        mutation();
        router.replace("/");
      });

    if (requests.length > 0)
      cancleAfterRequest({
        params: {
          path: { patient_id: patientInfo?.patient_id || "" },
        },
      }).then((res) => {
        const { error } = res;
        if (error) {
          toast({
            title: "환자 취소 실패",
            description: "환자 취소에 실패했습니다.",
          });
          return;
        }
        toast({
          title: "환자 취소 성공",
          description: "환자 취소에 성공했습니다.",
        });
        patientInit();
        mutation();
        setRequestList([]);
        router.replace("/");
      });
  };

  useEffect(() => {
    if (!patientInfo) return;
    if (patientInfo.patient_status === "CANCELED") {
      router.push("/");
      patientInit();
    }
  }, [patientInfo, router, patientInit]);

  if (!patientInfo) return <></>;
  if (!employeeDetail) return <></>;
  if (!requests) return <></>;

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col gap-[2rem] rounded-lg p-[1.6rem]">
        <div className="flex w-full justify-end gap-[1rem]">
          <div>
            <button
              className="fontSize-small flex h-[4rem] w-[12.8rem] items-center justify-center rounded-lg bg-lgrey text-white"
              onClick={onCancelPatient}
            >
              환자 취소하기
            </button>
          </div>
          <Link href={"/patient/additional-evaluation"}>
            <div className="fontSize-small flex h-[4rem] w-[12.8rem] items-center justify-center rounded-lg bg-main text-white">
              추가 평가하기
            </div>
          </Link>
        </div>
        <div className="h-full w-full overflow-scroll">
          <div className="w-full">
            <PageHeader
              title={"구급업체 및 구급대원 정보"}
              fontSize="medium"
              color="main"
            >
              <>
                <Tag text="수정" />
              </>
            </PageHeader>
            <div className=" w-full rounded-lg bg-bg p-[3.6rem]">
              <div>
                {employeeDetail &&
                  employeeDetail.ambulance_company.ambulance_company_name}{" "}
                / {employeeDetail && employeeDetail.employee_name}{" "}
                {employeeDetail && EmployeeRoleLabel[employeeDetail.role]}
              </div>
            </div>
          </div>
          <div className="w-full">
            <PageHeader title={"요청시간"} fontSize="medium" color="main">
              <>
                <Tag text="수정" />
              </>
            </PageHeader>
            <div className=" w-full rounded-lg bg-bg p-[3.6rem]">
              {requests.length > 0 &&
                new Date(requests[0].request_date).toLocaleString("ko-KR", {
                  timeZone: "Asia/Seoul",
                  dateStyle: "long",
                  timeStyle: "medium",
                })}
            </div>
          </div>
          <div className="w-full">
            <PageHeader title={"환자정보"} fontSize="medium" color="main">
              <>
                <Tag text="수정" />
              </>
            </PageHeader>
            <div className=" flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]">
              <div className="flex">
                <span className="min-w-[12.8rem] text-main">성함</span>
                <span>{patientInfo && patientInfo.patient_name}</span>
              </div>
              <div className="flex">
                <span className="min-w-[12.8rem] text-main ">나이/성별</span>
                <span>
                  {patientInfo?.patient_birth &&
                    Math.abs(
                      Number(patientInfo.patient_birth.toString().slice(0, 4)) -
                        new Date().getFullYear() +
                        1
                    )}{" "}
                  세 /{" "}
                  {patientInfo.patient_gender === "FEMALE" ? "여성" : "남성"}
                </span>
              </div>
              <div className="flex">
                <span className="s min-w-[12.8rem] text-main">
                  주민등록번호
                </span>
                <span>
                  {patientInfo?.patient_birth &&
                    patientInfo.patient_birth.slice(2, 8)}{" "}
                  - {patientInfo.patient_identity_number}
                </span>
              </div>
              <div className="flex">
                <span className="min-w-[12.8rem] text-main ">거주지</span>
                <span>{patientInfo && patientInfo.patient_address}</span>
              </div>
              <div className="flex">
                <span className="min-w-[12.8rem] text-main ">연락처</span>
                <span>{patientInfo && patientInfo.patient_phone}</span>
              </div>
            </div>
          </div>
          {patientInfo.guardian && (
            <div className="flex w-full flex-col gap-[1rem]">
              <PageHeader title={"보호자정보"} fontSize="medium" color="main">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className=" flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]">
                <div className="flex">
                  <span className="min-w-[12.8rem] text-main">성함</span>
                  <span>
                    {patientInfo && patientInfo.guardian.guardian_name}
                  </span>
                </div>
                <div className="flex">
                  <span className="min-w-[12.8rem] text-main">거주지</span>
                  <span>
                    {patientInfo && patientInfo.guardian.guardian_address}
                  </span>
                </div>
                <div className="flex">
                  <span className="min-w-[12.8rem] text-main">연락처</span>
                  <span>
                    {patientInfo && patientInfo.guardian.guardian_phone}
                  </span>
                </div>
                <div className="flex">
                  <span className="min-w-[12.8rem] text-main">
                    환자와의 관계
                  </span>
                  <span>
                    {patientInfo &&
                      GuardianRelationKorMap[
                        patientInfo.guardian.guardian_relation
                      ]}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="w-full">
            <PageHeader title={"환자상태"} fontSize="medium" color="main" />
            <div className="w-full">
              <PageHeader title={"신속평가"} fontSize="medium-l" color="grey">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className="flex flex-col gap-[1rem]">
                {patientInfo &&
                  patientInfo.rapid.map((rapid, i) => {
                    return (
                      <div
                        className=" flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]"
                        key={`rapid-${i}`}
                      >
                        <div className="flex items-end gap-[2rem]  text-main">
                          <p>신속평가 {i + 1}차 </p>
                          <span className="fontSize-small-l text-grey">
                            {new Date(rapid.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex gap-[2rem]">
                          <div className="flex gap-[1rem]">
                            <span className="text-main">외상</span>
                            <span>{rapid.trauma === "TRUE" ? "O" : "X"}</span>
                          </div>
                          <div className="flex gap-[1rem]">
                            <span className="text-main">손상기전</span>
                            <span>{rapid.clear === "TRUE" ? "O" : "X"}</span>
                          </div>
                          <div className="flex gap-[1rem]">
                            <span className="text-main">의식</span>
                            <span>
                              {rapid.conscious === "TRUE" ? "O" : "X"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full">
              <PageHeader title={"OPQRST"} fontSize="medium-l" color="grey">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className="flex flex-col gap-[1rem]">
                {patientInfo.opqrst.map((opqrst, i) => {
                  return (
                    <div
                      className="flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]"
                      key={`opqrst-${i}`}
                    >
                      <div className="flex items-end gap-[1rem]  text-main">
                        <p>OPQRST {i + 1}차 평가</p>
                        <span className="fontSize-small-l text-grey">
                          {new Date(opqrst.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">Onset</span>
                        <span>{opqrst.onset}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">
                          Provoke
                        </span>
                        <span>{opqrst.provocation}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">
                          Quality
                        </span>
                        <span>{opqrst.quality}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">
                          Radiation
                        </span>
                        <span>{opqrst.radiation}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">
                          Severity
                        </span>
                        <span>{opqrst.severity}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">Time</span>
                        <span>{new Date(opqrst.time).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <PageHeader title={"VS"} fontSize="medium-l" color="grey">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className="flex flex-col gap-[1rem]">
                {patientInfo.vs.map((vs, i) => {
                  return (
                    <div
                      className="flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]"
                      key={`vs ${i}`}
                    >
                      <div className="flex items-end  gap-[1rem]">
                        <p className="text-main">VS {i + 1}차 평가</p>
                        <span className="fontSize-small-l text-grey">
                          {new Date(vs.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">체온</span>
                        <span>{vs.temperature} ℃</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">
                          맥박수
                        </span>
                        <span>{vs.heart_rate} 회/분</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">호흡</span>
                        <span>{vs.respiratory_rate} 회/분</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] text-main">혈압</span>
                        <span>
                          {vs.systolic_blood_pressure}/
                          {vs.diastolic_blood_pressure} mmHg
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <PageHeader title={"SAMPLE"} fontSize="medium-l" color="grey">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className="flex flex-col gap-[1rem]">
                {patientInfo.sample.map((sample, i) => {
                  return (
                    <div
                      className="flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]"
                      key={`sample ${i}`}
                    >
                      <div className="flex items-end gap-[1rem]">
                        <p className="text-main">SAMPLE {i + 1}차 평가</p>
                        <span className="fontSize-small-l text-grey">
                          {new Date(sample.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Symptoms
                        </span>
                        <span>{sample.signs_symptoms}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Allergies
                        </span>
                        <span>{sample.allergies}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Medications
                        </span>
                        <span>{sample.medications}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Past medical history
                        </span>
                        <span>{sample.past_medical_history}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Last oral intake
                        </span>
                        <span>{sample.last_oral_intake}</span>
                      </div>
                      <div className="flex">
                        <span className="min-w-[12.8rem] max-w-[12.8rem] text-main">
                          Event
                        </span>
                        <span>{sample.events_leading_to_illness}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full">
              <PageHeader title={"DCAP-BTLS"} fontSize="medium-l" color="grey">
                <>
                  <Tag text="수정" />
                </>
              </PageHeader>
              <div className="flex w-full flex-col gap-[2rem] rounded-lg bg-bg p-[3.6rem]">
                <div className="flex gap-[1rem] text-main">
                  <p>DCAP-BTLS 평가</p>
                </div>
                {Object.entries(DCAP_BTLS_AFFECT_AREA_KOR).map(
                  ([area, areaKor], i) => {
                    const filtered = patientInfo.dcap_btls.filter(
                      (dcap) =>
                        dcap.affected_area === (area as DCAP_BTLS_AffectArea)
                    );
                    if (filtered.length === 0) return;

                    return (
                      <div className="flex gap-[1rem]" key={`${area}${i}`}>
                        <span className="min-w-[12.8rem] text-main">
                          {areaKor}
                        </span>
                        <div>
                          {filtered.map((dcap, j) => {
                            const {
                              deformity,
                              contusion,
                              abrasion,
                              puncture,
                              burn,
                              tenderness,
                              laceration,
                              swelling,
                            } = dcap;
                            const symptoms: [keyof DCAP_BTLS_AFFECT, string][] =
                              [
                                ["deformity", deformity],
                                ["contusion", contusion],
                                ["abrasion", abrasion],
                                ["puncture", puncture],
                                ["burn", burn],
                                ["tenderness", tenderness],
                                ["laceration", laceration],
                                ["swelling", swelling],
                              ];
                            const filteredSymptoms = symptoms.filter(
                              ([, value]) => value === "true"
                            );
                            return (
                              <div
                                key={`${dcap.affected_area}${i}${j}`}
                                className="flex flex-col gap-[1rem]"
                              >
                                <div>
                                  {areaKor} {i + 1}차 평가{" "}
                                  <span className="fontSize-small-l text-grey">
                                    {new Date(dcap.created_at).toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex flex-wrap">
                                  {filteredSymptoms.map(([key, value], k) => {
                                    return (
                                      value === "true" && (
                                        <div
                                          className="flex gap-[1rem]"
                                          key={`${dcap.affected_area}-${i}-${j}${k}`}
                                        >
                                          <span className="min-w-[12.8rem] text-black">
                                            {DCAP_BTLS_AFFECT_KOR[key]}
                                          </span>
                                        </div>
                                      )
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
