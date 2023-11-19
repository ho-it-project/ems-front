import { useEveluationStepStore } from "@/store/evaluationStep.store";
import { useRouter } from "next/navigation";

export const useEvaluationStep = () => {
  const { steps, next, nextStep } = useEveluationStepStore();
  const router = useRouter();
  const _next = steps[next];
  const nextPage = () => {
    if (_next === "PATIENT_INFO") router.push("/patient/");
    if (_next === "DCAP_BTLS") router.push("/patient/dcap-btls");
    if (_next === "VS") router.push("/patient/vs");
    if (_next === "SAMPLE") router.push("/patient/sample");
    if (_next === "OPQRST") router.push("/patient/opqrst");
    nextStep();
  };
  return { nextPage, steps, next };
};
