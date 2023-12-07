import { EmergencyCenterDetailContainer } from "@/components/container/EmergencyCenterCentainer/Detail";
import { Department } from "@/types/department/client";
import {
  EmergencyCenter,
  EmergencyRoomWithBeds,
} from "@/types/model/emergencyCenter";

interface EmergencyCenterDetailProps {
  emergencyCenter: EmergencyCenter;
  emergencyRooms: EmergencyRoomWithBeds[];
  departments: Department[];
}

export const EmergencyCenterDetailPrototype = ({
  emergencyCenter,
  emergencyRooms,
  departments,
}: EmergencyCenterDetailProps) => {
  return (
    <EmergencyCenterDetailContainer
      emergencyCenter={emergencyCenter}
      emergencyRooms={emergencyRooms}
      departments={departments}
    />
  );
};
