"use client";
import { Form, FormField } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/hooks/api/usePatient";
import { useEvaluationStep } from "@/hooks/useEvaluationStep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  EvaluationQuestionTypeDate,
  EvaluationQuestionTypeInput,
  EvaluationQuestionTypeSlider,
  EvaluationQuestionTypeTime,
  Question,
} from "./Question";
const evaluationQuestionInputList: EvaluationQuestionTypeInput[] = [
  {
    key: "onset",
    type: "input",
    title: "Onset",
    description: "증상발현 시 한 행동",
  },
  {
    key: "provoke",
    type: "input",
    title: "Provoke",
    description: "증상을 악화/완화 시키는 외부요인",
  },
  {
    key: "quality",
    type: "input",
    title: "Quality",
    description: "어떻게 아픈지",
  },
  {
    key: "radiation",
    type: "input",
    title: "Radiation",
    description: "아픈 부위가 어디인지",
  },
];
const sliderQuestions: EvaluationQuestionTypeSlider[] = [
  {
    key: "severity",
    type: "slider",
    title: "Severity",
    description: "얼마나 아픈지",
    sliderOptions: {
      minValue: 0,
      maxValue: 10,
      step: 1,
    },
  },
];

const dateQuestion: EvaluationQuestionTypeDate[] = [
  {
    key: "date",
    type: "calendar",
    title: "time",
    description: "시간에 따라 아픈 정도 (지속시간, 변화 등)",
  },
];

const timeQuestion: EvaluationQuestionTypeTime[] = [
  {
    key: "hour",
    type: "picker",
    unit: "시",
    max: 23,
    min: 0,
  },
  {
    key: "minute",
    type: "picker",
    unit: "분",
    max: 59,
    min: 0,
  },
];

const opqrstEvaluationSchema = z.object({
  onset: z.string(),
  provoke: z.string(),
  quality: z.string(),
  radiation: z.string(),
  severity: z.string(),
  date: z.date(),
  hour: z.number().max(24),
  minute: z.number().max(60),
});
interface OpqrstEvaluationFormProps {
  formId: string;
}

export const OpqrstEvaluationForm = ({ formId }: OpqrstEvaluationFormProps) => {
  const { toast } = useToast();
  const { patient } = usePatient();
  const router = useRouter();

  const { nextPage, steps } = useEvaluationStep();

  const form = useForm<z.infer<typeof opqrstEvaluationSchema>>({
    resolver: zodResolver(opqrstEvaluationSchema),
    defaultValues: {
      onset: "",
      provoke: "",
      quality: "",
      radiation: "",
      severity: "0",
      date: new Date(),
      hour: 0,
      minute: 0,
    },
  });
  const onSubmit = async () => {
    const opqrstEvaluation = form.getValues();
    const { onset, provoke, quality, radiation, severity, date, hour, minute } =
      opqrstEvaluation;

    if (onset.length === 0) {
      toast({ description: "Onset을 입력해주세요" });
      return;
    }
    if (provoke.length === 0) {
      toast({ description: "Provoke를 입력해주세요" });
      return;
    }
    if (quality.length === 0) {
      toast({ description: "Quality를 입력해주세요" });
      return;
    }
    if (radiation.length === 0) {
      toast({ description: "Radiation을 입력해주세요" });
      return;
    }
    if (date === null) {
      toast({ description: "시간을 입력해주세요" });
      return;
    }

    const body = JSON.stringify({
      onset,
      provocation: provoke,
      quality,
      radiation,
      severity: Number(severity),
      time: new Date(
        `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${hour}:${minute}`
      ).toISOString(),
    });
    console.log(body);
    if (!patient) return;
    fetch(`/api/ems/patients/${patient.patient_id}/opqrst`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => res.json())
      .then((res: { is_success: boolean }) => {
        if (res.is_success) {
          if (steps.length) {
            toast({ description: "OPQRST 평가가 완료되었습니다." });
            nextPage();
            return;
          }
          router.push("/request");
          return;
        }

        toast({ description: "OPQRST 평가에 실패하였습니다." });
      });
    // 로직 작성 필요
  };

  useEffect(() => {
    if (patient && !patient.patient_id) {
      router.push("/patient/rapid-evaluation");
    }
  }, [patient, router]);

  return (
    <div className="w-full max-w-[63.4rem]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-controls="opqrst_evaluation_form"
          id={formId}
          className="flex flex-col gap-[2rem]"
        >
          {evaluationQuestionInputList.map((question, index) => {
            return (
              <FormField
                key={index}
                name={question.key}
                control={form.control}
                render={({ field }) => (
                  <Question field={field} question={question} />
                )}
              />
            );
          })}
          {sliderQuestions.map((question, index) => {
            return (
              <FormField
                key={index}
                name={question.key}
                control={form.control}
                render={({ field }) => (
                  <Question field={field} question={question} />
                )}
              />
            );
          })}
          <div className="flex w-full gap-[1.8rem]">
            {dateQuestion.map((question, index) => {
              return (
                <FormField
                  key={index}
                  name={question.key}
                  control={form.control}
                  render={({ field }) => (
                    <Question field={field} question={question} />
                  )}
                />
              );
            })}
            {timeQuestion.map((question, index) => {
              return (
                <FormField
                  name={question.key}
                  key={index}
                  control={form.control}
                  render={({ field }) => (
                    <Question field={field} question={question} />
                  )}
                />
              );
            })}
          </div>
        </form>
      </Form>
    </div>
  );
};
