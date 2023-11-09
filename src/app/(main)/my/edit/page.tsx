import { TabWrapper } from "@/components/layout/TabWrapper";
import { MyEditPrototype } from "@/components/prototypes/My/MyEdit";

export default function Page() {
  return (
    <TabWrapper
      contents={[{ title: "비밀번호 변경", content: <MyEditPrototype /> }]}
    />
  );
}
