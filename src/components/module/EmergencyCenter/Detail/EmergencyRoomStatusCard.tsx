import { Tag } from "@/components/elements/Tag";
import {
  EMERGENCY_ROOM_TYPE_KOR,
  EmergencyRoom,
  EmergencyRoomBed,
} from "@/lib/type/emergencyCenter.type";

interface EmergencyRoomStatusCardProps {
  emergencyRooms: (EmergencyRoom & {
    emergency_room_beds: EmergencyRoomBed[];
    _count: {
      emergency_room_beds: number;
    };
  })[];
}
export const EmergencyRoomStatusCard = ({
  emergencyRooms,
}: EmergencyRoomStatusCardProps) => {
  return (
    <div className="fontSize-medium flex flex-col gap-[1rem]">
      <p className="fontSize-small-l text-lgrey">병상 정보</p>
      {/* <div className="mr-[1.2rem]">
  <Tag
    text={emergency_center.emergency_rooms[0].emergency_room_type}
  />
</div> */}
      <div>
        {emergencyRooms.map((room) => (
          <div
            key={room.emergency_room_type}
            className="mr-[1.2rem] inline-block"
          >
            <Tag text={EMERGENCY_ROOM_TYPE_KOR[room.emergency_room_type]} />
            <p className="fontSize-medium-l text-center">
              {
                room.emergency_room_beds.filter(
                  (bed) => bed.emergency_room_bed_status !== "AVAILABLE"
                ).length
              }{" "}
              /{room._count.emergency_room_beds}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
