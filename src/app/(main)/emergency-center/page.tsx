import { TabWrapper } from "@/components/layout/TabWrapper";
import { EmergencyCenterPrototype } from "@/components/prototypes/EmergencyCenter";

export default function Home() {
  return (
    <TabWrapper
      contents={[
        { title: "주변 응급실 찾기", content: <EmergencyCenterPrototype /> },
      ]}
    />
  );
}
