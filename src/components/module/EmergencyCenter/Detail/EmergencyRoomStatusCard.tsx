import { Tag } from "@/components/elements/Tag";
import {
  EMERGENCY_ROOM_TYPE_KOR,
  EmergencyRoomWithBeds,
} from "@/types/model/emergencyCenter";

interface EmergencyRoomStatusCardProps {
  emergencyRooms: EmergencyRoomWithBeds[];
}
export const EmergencyRoomStatusCard = ({
  emergencyRooms,
}: EmergencyRoomStatusCardProps) => {
  return (
    <div className="fontSize-medium flex flex-col gap-[1rem]">
      <p className="fontSize-small-l text-lgrey">병상 정보</p>
      <div>
        {emergencyRooms.map((room) => {
          const availableBedsCount = room.emergency_room_beds.filter(
            (bed) => bed.emergency_room_bed_status === "AVAILABLE"
          );
          const { emergency_room_beds } = room._count;
          const ratio = availableBedsCount.length / emergency_room_beds;
          const color = ratio > 0.5 ? "main" : ratio > 0.3 ? "yellow" : "red";
          return (
            <div
              key={room.emergency_room_type}
              className="mr-[1.2rem] inline-block"
            >
              <Tag
                text={EMERGENCY_ROOM_TYPE_KOR[room.emergency_room_type]}
                color={color}
                borderColor={color}
              />
              <p className="fontSize-medium-l text-center">
                {
                  room.emergency_room_beds.filter(
                    (bed) => bed.emergency_room_bed_status !== "AVAILABLE"
                  ).length
                }{" "}
                /{room._count.emergency_room_beds}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
