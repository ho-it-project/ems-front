import { TabWrapper } from "@/components/layout/TabWrapper";
import { AmbulancePrototype } from "@/components/prototypes/Ambulance";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "차량/팀관리",
};

export default function Home() {
  return (
    <TabWrapper
      contents={[{ title: "차량/팀관리", content: <AmbulancePrototype /> }]}
    />
  );
}
