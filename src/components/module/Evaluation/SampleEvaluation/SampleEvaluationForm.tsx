"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EvaluationQuestionType, Question } from "./Question";
const evaluationQuestionInputList: EvaluationQuestionType[] = [
  {
    key: "symptoms",
    type: "input",
    title: "Symptoms",
    description: "증상 및 징후",
  },
  {
    key: "allergies",
    type: "input",
    title: "Allergies",
    description: "증상을 악화/완화 시키는 외부요인",
  },
  {
    key: "medications",
    type: "input",
    title: "Medications",
    description: "약물/복용력",
  },
  {
    key: "pastHistory",
    type: "input",
    title: "Past Medical History",
    description: "과거 질병력",
  },
  {
    key: "lastOralIntake",
    type: "array",
    items: [
      {
        key: "lastOralIntake.date",
        type: "calendar",
        title: "Last Oral Intake",
        description: "마지막 경구 섭취",
      },
      {
        key: "lastOralIntake.hour",
        type: "picker",
        unit: "시",
        max: 23,
        min: 0,
      },
      {
        key: "lastOralIntake.minute",
        type: "picker",
        unit: "분",
        max: 59,
        min: 0,
      },
    ],
  },
  {
    key: "events",
    type: "input",
    title: "Events preceding the incident",
    description: "응급상황 발생 경위",
  },
];

const opqrstEvaluationSchema = z.object({
  symptoms: z.string(),
  allergies: z.string(),
  medications: z.string(),
  pastHistory: z.string(),
  lastOralIntake: z.object({
    date: z.date(),
    hour: z.number(),
    minute: z.number(),
  }),
  events: z.string(),
});
interface OpqrstEvaluationFormProps {
  formId: string;
}

export const SampleEvaluationForm = ({ formId }: OpqrstEvaluationFormProps) => {
  const form = useForm<z.infer<typeof opqrstEvaluationSchema>>({
    resolver: zodResolver(opqrstEvaluationSchema),
    defaultValues: {
      symptoms: "",
      allergies: "",
      medications: "",
      pastHistory: "",
      events: "",
      lastOralIntake: {
        date: new Date(),
        hour: 0,
        minute: 0,
      },
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
            return <Question question={question} form={form} key={index} />;
          })}

        </form>
      </Form>
    </div>
  );
};
