"use client";
import { Input } from "@/components/elements/Input";
import { PageHeader } from "@/components/elements/PageHeader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const patientInfoSchema = z.object({
  patient_name: z.string().default("알수없음"),
  patient_gender: z.string(),
  patient_birth: z.string().default(""),
  patient_identity_number: z.string().default(""),
  patient_phone: z.string().default(""),
  patient_address: z.string().default(""),
});

export const PatientInfoForm = () => {
  const form = useForm<z.infer<typeof patientInfoSchema>>({
    resolver: zodResolver(patientInfoSchema),
  });
  function onSubmit(values: z.infer<typeof patientInfoSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-controls="dkanr"
          id="patient_info_form"
          className="flex flex-col gap-[3rem]"
        >
          <PageHeader title={"광진소방서"} fontSize="medium" color="black" />
          <div className="fontSize-medium flex flex-col gap-[1.2rem]  px-[2.5rem] text-black">
            <FormField
              name="patient_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel htmlFor="patient_name" className="min-w-[10rem]">
                    <span className="fontSize-medium">이름</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      id="patient_name"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                    />
                  </FormControl>
                  <FormDescription id="dis" className="hidden" />
                </FormItem>
              )}
            />

            <FormField
              name="patient_gender"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel htmlFor="patient_gender" className="min-w-[10rem]">
                    <span className="fontSize-medium">성별</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="전화번호를 입력하세요"
                      {...field}
                      id="patient_gender"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                    />
                  </FormControl>
                  <FormDescription id="dis" className="hidden" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-[2rem] ">
              <FormLabel htmlFor="patient_birth" className="min-w-[10rem]">
                <span className="fontSize-medium">주민등록번화</span>
              </FormLabel>
              <div className="flex w-full items-center justify-between">
                <FormField
                  name="patient_birth"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex max-w-[12rem] items-center">
                      <FormControl>
                        <Input
                          placeholder="서울시"
                          {...field}
                          id="patient_birth"
                          aria-describedby="dis"
                          width="w-[20rem]"
                          className="focus:placeholder-grey"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                        />
                      </FormControl>
                      <FormDescription id="dis" className="hidden" />
                    </FormItem>
                  )}
                />
                <span className="h-[0.2rem] w-[1.4rem] bg-black" />
                <FormField
                  name="patient_identity_number"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex max-w-[12rem] items-center">
                      <FormControl>
                        <Input
                          placeholder="서울시"
                          {...field}
                          id="patient_identity_number"
                          aria-describedby="dis"
                          width="w-[20rem]"
                          className="focus:placeholder-grey"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                        />
                      </FormControl>
                      <FormDescription id="dis" className="hidden" />
                    </FormItem>
                  )}
                />
                {/* <FormLabel
                  htmlFor="patient_birth"
                  className="h-[0.2rem] w-[1.4rem] bg-black"
                ></FormLabel>
                <FormField
                  name="patient_identity_number"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-[2rem]">
                      <FormControl>
                        <div className="w-[12rem] min-w-[12rem]">
                          <Input
                            placeholder="shadcn"
                            {...field}
                            id="patient_identity_number"
                            aria-describedby="dis"
                            className="focus:placeholder-grey"
                            border={"none"}
                            bgColor="bg"
                            rounded="large"
                          />
                        </div>
                      </FormControl>{" "}
                      <FormDescription id="dis" className="hidden" />
                    </FormItem>
                  )}
                /> */}
              </div>
            </div>

            <FormField
              name="patient_address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="patient_address"
                    className="min-w-[10rem]"
                  >
                    <span className="fontSize-medium">주소</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      id="patient_address"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                    />
                  </FormControl>
                  <FormDescription id="dis" className="hidden" />
                </FormItem>
              )}
            />
            <FormField
              name="patient_phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel htmlFor="patient_phone" className="min-w-[10rem]">
                    <span className="fontSize-medium">연락처</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      id="patient_phone"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                    />
                  </FormControl>
                  <FormDescription id="dis" className="hidden" />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
