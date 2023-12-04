import { usePatientDetailStore } from "@/store/patientDetail.store";
import { useEffect } from "react";
import { useGetApi } from ".";

export const usePatientDetail = () => {
  const patientId = usePatientDetailStore((state) => state.patientId);
  const patientInfo = usePatientDetailStore((state) => state.patientInfo);
  const setPatientInfo = usePatientDetailStore((state) => state.setPatientInfo);

  const { data, isLoading } = useGetApi(
    "/ems/patients/{patient_id}",
    { useLoader: true },
    {
      params: {
        path: {
          patient_id: patientId || "undefined",
        },
      },
    }
  );

  useEffect(() => {
    if (!data) return;
    if (!data.result) return;
    setPatientInfo(data.result);
  }, [data, setPatientInfo]);

  return {
    patientInfo,
    setPatientInfo,
    isLoading,
  };
};
