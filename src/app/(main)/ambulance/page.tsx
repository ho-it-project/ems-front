import { TabWrapper } from "@/components/layout/TabWrapper";
import { AmbulancePrototype } from "@/components/prototypes/Ambulance";

export default function Home() {
  return (
    <TabWrapper
      contents={[
        { title: "차량/팀관리", content: <AmbulancePrototype /> },
        {
          title: "test",
          content: <div />,
        },
      ]}
    />
  );
}
