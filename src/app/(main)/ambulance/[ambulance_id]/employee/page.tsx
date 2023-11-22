import { TabWrapper } from "@/components/layout/TabWrapper";

type Params = {
  ambulance_id: string;
};

export default async function Page({ params }: { params: Params }) {
  const { ambulance_id } = params;
  ambulance_id;
  return <TabWrapper contents={[{ title: "팀원 배치하기", content: "" }]} />;
}
