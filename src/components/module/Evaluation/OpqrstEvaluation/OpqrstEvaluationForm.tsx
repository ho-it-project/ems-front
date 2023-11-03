"use client";
import { CalendarSelector } from "@/components/elements/Calendar";
import { Input } from "@/components/elements/Input";
import { Slider } from "@/components/elements/Slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SymptomLabel } from "../../common/SymptomLabeledInput";
type EvaluationKey =
  | "onset"
  | "provoke"
  | "quality"
  | "radiation"
  | "severity"
  | "time.date";

interface EvaluationQuestionTypeInput {
  key: EvaluationKey;
  title: string;
  description: string;
  type: "input";
}

interface EvaluationQuestionTypeSlider {
  key: EvaluationKey;
  title: string;
  description: string;
  type: "slider";
  sliderOptions?: {
    minValue: number;
    maxValue: number;
    step: number;
  };
}

interface EvaluationQuestionTypeCalendar {
  key: EvaluationKey;
  title: string;
  description: string;
  type: "calendar";
  sliderOptions?: {
    minValue: number;
    maxValue: number;
    step: number;
  };
}

type EvaluationQuestionList = (
  | EvaluationQuestionTypeInput
  | EvaluationQuestionTypeSlider
  | EvaluationQuestionTypeCalendar
)[];

const evaluationQuestionList: EvaluationQuestionList = [
  {
    key: "onset",
    title: "onset",
    description: "증상발현 시 한 행동",
    type: "input",
  },
  {
    key: "provoke",
    title: "provoke",
    description: "증상을 약화/완화 시키는 외부요인",
    type: "input",
  },
  {
    key: "quality",
    title: "quality",
    description: "어떻게 아픈지?",
    type: "input",
  },
  {
    key: "radiation",
    title: "radiation",
    description: "아픈 부위가 어디인지?",
    type: "input",
  },
  {
    key: "severity",
    title: "severity",
    description: "얼마나 아픈지?",
    type: "slider",
  },
  {
    key: "time.date",
    title: "time",
    description: "시간에 따라 아픈 정도 (지속시간, 변화 등)",
    type: "calendar",
  },
];

const opqrstEvaluationSchema = z.object({
  onset: z.string(),
  provoke: z.string(),
  quality: z.string(),
  radiation: z.string(),
  severity: z.string(),
  time: z.object({
    date: z.date(),
  }),
});

export const OpqrstEvaluationForm = () => {
  const form = useForm<z.infer<typeof opqrstEvaluationSchema>>({
    resolver: zodResolver(opqrstEvaluationSchema),
    defaultValues: {
      onset: "",
      provoke: "",
      quality: "",
      radiation: "",
      severity: "0",
      time: {
        date: new Date(),
      },
    },
  });
  function onSubmit(values: z.infer<typeof opqrstEvaluationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-controls="opqrst_evaluation_form"
          id="opqrst_evaluation_form"
          className="flex flex-col gap-[2rem]"
        >
          {evaluationQuestionList.map((question, index) => {
            return (
              <FormField
                key={index}
                name={question.key}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {question.type === "input" ? (
                      <SymptomLabel
                        title={
                          question.title.charAt(0).toUpperCase() +
                          question.title.slice(1)
                        }
                        description={question.description}
                      >
                        <FormControl>
                          <Input
                            {...field}
                            bgColor="transparent"
                            value={field.value as string}
                            id={question.title}
                            border="none"
                            className="h-full w-full"
                            textLocation="left"
                            aria-describedby="opqrst_evaluation_form"
                          />
                        </FormControl>
                      </SymptomLabel>
                    ) : question.type === "slider" ? (
                      <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
                        <div className="flex min-w-[11rem] flex-col justify-center">
                          <span className="text-main">{question.title}</span>
                          <span className="fontSize-small text-lgrey">
                            {question.description}
                          </span>
                        </div>
                        <FormControl>
                          <Slider
                            {...field}
                            value={parseInt(
                              typeof field.value === "string"
                                ? field.value
                                : "0"
                            )}
                            id={question.title}
                            aria-describedby="opqrst_evaluation_form"
                          />
                        </FormControl>
                      </div>
                    ) : question.type === "calendar" ? (
                      <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
                        <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                          <span className="text-main">{question.title}</span>
                          <span className="fontSize-small text-lgrey">
                            {question.description}
                          </span>
                        </div>
                        <FormControl>
                          <CalendarSelector
                            selected={
                              typeof field.value === "string"
                                ? new Date()
                                : field.value
                            }
                            onSelect={field.onChange}
                          />
                        </FormControl>
                      </div>
                    ) : (
                      ""
                    )}
                  </FormItem>
                )}
              />
            );
          })}
        </form>
      </Form>
      <button type="submit" form="opqrst_evaluation_form" />
    </div>
  );
};
