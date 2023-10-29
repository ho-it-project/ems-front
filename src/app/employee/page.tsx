import { EmployeeContainer } from "@/components/container/EmployeeContainer";
import { TabWrapper } from "@/components/layout/TabWrapper";

export default function Home() {
  return (
    <TabWrapper
      contents={[
        { title: "직원관리", content: <EmployeeContainer /> },
        {
          title: "test",
          content: <div />,
        },
      ]}
    />
  );
}
