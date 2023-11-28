import { TabWrapper } from "@/components/layout/TabWrapper";
import { EmployeePrototype } from "@/components/prototypes/Employee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "직원관리",
};

export default function Home() {
  return (
    <TabWrapper
      contents={[{ title: "직원관리", content: <EmployeePrototype /> }]}
    />
  );
}
