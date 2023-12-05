import { usePatchApi } from "../api";

export const useUpdateRequestStatus = () => {
  return usePatchApi("/requests/ems-to-er/{patient_id}", {
    useLoader: false,
  });
};
