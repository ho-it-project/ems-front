import { TabWrapper } from "@/components/layout/TabWrapper";
import { EmergencyCenterDetailPrototype } from "@/components/prototypes/EmergencyCenter/Detail";
import { GetEmergencyCenterDetailResponse } from "@/lib/type/emergencyCenter.type";

interface Params {
  emergency_center_id: string;
}

interface GetEmergencyCenterDetailResponseSuccessDto {
  result: GetEmergencyCenterDetailResponse;
  is_success: true;
  http_status_code: number;
}
interface GetEmergencyCenterDetailResponseFailDto {
  is_success: false;
  http_status_code: number;
}

export default async function Page({ params }: { params: Params }) {
  const { emergency_center_id } = params;
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
  const apiPrefix = process.env.NEXT_PUBLIC_API_PREFIX;
  const url = `${protocol}://api.${domain}/${apiPrefix}/`;
  const data:
    | GetEmergencyCenterDetailResponseSuccessDto
    | GetEmergencyCenterDetailResponseFailDto = await fetch(
    `${url}/er/emergency-centers/${emergency_center_id}`,
    {
      next: {
        revalidate: 10,
      },
    }
  ).then((res) => res.json());
  if (data.http_status_code === 404) return <div>404 NOT FOUND</div>;
  if (!data.is_success) return <div>ERROR</div>;

  return (
    <TabWrapper
      contents={[
        {
          title: "주변 응급실 찾기",
          content: (
            <EmergencyCenterDetailPrototype emergency_center={data.result} />
          ),
        },
      ]}
    />
  );
}
