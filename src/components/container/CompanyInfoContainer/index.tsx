"use client";
import { useCompanyDetailQuery } from "@/api";
import { PageHeader } from "@/components/elements/PageHeader";
import { CompanyInfoForm } from "@/components/module/CompanyInfo/CompanyInfoForm";
import { CompanyStatusCard } from "@/components/module/CompanyInfo/CompanyStatusCard";
import { cn } from "@/lib/utils";

export const CompanyInfoContainer = () => {
  const { data, error } = useCompanyDetailQuery();
  if (error) return <>error: {JSON.stringify(error)}</>;
  if (!data) return <>error: no data</>; //TODO: isloading개발하면서 수정.
  return (
    <div className={cn("flex h-full w-full max-w-[75rem] flex-col ")}>
      <PageHeader title="회사 정보" fontSize="xlarge">
        <div className="flex gap-[1.2rem]">
          <div className="h-[4rem] w-[5rem] bg-main" />
          <div className="h-[4rem] w-[12.8rem] bg-main" />
        </div>
      </PageHeader>
      <div className="mt-[2.4rem] flex justify-between gap-[2rem]">
        <CompanyStatusCard title="차량/팀" status="42" />
        <CompanyStatusCard title="차량/팀" status="42" />
        <CompanyStatusCard title="차량/팀" status="42" />
      </div>
      <div className="mt-[5rem]">
        <CompanyInfoForm companyDetail={data} />
      </div>
    </div>
  );
};
