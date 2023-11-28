"use client";
import { PageHeader } from "@/components/elements/PageHeader";
import { CompanyInfoForm } from "@/components/module/CompanyInfo/CompanyInfoForm";
import { CompanyStatusCard } from "@/components/module/CompanyInfo/CompanyStatusCard";
import { useCompanyDetailQuery } from "@/hooks/api";
import _ from "lodash";

export const CompanyInfoContainer = () => {
  const { data, error } = useCompanyDetailQuery();

  if (error) return <>error: {JSON.stringify(error)}</>;
  // if (!data) return <>error: no data</>; //TODO: isloading개발하면서 수정.
  return (
    <div className={"flex h-full w-full max-w-[75rem] flex-col "}>
      <PageHeader title="회사 정보" fontSize="xlarge" />
      <div className="mt-[2.4rem] flex justify-between gap-[2rem]">
        <CompanyStatusCard title="차량/팀" status={data.ambulance_count} />
        <CompanyStatusCard title="직원" status={data.employee_count} />
        <CompanyStatusCard title="출동" status={data.completed_request_count} />
      </div>
      <div className="mt-[5rem]">
        {data && (
          <CompanyInfoForm
            companyDetail={_.pick(data, [
              "ambulance_company_name",
              "ambulance_company_address",
              "ambulance_company_area",
              "ambulance_company_phone",
              "admin_name",
            ])}
          />
        )}
      </div>
    </div>
  );
};
