"use client";
import { CalendarSelector } from "@/components/elements/Calendar";
import { Input } from "@/components/elements/Input";
import { Slider } from "@/components/elements/Slider";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SymptomLabel } from "../../common/SymptomLabeledInput";
type EvaluationKey = "onset" | "provoke" | "quality" | "radiation" | "severity";
type EvaluationDateTimeKey = "time.date" | "time.hour" | "time.minute";

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

interface EvaluationQuestionTypeDateTime {
  key: EvaluationDateTimeKey;
  type: "calendar" | "picker";
  label?: {
    title: string;
    description: string;
  };
  unit?: string;
  max?: number;
  min?: number;
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
];
const dateQuestion: EvaluationQuestionTypeDateTime[] = [
  {
    key: "time.date",
    label: {
      title: "time",
      description: "시간에 따라 아픈 정도 (지속시간, 변화 등)",
    },
    type: "calendar",
  },
  {
    key: "time.hour",
    unit: "시",
    type: "picker",
    max: 23,
    min: 0,
  },
  {
    key: "time.minute",
    unit: "분",
    type: "picker",
    min: 0,
    max: 59,
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
    hour: z.number().max(23),
    minute: z.number().max(59),
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
        hour: 0,
        minute: 0,
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
                    ) : (
                      ""
                    )}
                  </FormItem>
                )}
              />
            );
          })}
          <div className="flex w-full gap-[1.8rem]">
            {dateQuestion.map((question, index) => (
              <FormField
                key={index}
                name={question.key}
                control={form.control}
                render={({ field }) =>
                  question.label ? (
                    <FormItem className="flex-[5]">
                      <div className="flex h-[6.5rem] w-full items-center gap-[7rem]">
                        <div className="flex min-w-[11rem] max-w-[11rem] flex-col justify-center">
                          <span className="text-main">
                            {question.label.title}
                          </span>
                          <span className="fontSize-small text-lgrey">
                            {question.label.description}
                          </span>
                        </div>
                        <FormControl>
                          <CalendarSelector
                            selected={
                              typeof field.value === "number"
                                ? new Date(field.value)
                                : field.value
                            }
                            onSelect={field.onChange}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  ) : (
                    <FormItem className="flex flex-[1] items-center text-main">
                      <div className="flex h-full w-full items-center gap-[0.8rem]">
                        <div className="flex h-full w-full flex-col justify-center rounded-lg bg-white">
                          <FormControl>
                            <Input
                              {...field}
                              onChange={(e) => {
                                if (e.target.value === "")
                                  return field.onChange(0);
                                if (
                                  question.max &&
                                  parseInt(e.target.value) > question.max
                                ) {
                                  return field.onChange(question.max);
                                }
                                if (
                                  question.min &&
                                  parseInt(e.target.value) < question.min
                                ) {
                                  return field.onChange(question.min);
                                }
                                field.onChange(parseInt(e.target.value));
                              }}
                              bgColor="transparent"
                              value={field.value.toLocaleString()}
                              id={question.key}
                              border="none"
                              className="h-full w-full"
                              textLocation="left"
                              aria-describedby="opqrst_evaluation_form"
                            />
                          </FormControl>
                        </div>
                        <span>{question.unit}</span>
                      </div>
                    </FormItem>
                  )
                }
              />
            ))}
          </div>
        </form>
      </Form>
      <button
        type="submit"
        form="opqrst_evaluation_form"
        className="h-5 w-5 bg-red"
      />
    </div>
  );
};
