"use client";
import { Input } from "@/components/elements/Input";
import { PageHeader } from "@/components/elements/PageHeader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { CompanyDetailReturn } from "@/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const companyInfoSchema = z.object({
  company_name: z.string().min(2, {
    message: "2글자 이상 입력해주세요",
  }),
  region: z.object({
    region_name: z.string(),
    region_code: z.string(),
  }),
  phone_number: z.string(),
  admin_name: z.string(),
});

interface CompnayInfoformProps {
  companyDetail: CompanyDetailReturn;
}

export const CompanyInfoForm = ({ companyDetail }: CompnayInfoformProps) => {
  const form = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      company_name: companyDetail.ambulance_company_name,
      region: {
        region_name: companyDetail.ambulance_company_address ?? "",
        region_code: companyDetail.ambulance_company_area,
      },
      phone_number: companyDetail.ambulance_company_phone,
      admin_name: "TODO",
    },
  });
  function onSubmit(values: z.infer<typeof companyInfoSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [editMode, setEditMode] = useState<boolean>(false);
  const clickEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-controls="company_form"
          id="company_form"
        >
          <div className="fontSize-medium flex flex-col gap-[3rem] pr-[6.4rem] text-main">
            <PageHeader title="기본정보" fontSize="regular" color="grey">
              <div>
                <button
                  className="fontSize-small rounded-lg border-[0.1rem] border-main px-[0.8rem] py-[0.2rem] text-main"
                  onClick={clickEdit}
                >
                  수정하기
                </button>
              </div>
            </PageHeader>
            <FormField
              name="company_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel htmlFor="company_name" className="w-[10rem]">
                    <span className="fontSize-large">기관명</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      id="company_name"
                      aria-describedby="dis"
                      readOnly={!editMode}
                      className="focus:placeholder-grey"
                      border={editMode ? "normal" : "none"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-[2rem]">
              <FormField
                name="region.region_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel htmlFor="region_name" className="w-[10rem]">
                      <span className="fontSize-large">지역</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="서울시"
                        {...field}
                        id="region_name"
                        aria-describedby="dis"
                        width="w-[20rem]"
                        readOnly={!editMode}
                        className="focus:placeholder-grey"
                        border={editMode ? "normal" : "none"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="region.region_code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center gap-[2rem]">
                    <FormLabel
                      htmlFor="region_code"
                      className="hidden"
                    ></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="서울시"
                        {...field}
                        id="region_code"
                        aria-describedby="dis"
                        readOnly={!editMode}
                        className="focus:placeholder-grey"
                        border={editMode ? "normal" : "none"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="companu_phone_number"
                    className="w-[10rem]"
                  >
                    <span className="fontSize-large">전화번호</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="전화번호를 입력하세요"
                      {...field}
                      id="companu_phone_number"
                      aria-describedby="dis"
                      readOnly={!editMode}
                      className="focus:placeholder-grey"
                      border={editMode ? "normal" : "none"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="admin_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel htmlFor="company_admin_name" className="w-[10rem]">
                    <span className="fontSize-large">관리자</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      id="company_admin_name"
                      aria-describedby="dis"
                      readOnly={!editMode}
                      className="focus:placeholder-grey"
                      border={editMode ? "normal" : "none"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div>
            <button
              type="submit"
              className="float-right mt-[5rem] rounded-lg bg-main px-[4rem] py-[1.2rem] text-white"
            >
              저장하기
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};
