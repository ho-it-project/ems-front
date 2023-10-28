import { PageHeader } from "@/components/elements/PageHeader";
import { CompanyStatusCard } from "@/components/module/CompanyInfo/CompanyStatusCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CompanyInfoContainer = () => {
  return (
    <div className="flex h-full w-full max-w-[75rem] flex-col">
      <PageHeader title="회사 정보" fontSize="xlarge">
        <div className="flex gap-[1.2rem]">
          <div className="h-[4rem] w-[5rem] bg-main" />
          <div className="h-[4rem] w-[12.8rem] bg-main" />
        </div>
      </PageHeader>

      {
        // 회사 상태 카드 정보
      }
      <div className="mt-[2.4rem] flex justify-center gap-[2rem]">
        <CompanyStatusCard title="차량/팀" status="42" />
        <CompanyStatusCard title="차량/팀" status="42" />
        <CompanyStatusCard title="차량/팀" status="42" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};
