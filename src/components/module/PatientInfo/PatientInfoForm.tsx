"use client";
import { Input } from "@/components/elements/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useEvaluationStep } from "@/hooks/useEvaluationStep";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { cn } from "@/lib/utils";
import { useEveluationStepStore } from "@/store/evaluationStep.store";
import { usePatientStore } from "@/store/patient.store";
import {
  CreatePatientErrorResponse,
  CreatePatientResponse,
} from "@/types/api/patient";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { useForm } from "react-hook-form";
import * as z from "zod";

const patientInfoSchema = z.object({
  patient_id: z.string(),
  patient_latitude: z.number(),
  patient_longitude: z.number(),
  patient_severity: z.enum(["SEVERE", "MILD", "NONE", "UNKNOWN"]),
  patient_name: z.string(),
  patient_gender: z.enum(["MALE", "FEMALE", "UNKNOWN"]).default("UNKNOWN"),
  patient_birth: z.string().default(""),
  patient_identity_number: z.string().default("00000"),
  patient_phone: z.string(),
  patient_address: z.string(),
  patient_emergency_cause: z
    .enum([
      "TRAFFIC_ACCIDENT",
      "FIRE",
      "CRIMINAL",
      "DISASTER",
      "DISEASE",
      "OTHER",
      "UNKNOWN",
    ])
    .default("OTHER"),
});

interface PatientInfoFormProps {
  changeForm?: () => void;
}

export const PatientInfoForm = ({ changeForm }: PatientInfoFormProps) => {
  const { toast } = useToast();
  const location = useGeoLocation();
  const { rapidEvaluation, check } = useEveluationStepStore();
  const [patient_latitude, patient_longitude] = location ?? [0, 0];
  const { guardian } = useEveluationStepStore();
  const { nextPage } = useEvaluationStep();
  const { setPatient } = usePatientStore();
  const form = useForm<z.infer<typeof patientInfoSchema>>({
    resolver: zodResolver(patientInfoSchema),
    defaultValues: {
      patient_id: "",
      patient_latitude: 0,
      patient_longitude: 0,
      patient_name: "",
      patient_gender: "UNKNOWN",
      patient_address: "",
      patient_phone: "",
      patient_identity_number: "",
      patient_birth: "",
      patient_emergency_cause: "UNKNOWN",
      patient_severity: "UNKNOWN",
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    form.setValue("patient_latitude", patient_latitude);
    form.setValue("patient_longitude", patient_longitude);
    form.setValue("patient_severity", "UNKNOWN");
    const patient_info = form.getValues();
    const {
      patient_name,
      patient_address,
      patient_birth,
      patient_emergency_cause,
      patient_gender,
      patient_identity_number,
      patient_severity,
      patient_phone,
    } = patient_info;
    if (patient_name === "") {
      toast({ description: "이름을 입력해주세요." });
      return;
    }
    if (patient_name.length < 2) {
      toast({ description: "이름을 정확히 입력해주세요" });
      return;
    }
    if (!!patient_name.match(/^[가-힣]+$/) === false) {
      toast({ description: "이름을 정확히 입력해주세요." });
      return;
    }
    if (patient_gender === "UNKNOWN") {
      toast({ description: "성별을 선택해주세요." });
      return;
    }
    if (patient_birth === "" && patient_identity_number === "") {
      toast({
        description:
          "주민등록번호를 입력해주세요.(알 수 없는경우 000000-0000000 입력)",
      });
      return;
    }
    if (patient_birth.length < 6) {
      toast({ description: "주민등록번호를 정확히 입력해주세요." });
      return;
    }
    if (patient_identity_number.length < 7) {
      toast({ description: "주민등록번호를 정확히 입력해주세요." });
      return;
    }
    if (patient_phone === "") {
      toast({ description: "연락처를 입력해주세요." });
      return;
    }
    if (patient_phone.length < 13) {
      toast({ description: "연락처를 정확히 입력해주세요." });
      return;
    }
    if (patient_address === "") {
      toast({ description: "주소를 입력해주세요." });
      return;
    }

    if (patient_emergency_cause === "UNKNOWN") {
      toast({ description: "발생원인을 선택해주세요." });
      return;
    }
    const rapid = check && {
      trauma: rapidEvaluation.trauma ? "TRUE" : "FALSE",
      clear: rapidEvaluation.clear ? "TRUE" : "FALSE",
      conscious: rapidEvaluation.conscious ? "TRUE" : "FALSE",
    };
    const body = {
      ..._.omit(patient_info, ["patient_id"]),
      patient_phone: patient_phone.replace(/-/g, ""),
      patient_birth:
        patient_identity_number[0] === "1" || patient_identity_number[0] === "2"
          ? "19" + patient_birth
          : "20" + patient_birth,
      rapid_evaluation: rapid ? rapid : undefined,
    };
    if (guardian) {
      setPatient({
        ...body,
        patient_id: "",
        patient_gender: patient_gender,
        patient_severity: patient_severity,
        patient_emergency_cause: patient_emergency_cause,
      });
      changeForm && changeForm();
      return;
    }
    fetch("/api/ems/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json: CreatePatientResponse | CreatePatientErrorResponse) => {
        if (json.is_success) {
          setPatient({
            ...body,
            patient_id: json.result.patient_id,
            patient_gender: patient_gender,
            patient_severity: patient_severity,
            patient_emergency_cause: patient_emergency_cause,
          });
          toast({ description: "환자 정보가 등록되었습니다." });
          nextPage();
          return;
        }
        toast({ description: "환자 정보 등록에 실패하였습니다." });
      });
  };

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
          className="flex flex-col gap-[3rem] "
        >
          <div className="fontSize-medium flex flex-col gap-[3rem]  px-[2.5rem] text-black">
            <FormField
              name="patient_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="patient_name"
                    className="min-w-[10rem] text-main"
                  >
                    <span className="fontSize-medium">이름</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="익명"
                      {...field}
                      id="patient_name"
                      className="placeholder-lgrey"
                      border={"none"}
                      rounded="normal"
                      bgColor="bg"
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
                <FormItem className="flex items-center gap-[2rem] text-main">
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
              <FormLabel
                htmlFor="patient_birth"
                className="min-w-[10rem] text-main"
              >
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
                          className="placeholder-lgrey "
                          width="w-[20rem]"
                          border={"none"}
                          bgColor="bg"
                          rounded="normal"
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
                          rounded="normal"
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
                    className="min-w-[10rem] text-main"
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
                  <FormLabel
                    htmlFor="patient_phone"
                    className="min-w-[10rem] text-main"
                  >
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
                      rounded="normal"
                      onChange={onChangePhone}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="patient_emergency_cause"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="patient_phone"
                    className="min-w-[10rem] text-main"
                  >
                    <span className="fontSize-medium">응급사유</span>
                  </FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="h-[4rem] w-full rounded-lg bg-bg text-center"
                    >
                      <option value="UNKNOWN">선택</option>
                      <option value="TRAFFIC_ACCIDENT">교통사고</option>
                      <option value="FIRE">화재</option>
                      <option value="CRIMINAL">범죄</option>
                      <option value="DISASTER">재난</option>
                      <option value="DISEASE">질병</option>
                      <option value="OTHER">기타</option>
                    </select>
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
