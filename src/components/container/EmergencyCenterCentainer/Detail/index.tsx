import { PageHeader } from "@/components/elements/PageHeader";
import { EmergencyCenterIllnessStatusCard } from "@/components/module/EmergencyCenter/Detail/EmergencyCenterIllnessStatusCard";
import { EmergencyCenterInfoCard } from "@/components/module/EmergencyCenter/Detail/EmergencyCenterInfoCard";
import { EmergencyRoomStatusCard } from "@/components/module/EmergencyCenter/Detail/EmergencyRoomStatusCard";
import { Department } from "@/types/department/client";
import {
  EmergencyCenter,
  EmergencyRoomWithBeds,
} from "@/types/model/emergencyCenter";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

interface EmergencyCenterDetailProps {
  emergencyCenter: EmergencyCenter; // ssr 응답값을 직접 사용
  emergencyRooms: EmergencyRoomWithBeds[];
  departments: Department[];
}
export const EmergencyCenterDetailContainer = ({
  emergencyCenter,
  emergencyRooms,
  departments,
}: EmergencyCenterDetailProps) => {
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-[3rem]">
        <PageHeader
          title="주변 응급실 찾기"
          button={
            <Link href="/emergency-center">
              <ChevronLeftIcon />
            </Link>
          }
          fontSize="small"
          color="lgrey"
        >
          <button className=" fontSize-small h-[4rem] w-[12.7rem] rounded-lg bg-main text-white">
            메세지
          </button>
        </PageHeader>
        <div className="h-full w-full overflow-scroll">
          <div className="m-auto flex h-full w-full max-w-[63rem] flex-col gap-[4rem]">
            {
              // 병원정보
            }
            <EmergencyCenterInfoCard emergencyCenter={emergencyCenter} />
            {
              // 병상
            }
            <EmergencyRoomStatusCard emergencyRooms={emergencyRooms} />

            <div className="flex">
              <div className="flex-1">
                <p className="fontSize-small-l text-lgrey">
                  치료 가능 중증응급질환
                </p>
                <div>
                  {/**
                   *  API 수정중
                   *  이후적용
                   */}
                </div>
              </div>
              <div className="flex-1">
                <EmergencyCenterIllnessStatusCard
                  departemnts={departments || []}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
