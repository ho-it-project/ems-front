import { TabWrapper } from "@/components/layout/TabWrapper";
import { RequestInfoPrototype } from "@/components/prototypes/RequestInfo";

export default function Page() {
  return (
    <TabWrapper
      contents={[
        {
          title: "수용 요청 확인하기",
          content: <RequestInfoPrototype />,
        },
      ]}
    />
  );
}
