import { TabWrapper } from "@/components/layout/TabWrapper";
import { AmbulanceDriverPrototype } from "@/components/prototypes/Ambulance/Driver";

type Params = {
  ambulance_id: string;
};

export default function Page({ params }: { params: Params }) {
  const { ambulance_id } = params;
  return (
    <TabWrapper
      contents={[
        {
          title: "담당기사 배치하기",
          content: <AmbulanceDriverPrototype ambulance_id={ambulance_id} />,
        },
      ]}
    />
  );
}
