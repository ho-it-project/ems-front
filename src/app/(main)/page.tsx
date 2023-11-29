import { CompanyInfo } from "@/components/prototypes/CompanyInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사정보",
};

export default function Home() {
  return <CompanyInfo />;
}
