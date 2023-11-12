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
import { useGeoLocation } from "@/lib/hook/useGeoLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const patientInfoSchema = z.object({
  patient_name: z.string().default("익명"),
  patient_gender: z.string(),
  patient_birth: z.string().default("000000"),
  patient_identity_number: z.string().default("0000000"),
  patient_phone: z.string().default("00000000000"),
  patient_address: z.string().default(""),
  patient_latitude: z.number().default(0),
  patient_longitude: z.number().default(0),
  patient_severity: z.string().default("UNKNOWN"),
});

export const PatientInfoForm = () => {
  const location = useGeoLocation();
  const [patient_latitude, patient_longitude] = location ?? [0, 0];

  const form = useForm<z.infer<typeof patientInfoSchema>>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: {
      patient_latitude,
      patient_longitude,
      patient_severity: "UNKNOWN",
    },
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
                      placeholder="익명"
                      {...field}
                      id="patient_name"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                      defaultValue={"익명"}
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
                    {/* <Input
                      placeholder="성별"
                      {...field}
                      id="patient_gender"
                      aria-describedby="dis"
                      className="focus:placeholder-grey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                    /> */}
                    <select
                      {...field}
                      id="patient_gender"
                      defaultValue={"UNKNOWN"}
                      className="w-full bg-transparent text-center focus:text-center focus:outline-none"
                    >
                      <option value={"UNKNOWN"}>성별</option>
                      <option value={"MALE"}>남자</option>
                      <option value={"FEMALE"}>여자</option>
                    </select>
                  </FormControl>
                  <FormDescription id="dis" className="hidden" />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-[2rem] ">
              <FormLabel htmlFor="patient_birth" className="min-w-[10rem]">
                <span className="fontSize-medium">주민등록번호</span>
              </FormLabel>
              <div className="flex w-full items-center justify-between">
                <FormField
                  name="patient_birth"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex max-w-[12rem] items-center">
                      <FormControl>
                        <Input
                          placeholder="000000"
                          {...field}
                          id="patient_birth"
                          aria-describedby="dis"
                          width="w-[20rem]"
                          className="focus:placeholder-grey"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                          defaultValue={"000000"}
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
                          placeholder="0000000"
                          {...field}
                          id="patient_identity_number"
                          aria-describedby="dis"
                          width="w-[20rem]"
                          className="focus:placeholder-grey"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                          defaultValue={"0000000"}
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
