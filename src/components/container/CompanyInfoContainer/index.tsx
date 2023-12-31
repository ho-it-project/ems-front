"use client";
import Spinner from "@/components/Spinner";
import { PageHeader } from "@/components/elements/PageHeader";
import { CompanyInfoForm } from "@/components/module/CompanyInfo/CompanyInfoForm";
import { CompanyStatusCard } from "@/components/module/CompanyInfo/CompanyStatusCard";
import { useToast } from "@/components/ui/use-toast";
import { useCompanyDetailQuery } from "@/hooks/api";
import _ from "lodash";
import { useEffect } from "react";

export const CompanyInfoContainer = () => {
  const { data, error } = useCompanyDetailQuery();
  const { toast } = useToast();

  useEffect(() => {
    if (error?.adminErr || error?.detailErr) {
      toast({ description: error.detailErr?.message });
    }
  }, [error, toast]);
  if (error)
    return (
      <>
        <Spinner />;
      </>
    );

  return (
    <div className={"flex h-full w-full max-w-[75rem] flex-col "}>
      <PageHeader title="회사 정보" fontSize="xlarge" />
      {data && (
        <>
          <div className="mt-[2.4rem] flex justify-between gap-[2rem]">
            <CompanyStatusCard
              title="차량/팀"
              status={data.ambulance_count}
              link="/ambulance"
            />
            <CompanyStatusCard
              title="직원"
              status={data.employee_count}
              link="/employee"
            />
            <CompanyStatusCard
              title="출동"
              status={data.completed_request_count}
            />
          </div>
          <div className="mt-[5rem]">
            <CompanyInfoForm
              companyDetail={_.pick(data, [
                "ambulance_company_name",
                "ambulance_company_address",
                "ambulance_company_area",
                "ambulance_company_phone",
                "admin_name",
              ])}
            />
          </div>
        </>
      )}
    </div>
  );
};
