// import { useEveluationStepStore } from "@/store/evaluationStep.store";
// import { useRouter } from "next/navigation";
// import { usePatient } from "./api/usePatient";

// export const useEvaluationStep = () => {
//   const { patient } = usePatient();
//   const { steps, next, nextStep, init } = useEveluationStepStore();
//   const router = useRouter();
//   const _next = steps[next];
//   const nextPage = () => {
//     console.log(steps, _next);
//     if (steps.length === 0 && patient) {
//       router.push("/patient/additional-evaluation");
//       init();
//       return;
//     }

//     if (_next === "PATIENT_INFO") {
//       console.log("PATIENT_INFO");
//       router.push("/patient/");
//     }
//     if (_next === "DCAP_BTLS") {
//       console.log("DCAP_BTLS");
//       router.push("/patient/dcap-btls");
//     }
//     if (_next === "VS") {
//       console.log("VS");
//       router.push("/patient/vs");
//     }
//     if (_next === "SAMPLE") {
//       console.log("SAMPLE");

//       router.push("/patient/sample");
//     }
//     if (_next === "OPQRST") {
//       console.log("OPQRST");
//       router.push("/patient/opqrst");
//       return;
//     }
//     if (!_next) {
//       init();
//       router.push("/request");
//     }

//     nextStep();
//   };
//   return { nextPage, steps, next };
// };
