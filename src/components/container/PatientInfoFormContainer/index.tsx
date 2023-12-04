"use client";
import { PageHeader } from "@/components/elements/PageHeader";
import { GuardianInfoForm } from "@/components/module/PatientInfo/GuardianInfoForm";
import { PatientInfoForm } from "@/components/module/PatientInfo/PatientInfoForm";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { usePatient } from "@/hooks/api/usePatient";
import { useRapidEvaluationStore } from "@/store/rapidEvaluation.store.";
import { useRequestStore } from "@/store/request.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PatientInfoFormContainer = () => {
  const { patient } = usePatient();
  const [form, setForm] = useState<"PATIENT" | "GUARDIAN">("PATIENT");
  const router = useRouter();
  // const { steps } = useEvaluationStep();
  const { requests } = useRequestStore();
  const { check } = useRapidEvaluationStore();
  useEffect(() => {
    if (!check) {
      router.push("/patient/rapid");
      return;
    }
    if (patient && patient.patient_id) {
      router.push("/patient/additional-evaluation");
    }
    if (patient?.patient_id && requests.length > 0) {
      router.push("/patient/additional-evaluation");
    }
  }, [patient, router, requests, check]);
  const changeForm = () => {
    if (form === "PATIENT") {
      setForm("GUARDIAN");
    }
  };
  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col gap-[6rem] rounded-lg">
        <PageHeader
          title={"환자 정보 입력"}
          fontSize="xlarge-l"
          color="black"
        />
        <div className="h-full">
          <div className="m-auto w-[50rem] rounded-lg bg-white p-[3rem] pb-[4rem]">
            {form === "PATIENT" && <PatientInfoForm changeForm={changeForm} />}
            {form === "GUARDIAN" && <GuardianInfoForm />}
          </div>
        </div>
        <ProgressTracker
          steps={["증상 확인1", "증상 기록2", "증상 3", "증상 4", "증상 5"]}
          currentStep={0}
        />
      </div>
    </div>
  );
};
