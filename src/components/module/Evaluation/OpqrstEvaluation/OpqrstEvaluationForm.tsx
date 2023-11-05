"use client";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  function onSubmit(values: z.infer<typeof opqrstEvaluationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // 로직 작성 필요
  }
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
