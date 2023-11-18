import { TabWrapper } from "@/components/layout/TabWrapper";
import { EmployeePrototype } from "@/components/prototypes/Employee";

export default function Home() {
  return (
    <TabWrapper
      contents={[{ title: "직원관리", content: <EmployeePrototype /> }]}
    />
  );
}
