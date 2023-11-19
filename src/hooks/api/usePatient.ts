import { usePatientStore } from "@/store/patient.store";
import { Patient } from "@/types/model/patient";
import { useEffect } from "react";
import useSWR from "swr";

export const usePatient = () => {
  const { patient, setPatient } = usePatientStore();
  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  const { data } = useSWR<{ result: { patient_list: Patient[] } }>(
    `/api/ems/patients?patient_status=PENDING&patient_status=REQUESTED&patient_status=ACCEPTED`,
    fetcher
  );

  useEffect(() => {
    if (!data) return;
    if (!data.result) return;
    const { result } = data;
    const patient_list = result.patient_list;
    if (patient_list.length > 0)
      setPatient({ ...patient_list[0], patient_identity_number: "********" });
  }, [data, setPatient]);
  return {
    patient,
    error: undefined,
  };
};
