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
import { useToast } from "@/components/ui/use-toast";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const patientInfoSchema = z.object({
  patient_latitude: z.number(),
  patient_longitude: z.number(),
  patient_severity: z.string(),
  patient_name: z.string(),
  patient_gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
  patient_birth: z.string().default(""),
  patient_identity_number: z.string().default("00000"),
  patient_phone: z.string(),
  patient_address: z.string(),
});

export const PatientInfoForm = () => {
  const { toast } = useToast();
  const location = useGeoLocation();
  const [patient_latitude, patient_longitude] = location ?? [0, 0];

  const form = useForm<z.infer<typeof patientInfoSchema>>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: {
      patient_latitude: 0,
      patient_longitude: 0,
      patient_name: "",
      patient_gender: "UNKNOWN",
      patient_address: "",
      patient_phone: "",
      patient_identity_number: "",
      patient_birth: "",
    },
  });
  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    form.setValue("patient_latitude", patient_latitude);
    form.setValue("patient_longitude", patient_longitude);
    form.setValue("patient_severity", "NORMAL");
    if (form.getValues().patient_name === "") {
      toast({ description: "이름을 입력해주세요." });
      return;
    }
    if (form.getValues().patient_name.length < 2) {
      toast({ description: "이름을 정확히 입력해주세요" });
      return;
    }
    if (!!form.getValues().patient_name.match(/^[가-힣]+$/) === false) {
      toast({ description: "이름을 정확히 입력해주세요." });
      return;
    }
    if (
      form.getValues().patient_birth === "" &&
      form.getValues().patient_identity_number === ""
    ) {
      toast({
        description:
          "주민등록번호를 입력해주세요.(알 수 없는경우 000000-0000000 입력)",
      });
      return;
    }

    if (form.getValues().patient_phone === "") {
      toast({ description: "연락처를 입력해주세요." });
      return;
    }
    if (form.getValues().patient_address === "") {
      toast({ description: "주소를 입력해주세요." });
      return;
    }

    toast({ description: "환자 정보가 등록되었습니다." });
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name = e.target.value.replace(/[^가-힣ㄱ-ㅎ]/g, "");  /// 한글이름만 받기 위한 정규식 (이름이 한글이 아닐 경우 입력이 안됨)
    const name = e.target.value;
    if (name.length <= 5) form.setValue("patient_name", name);
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbers = e.target.value.replace(/[^0-9]/g, "");
    let formattedNumber = "";
    if (numbers.length <= 3) {
      formattedNumber = numbers;
    } else if (numbers.length <= 7) {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(
        3,
        7
      )}-${numbers.slice(7, 11)}`;
    }
    form.setValue("patient_phone", formattedNumber);
  };
  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birth = e.target.value.replace(/[^0-9]/g, "");
    if (birth.length <= 6) {
      form.setValue("patient_birth", birth);
    }
  };
  const onChangeIdentityNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const identityNumber = e.target.value.replace(/[^0-9]/g, "");
    if (identityNumber.length <= 7) {
      form.setValue("patient_identity_number", identityNumber);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          aria-controls="dkanr"
          id="patient_info_form"
          className="flex flex-col gap-[3rem]"
        >
          <PageHeader title={"광진소방서"} fontSize="medium" color="black" />
          <div className="fontSize-medium flex flex-col gap-[3rem]  px-[2.5rem] text-black">
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
                      className="placeholder-lgrey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                      onChange={onChangeName}
                    />
                  </FormControl>
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
                    <div className="flex w-full">
                      <button
                        className={cn(
                          "flex-1 rounded-l-lg  border-r border-white bg-bg py-[1rem] text-lgrey",
                          field.value === "MALE" ? "bg-main text-white" : ""
                        )}
                        onClick={() => {
                          form.setValue("patient_gender", "MALE");
                        }}
                        type="button"
                      >
                        남자
                      </button>
                      <button
                        className={cn(
                          "flex-1 rounded-r-lg border-l border-white bg-bg py-[1rem] text-lgrey",
                          field.value === "FEMALE" ? "bg-main text-white" : ""
                        )}
                        onClick={() => {
                          form.setValue("patient_gender", "FEMALE");
                        }}
                        type="button"
                      >
                        여자
                      </button>
                    </div>
                  </FormControl>
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
                          className="placeholder-lgrey"
                          width="w-[20rem]"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                          onChange={onChangeBirth}
                        />
                      </FormControl>
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
                          width="w-[20rem]"
                          className="placeholder-lgrey"
                          border={"none"}
                          bgColor="bg"
                          rounded="large"
                          onChange={onChangeIdentityNumber}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                    <div className="w-full rounded-lg bg-bg p-[1.2rem] ">
                      <textarea
                        className="h-[7.4rem] w-full resize-none bg-transparent focus:outline-none"
                        {...field}
                        id="patient_address"
                      />
                    </div>
                  </FormControl>
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
                      placeholder="000-0000-0000"
                      {...field}
                      id="patient_phone"
                      className="placeholder-lgrey"
                      border={"none"}
                      bgColor="bg"
                      rounded="large"
                      onChange={onChangePhone}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full">
              <button
                className="w-full rounded-lg bg-main py-[1rem] text-center text-white"
                form={"patient_info_form"}
                type="submit"
              >
                개인정보 이용 및 수집동의
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
