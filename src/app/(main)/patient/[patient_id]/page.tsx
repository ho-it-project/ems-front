"use client";
import { TabWrapper } from "@/components/layout/TabWrapper";
import { PatientInfoPrototype } from "@/components/prototypes/PatientInfo";
import { usePatientDetailStore } from "@/store/patientDetail.store";
import { useEffect } from "react";

interface Params {
  patient_id: string;
}
export default function Info({ params }: { params: Params }) {
  const { patient_id } = params;
  const setPatinetId = usePatientDetailStore((state) => state.setPatientId);
  useEffect(() => {
    setPatinetId(patient_id);
  }, [patient_id, setPatinetId]);

  return (
    <TabWrapper
      contents={[
        {
          title: "환자정보수정",
          content: <PatientInfoPrototype />,
        },
      ]}
    />
  );
}
