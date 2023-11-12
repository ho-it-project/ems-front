import { CalendarSelector } from "@/components/elements/Calendar";
import { Input } from "@/components/elements/Input";
import { Slider } from "@/components/elements/Slider";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { SymptomLabel } from "../../common/SymptomLabeledInput";

// TODO : 리팩토링 필요 (코드정리 및 의존성 제거 필요)- 2023.11.13 
export type EvaluationKey =
  | "symptoms"
  | "allergies"
  | "medications"
  | "pastHistory"
  | "events";
export type EvaluationDateDateKey = "lastOralIntake.date";
export type EvaluationQuestionTypeTimeKey =
  | "lastOralIntake.hour"
  | "lastOralIntake.minute";

export interface EvaluationQuestionTypeInput {
  key: EvaluationKey;
  type: "input";
  title: string;
  description: string;
}

export interface EvaluationQuestionTypeSlider {
  key: EvaluationKey;
  title: string;
  type: "slider";
  description: string;
  sliderOptions?: {
    minValue: number;
    maxValue: number;
    step: number;
  };
}

export interface EvaluationQuestionTypeDate {
  key: EvaluationDateDateKey;
  type: "calendar";
  title: string;
  description: string;
  unit?: string;
  max?: number;
  min?: number;
}

export interface EvaluationQuestionTypeTime {
  key: EvaluationQuestionTypeTimeKey;
  type: "picker";
  unit: string;
  max?: number;
  min?: number;
}

export interface EvaluationQuestionTypeArray {
  key: "lastOralIntake";
  type: "array";
  items: (EvaluationQuestionTypeDate | EvaluationQuestionTypeTime)[];
}

export type EvaluationQuestionType =
  | EvaluationQuestionTypeInput
  | EvaluationQuestionTypeSlider
  | EvaluationQuestionTypeDate
  | EvaluationQuestionTypeTime
  | EvaluationQuestionTypeArray;

export type FiledType = ControllerRenderProps<
  {
    symptoms: string;
    allergies: string;
    medications: string;
    pastHistory: string;
    events: string;
    lastOralIntake: {
      date: Date;
      hour: number;
      minute: number;
    };
  },
  EvaluationKey | EvaluationDateDateKey | EvaluationQuestionTypeTimeKey
>;

export const Question = ({
  question,
  field,
  form,
}: {
  question:
    | EvaluationQuestionTypeInput
    | EvaluationQuestionTypeSlider
    | EvaluationQuestionTypeDate
    | EvaluationQuestionTypeTime
    | EvaluationQuestionTypeArray;
  field?: FiledType;
  form: UseFormReturn<
    {
      symptoms: string;
      allergies: string;
      medications: string;
      pastHistory: string;
      lastOralIntake: {
        date: Date;
        hour: number;
        minute: number;
      };
      events: string;
    },
    unknown,
    undefined
  >;
}) => {
  return (() => {
    switch (question.type) {
      case "input":
        return (
          <FormField
            name={question.key}
            control={form.control}
            render={({ field }) => (
              <FormItem>
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
              </FormItem>
            )}
          />
        );
      case "slider":
        return (
          <FormField
            name={question.key}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <SymptomLabel
                  title={
                    question.title.charAt(0).toUpperCase() +
                    question.title.slice(1)
                  }
                  description={question.description}
                  bgColor="transparent"
                >
                  <FormControl>
                    <Slider
                      {...field}
                      value={parseInt(
                        typeof field.value === "string" ? field.value : "0"
                      )}
                      id={question.title}
                      aria-describedby="opqrst_evaluation_form"
                    />
                  </FormControl>
                </SymptomLabel>
              </FormItem>
            )}
          />
        );
      // ...
      case "calendar":
        return (
          <FormField
            name={question.key}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <SymptomLabel
                  title={
                    question.title.charAt(0).toUpperCase() +
                    question.title.slice(1)
                  }
                  description={question.description}
                  bgColor="transparent"
                >
                  <FormControl>
                    <CalendarSelector
                      selected={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? new Date(field.value)
                          : field.value
                      }
                      onSelect={field.onChange}
                    />
                  </FormControl>
                </SymptomLabel>
              </FormItem>
            )}
          />
        );
      case "picker":
        return (
          <FormField
            name={question.key}
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center text-main">
                <div className="flex h-full w-full items-center gap-[0.8rem]">
                  <div className="flex h-[6.4rem] w-[6.4rem] flex-col justify-center rounded-lg bg-white ">
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          if (e.target.value === "") return field.onChange(0);
                          if (
                            question.max &&
                            parseInt(e.target.value) > question.max
                          ) {
                            return field.onChange(question.max);
                          }
                          if (isNaN(parseInt(e.target.value)))
                            return field.onChange(0);
                          field.onChange(parseInt(e.target.value));
                        }}
                        bgColor="transparent"
                        value={field.value.toLocaleString()}
                        id={question.key}
                        border="none"
                        className="h-full w-full "
                        textLocation="center"
                        aria-describedby="opqrst_evaluation_form"
                      />
                    </FormControl>
                  </div>
                  <span>{question.unit}</span>
                </div>
              </FormItem>
            )}
          />
        );

      case "array":
        return (
          <div className="flex w-full gap-[1.8rem]">
            {question.items.map((question, index) => {
              return (
                <Question
                  form={form}
                  field={field}
                  question={question}
                  key={index}
                />
              );
            })}
          </div>
        );
      default:
        return <></>;
    }
  })();
};
