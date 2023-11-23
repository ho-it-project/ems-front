import { useAuth } from "@/providers/AuthProvider";
import { usePatientStore } from "@/store/patient.store";
import { Patient } from "@/types/model/patient";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string, accessToken: string | null) =>
  fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
export const usePatient = () => {
  const { patient, setPatient } = usePatientStore();
  const { accessToken } = useAuth();
  const { data } = useSWR<{ result: { patient_list: Patient[] } }>(
    `/api/ems/patients?patient_status=PENDING&patient_status=REQUESTED&patient_status=ACCEPTED`,
    (url: string) => fetcher(url, accessToken)
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
