"use client";

import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/hooks/api/usePatient";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SymptomLabel } from "../../common/SymptomLabeledInput";
import { Steper } from "../../common/Tapper";

interface VsEvalutaionFormProps {
  formId: string;
}

export const VsEvalutaionForm = ({ formId }: VsEvalutaionFormProps) => {
  const { patient } = usePatient();
  const router = useRouter();
  const { toast } = useToast();
  const { accessToken } = useAuth();
  const [temperature, setTemperature] = useState<string>("36.5");
  const [heartRate, setHeartRate] = useState<number>(80);
  const [respiration, setRespiration] = useState<number>(12);
  const [systolicBloodPressure, setSystolicBloodPressure] =
    useState<number>(120);
  const [diastolicBloodPressure, setDiastolicBloodPressure] =
    useState<number>(80);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (temperature === "" || temperature === "-") {
      toast({ description: "체온을 입력해주세요" });
      return;
    }
    if (heartRate === 0) {
      toast({ description: "맥박을 입력해주세요" });
      return;
    }
    if (respiration === 0) {
      toast({ description: "호흡수를 입력해주세요" });
      return;
    }
    if (systolicBloodPressure === 0) {
      toast({ description: "수축기 혈압을 입력해주세요" });
      return;
    }
    if (diastolicBloodPressure === 0) {
      toast({ description: "이완기 혈압을 입력해주세요" });
      return;
    }
    if (!patient) {
      return;
    }
    const body = JSON.stringify({
      heart_rate: heartRate,
      respiratory_rate: respiration,
      systolic_blood_pressure: systolicBloodPressure,
      diastolic_blood_pressure: diastolicBloodPressure,
      temperature: Number(temperature),
    });
    fetch(`/api/ems/patients/${patient.patient_id}/vs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((res: { is_success: boolean }) => {
        if (res.is_success) {
          toast({ description: "vs평가가 저장되었습니다." });
          router.push("/patient/additional-evaluation");
          return;
        }
        toast({ description: "vs평가에 실패했습니다." });
      });

    //로직 추가
    console.log("submit");
  };

  // input change handler
  const tempOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 입력값이 비어있거나, 소수점, 마이너스 기호만 포함한 경우에도 허용
    if (value === "" || value === "-" || value === ".") {
      setTemperature(value);
    } else {
      const numberValue = Number(value);
      if (isNaN(numberValue)) return;
      // 입력값이 0보다 작거나 50보다 큰 경우 허용하지 않음
      if (numberValue < 0 || numberValue > 50) return;
      // 입력값이 소수점 이하 2자리를 초과하는 경우 허용하지 않음
      if (value.split(".")[1]?.length > 1) return;
      setTemperature(value);
    }
  };
  const heartRateOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) < 0 || Number(e.target.value) > 300) return;

    setHeartRate(Number(e.target.value));
  };
  const respirationOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) < 0 || Number(e.target.value) > 100) return;

    setRespiration(Number(e.target.value));
  };
  const systolicBloodPressureOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) < 0 || Number(e.target.value) > 300) return;

    setSystolicBloodPressure(Number(e.target.value));
  };
  const diastolicBloodPressureOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isNaN(Number(e.target.value))) return;
    if (Number(e.target.value) < 0 || Number(e.target.value) > 300) return;

    setDiastolicBloodPressure(Number(e.target.value));
  };
  const tempClickHandler = (num: number) => () => {
    setTemperature((prev) =>
      (Math.round((Number(prev) + num) * 100) / 100).toString()
    );
  };
  const heartRateClickHandler = (num: number) => () => {
    setHeartRate((prev) => prev + num);
  };
  const respirationClickHandler = (num: number) => () => {
    setRespiration((prev) => prev + num);
  };
  const systolicBloodPressureClickHandler = (num: number) => () => {
    setSystolicBloodPressure((prev) => prev + num);
  };
  const diastolicBloodPressureClickHandler = (num: number) => () => {
    setDiastolicBloodPressure((prev) => prev + num);
  };

  useEffect(() => {
    if (patient && !patient.patient_id) {
      router.push("/patient/rapid");
    }
  }, [patient, router]);

  return (
    <form
      className="flex w-full max-w-[60rem] flex-col gap-[5rem]"
      id={formId}
      onSubmit={onSubmit}
    >
      <SymptomLabel title="체온" description="체온" bgColor="transparent">
        <Steper
          unit="°C"
          value={temperature}
          leftButtonOnClick={tempClickHandler(-0.1)}
          rightButtonOnClick={tempClickHandler(0.1)}
          onChageHandler={tempOnChange}
        />
      </SymptomLabel>
      <SymptomLabel title="맥박" description="(횟수/분)" bgColor="transparent">
        <Steper
          unit="회"
          value={heartRate}
          leftButtonOnClick={heartRateClickHandler(-1)}
          rightButtonOnClick={heartRateClickHandler(1)}
          onChageHandler={heartRateOnChange}
        />
      </SymptomLabel>
      <SymptomLabel title="호흡수" description="횟수분" bgColor="transparent">
        <Steper
          unit="회"
          value={respiration}
          leftButtonOnClick={respirationClickHandler(-1)}
          rightButtonOnClick={respirationClickHandler(1)}
          onChageHandler={respirationOnChange}
        />
      </SymptomLabel>
      <SymptomLabel title="혈압" description="mmHg" bgColor="transparent">
        <div className="flex gap-[2rem]">
          <Steper
            label="수축기 혈압"
            value={systolicBloodPressure}
            leftButtonOnClick={systolicBloodPressureClickHandler(-1)}
            rightButtonOnClick={systolicBloodPressureClickHandler(1)}
            onChageHandler={systolicBloodPressureOnChange}
          />
          <Steper
            label="이완기 혈압"
            value={diastolicBloodPressure}
            leftButtonOnClick={diastolicBloodPressureClickHandler(-1)}
            rightButtonOnClick={diastolicBloodPressureClickHandler(1)}
            onChageHandler={diastolicBloodPressureOnChange}
          />
        </div>
      </SymptomLabel>
    </form>
  );
};
