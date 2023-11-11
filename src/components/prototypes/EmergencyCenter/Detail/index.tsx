import { EmergencyCenterDetailContainer } from "@/components/container/EmergencyCenterCentainer/Detail";
import { GetEmergencyCenterDetailResponse } from "@/lib/type/emergencyCenter.type";

interface EmergencyCenterDetailProps {
  emergency_center: GetEmergencyCenterDetailResponse; // ssr 응답값을 직접 사용
}

export const EmergencyCenterDetailPrototype = ({
  emergency_center,
}: EmergencyCenterDetailProps) => {
  return <EmergencyCenterDetailContainer emergency_center={emergency_center} />;
};
