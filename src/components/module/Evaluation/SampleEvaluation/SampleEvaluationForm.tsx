"use client";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/hooks/api/usePatient";
import { useEvaluationStep } from "@/hooks/useEvaluationStep";
import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const { toast } = useToast();
  const { nextPage, steps } = useEvaluationStep();
  const router = useRouter();
  const { patient } = usePatient();
  const { accessToken } = useAuth();
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      symptoms,
      allergies,
      medications,
      pastHistory,
      lastOralIntake,
      events,
    } = form.getValues();

    if (!symptoms.length) {
      toast({ description: "Symptoms를 입력해주세요" });
      return;
    }
    if (!allergies.length) {
      toast({ description: "Allergies를 입력해주세요" });
      return;
    }
    if (!medications.length) {
      toast({ description: "Medications를 입력해주세요" });
      return;
    }
    if (!pastHistory.length) {
      toast({ description: "Past Medical History를 입력해주세요" });
      return;
    }
    if (!events.length) {
      toast({ description: "Events preceding the incident를 입력해주세요" });
      return;
    }
    if (!lastOralIntake.date) {
      toast({ description: "Last Oral Intake를 입력해주세요" });
      return;
    }

    const body = JSON.stringify({
      signs_symptoms: symptoms,
      allergies,
      medications,
      past_medical_history: pastHistory,
      last_oral_intake: new Date(
        `${lastOralIntake.date.getFullYear()}-${
          lastOralIntake.date.getMonth() + 1
        }-${lastOralIntake.date.getDate()} ${lastOralIntake.hour}:${
          lastOralIntake.minute
        }`
      ).toISOString(),
      events_leading_to_illness: events,
    });
    if (!patient) {
      return;
    }

    fetch(`/api/ems/patients/${patient.patient_id}/sample`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((res: { is_success: boolean }) => {
        if (res.is_success) {
          if (steps.length) {
            nextPage();
            return;
          }
          router.push("/request");
          return;
        }

        toast({ description: "sample 평가에 실패했습니다." });
      });
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
          onSubmit={onSubmit}
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
