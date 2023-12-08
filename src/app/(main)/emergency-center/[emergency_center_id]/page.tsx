import { TabWrapper } from "@/components/layout/TabWrapper";
import { EmergencyCenterDetailPrototype } from "@/components/prototypes/EmergencyCenter/Detail";
import { API_SERVER } from "@/constant";
import {
  GetEmergencyCenterDetailFailureResponse,
  GetEmergencyCenterDetailSuccessResponse,
} from "@/types/model/emergencyCenter";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Params {
  emergency_center_id: string;
}

export default async function Page({ params }: { params: Params }) {
  const { emergency_center_id } = params;
  const data:
    | GetEmergencyCenterDetailSuccessResponse
    | GetEmergencyCenterDetailFailureResponse = await fetch(
    `${API_SERVER}/er/emergency-centers/${emergency_center_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: {
        revalidate: 10,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res);
  if (!data.is_success) return <></>;
  const { result: emergencyCenter } = data;
  return (
    <TabWrapper
      contents={[
        {
          title: "주변 응급실 찾기",
          content: data.is_success ? (
            <EmergencyCenterDetailPrototype
              emergencyCenter={emergencyCenter}
              emergencyRooms={emergencyCenter.emergency_rooms}
              departments={emergencyCenter.hospital.hospital_departments.map(
                (hospitalDepartment) => hospitalDepartment.department
              )}
            />
          ) : (
            <div className=" w-full p-[2.4rem]">
              <Link
                href={"/emergency-center"}
                className="flex items-center text-lgrey"
              >
                <ChevronLeft />
                <span className="fontSize-small-l">주변 응급실 찾기</span>
              </Link>

              <div className="flex flex-col items-center justify-center"></div>
            </div>
          ),
        },
      ]}
    />
  );
}
