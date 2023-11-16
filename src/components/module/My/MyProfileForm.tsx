"use client";
import { Input } from "@/components/elements/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Company } from "@/types/model";
import { Employee, EmployeeRoleLabel } from "@/types/model/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface MyProfileFormProps {
  formId: string;

  user: Employee;
  company: Pick<Company, "ambulance_company_name">;
  onSubmit?: () => void;
}

const myProfileSchema = z.object({
  img: z.string(),
  name: z.string().min(2, {
    message: "2글자 이상 입력해주세요",
  }),
  role: z.string(),
  ambulance_company_name: z.string(),
  id_card: z.string(),
});

export const MyProfileForm = ({
  formId,
  user,
  company,
  onSubmit,
}: MyProfileFormProps) => {
  const form = useForm<z.infer<typeof myProfileSchema>>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
      img: "TODO",
      name: user.employee_name,
      role: EmployeeRoleLabel[user.role],
      ambulance_company_name: company.ambulance_company_name,
      id_card: user.id_card,
    },
  });

  return (
    <div className="flex flex-col gap-[2rem]">
      <Form {...form}>
        <form id={formId} aria-controls="my-profile-form" onSubmit={onSubmit}>
          <div className="flex justify-center gap-[2rem]">
            <div className="grid min-h-[43.7rem] w-[63rem] min-w-[63rem] grid-cols-9 grid-rows-6">
              <FormField
                name="img"
                control={form.control}
                render={() => (
                  <FormItem className="relative col-span-3 row-span-3 m-auto flex h-full w-full items-center ">
                    <FormLabel
                      htmlFor="img"
                      className="flex h-[17rem] w-[17rem]  items-center justify-center rounded-full bg-lgrey text-center"
                    />
                    {
                      //TODO: 이미지 업로드 기능 추가
                    }
                    {/* <FormControl className=" hidden  flex-1">
                      <Input
                        type="file"
                        {...field}
                        id="img"
                        readOnly
                        bgColor="transparent"
                      />
                    </FormControl> */}
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-5 col-start-5 row-start-2">
                    <div className="flex h-full w-full items-center justify-center gap-[3rem]">
                      <FormLabel className="min-w-[7rem] ">
                        <span className="fontSize-medium">이름</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          readOnly
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="role"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-5 col-start-5 row-start-3">
                    <div className="flex h-full w-full items-center justify-center gap-[3rem]">
                      <FormLabel className="min-w-[7rem]">
                        <span className="fontSize-medium">역할</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} id="" readOnly className="flex-1" />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="ambulance_company_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <div className="flex h-full w-full items-center justify-center gap-[5rem]">
                      <FormLabel
                        className="min-w-[5rem]"
                        htmlFor="ambulance_company_name"
                      >
                        <span className="fontSize-medium">기관명</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="ambulance_company_name"
                          readOnly
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="id_card"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <div className="flex h-full w-full items-center justify-center gap-[5rem]">
                      <FormLabel className="min-w-[5rem]">
                        <span className="fontSize-medium">ID</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="name"
                          readOnly
                          className="flex-1"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <div className="col-span-2 col-start-8  flex w-full flex-col justify-end">
                <button
                  className="fontSize-small fontSize-medium flex w-full items-center justify-end rounded-lg text-right text-main"
                  form={formId}
                >
                  <span className="fontSize-regular">비밀번호 변경</span>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
