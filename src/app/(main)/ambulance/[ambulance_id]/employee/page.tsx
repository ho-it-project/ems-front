import { TabWrapper } from "@/components/layout/TabWrapper";
import { AmbulanceEmployeePrototype } from "@/components/prototypes/Ambulance/Employee";

type Params = {
  ambulance_id: string;
};

export default async function Page({ params }: { params: Params }) {
  const { ambulance_id } = params;
  return (
    <TabWrapper
      contents={[
        {
          title: "팀원 배치하기",
          content: <AmbulanceEmployeePrototype ambulance_id={ambulance_id} />,
        },
      ]}
    />
  );
}
