import { usePatientStore } from "@/store/patient.store";
import { useEffect } from "react";
import { useGetApi } from ".";

export const usePatient = () => {
  const patient = usePatientStore((state) => state.patient);
  const setPatient = usePatientStore((state) => state.setPatient);
  // const { data, isLoading } = useSWR<{ result: { patient_list: Patient[] } }>(
  //   `/api/ems/patients?patient_status=PENDING&patient_status=REQUESTED&patient_status=ACCEPTED`,
  //   (url: string) => fetcher(url, accessToken)
  // );
  const { data, isLoading, refetch } = useGetApi(
    "/ems/patients",
    {
      useLoader: true,
    },
    {
      params: {
        query: {
          query: {
            patient_status: ["PENDING", "REQUESTED", "ACCEPTED"],
          },
        },
      },
    }
  );

  useEffect(() => {
    if (isLoading) return;
    if (!data) return;
    const { result } = data;
    const patient_list = result.patient_list;
    if (patient_list.length > 0)
      setPatient({ ...patient_list[0], patient_identity_number: "********" });
  }, [data, setPatient, isLoading]);

  const mutation = () => {
    refetch().then((res) => {
      if (!res) return;
      const { is_success } = res;
      if (!is_success) return;
      const { result } = res;
      const patient_list = result.patient_list;
      if (patient_list.length > 0)
        setPatient({ ...patient_list[0], patient_identity_number: "********" });
    });
  };
  return {
    patient: patient,
    error: undefined,
    isLoading,
    mutation,
  };
};
