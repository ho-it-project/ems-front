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
const guardianSchema = z.object({
  guardian_name: z.string(),
  guardian_phone: z.string(),
  guardian_address: z.string(),
  guardian_relation: z.enum([
    "OTHER",
    "PARENT",
    "SPOUSE",
    "CHILD",
    "SIBLING",
    "FRIEND",
    "UNKNOWN",
  ]),
});

export const GuardianInfoForm = () => {
  const { toast } = useToast();
  const { nextPage } = useEvaluationStep();
  const { rapidEvaluation, check } = useEveluationStepStore();
  const { patient, setGuardian, setPatient } = usePatientStore();
  const form = useForm<z.infer<typeof guardianSchema>>({
    resolver: zodResolver(guardianSchema),
    defaultValues: {
      guardian_name: "",
      guardian_phone: "",
      guardian_address: "",
      guardian_relation: "UNKNOWN",
    },
  });

  function onSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    const guardian_info = form.getValues();
    const {
      guardian_name,
      guardian_address,
      guardian_phone,
      guardian_relation,
    } = guardian_info;
    if (guardian_name === "") {
      toast({ description: "이름을 입력해주세요." });
      return;
    }
    if (guardian_name.length < 2) {
      toast({ description: "이름을 정확히 입력해주세요" });
      return;
    }
    if (!!guardian_name.match(/^[가-힣]+$/) === false) {
      toast({ description: "이름을 정확히 입력해주세요." });
      return;
    }
    if (guardian_phone === "") {
      toast({ description: "연락처를 입력해주세요." });
      return;
    }
    if (guardian_phone.length < 13) {
      toast({ description: "연락처를 정확히 입력해주세요." });
      return;
    }
    if (guardian_address === "") {
      toast({ description: "주소를 입력해주세요." });
      return;
    }

    if (guardian_relation === "UNKNOWN") {
      toast({ description: "환자와의 관계를 선택해주세요." });
      return;
    }

    const { trauma, clear, conscious } = rapidEvaluation;
    const rapid_evaluation = {
      trauma: trauma ? "TRUE" : "FALSE",
      clear: clear ? "TRUE" : "FALSE",
      conscious: conscious ? "TRUE" : "FALSE",
    };

    const body = {
      ..._.omit(patient, ["patient_id"]),
      patient_guardian: {
        ...guardian_info,
        guardian_relation,
      },
      rapid_evaluation: check ? rapid_evaluation : undefined,
    };
    fetch("/api/ems/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res: CreatePatientResponse | CreatePatientErrorResponse) => {
        if (res.is_success && patient) {
          const { patient_id } = res.result;
          setPatient({
            ...patient,
            patient_id,
          });
          setGuardian({
            ...guardian_info,
            guardian_relation,
          });
          toast({ description: "환자 정보가 등록되었습니다." });
          nextPage();
          return;
        }
        toast({ description: "환자 정보 등록에 실패했습니다." });
      });
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const name = e.target.value.replace(/[^가-힣ㄱ-ㅎ]/g, "");  /// 한글이름만 받기 위한 정규식 (이름이 한글이 아닐 경우 입력이 안됨)
    const name = e.target.value;
    if (name.length <= 5) form.setValue("guardian_name", name);
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
    form.setValue("guardian_phone", formattedNumber);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          aria-controls="dkanr"
          id="guardian_info_form"
          className="flex flex-col gap-[3rem] "
        >
          <div className="fontSize-medium flex flex-col gap-[3rem]  px-[2.5rem] text-black">
            <FormField
              name="guardian_name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="guardian_name"
                    className="min-w-[10rem] text-main"
                  >
                    <span className="fontSize-medium">이름</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="익명"
                      {...field}
                      id="guardian_name"
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
              name="guardian_address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="guardian_address"
                    className="min-w-[10rem] text-main"
                  >
                    <span className="fontSize-medium">주소</span>
                  </FormLabel>
                  <FormControl>
                    <div className="w-full rounded-lg bg-bg p-[1.2rem] ">
                      <textarea
                        className="h-[7.4rem] w-full resize-none bg-transparent focus:outline-none"
                        {...field}
                        id="guardian_address"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="guardian_phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="guardian_phone"
                    className="min-w-[10rem] text-main"
                  >
                    <span className="fontSize-medium">연락처</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000-0000-0000"
                      {...field}
                      id="guardian_phone"
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
              name="guardian_relation"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-[2rem]">
                  <FormLabel
                    htmlFor="guardian_phone"
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
                      <option value="OTHER">기타</option>
                      <option value="PARENT">부모</option>
                      <option value="SPOUSE">배우자</option>
                      <option value="CHILD">자녀</option>
                      <option value="SIBLING">형제</option>
                      <option value="FRIEND">친구</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full">
              <button
                className="w-full rounded-lg bg-main py-[1rem] text-center text-white"
                form={"guardian_info_form"}
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
