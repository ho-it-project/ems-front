import { create } from "zustand";

type EvalutaionStep =
  | "PATIENT_INFO"
  | "REPID"
  | "OPQRST"
  | "DCAP_BTLS"
  | "VS"
  | "SAMPLE";

interface EvaluationStepStore {
  next: number;
  check: boolean;
  steps: EvalutaionStep[];
  rapidEvaluation: {
    trauma: boolean;
    clear: boolean;
    conscious: boolean;
  };
  guardian: boolean;
  setSteps: () => void;
  setRapidEvaluation: (
    rapidEvaluation: EvaluationStepStore["rapidEvaluation"]
  ) => void;
  nextStep: () => void;
  setCheck: (check: boolean) => void;
}

export const useEveluationStepStore = create<EvaluationStepStore>((set) => ({
  next: 0,
  steps: [],
  check: false,
  rapidEvaluation: {
    trauma: false,
    clear: false,
    conscious: false,
  },
  guardian: false,
  setRapidEvaluation: (
    rapidEvaluation: EvaluationStepStore["rapidEvaluation"]
  ) => set((state) => ({ ...state, rapidEvaluation })),

  setSteps: () =>
    set((state) => {
      const { rapidEvaluation } = state;
      const { trauma, clear, conscious } = rapidEvaluation;
      if (trauma && clear) {
        return {
          ...state,
          steps: ["PATIENT_INFO", "DCAP_BTLS", "VS", "SAMPLE"],
          guardian: false,
        };
      }

      if (trauma && !clear) {
        return {
          ...state,
          steps: ["PATIENT_INFO", "VS", "SAMPLE"],
          guardian: false,
        };
      }

      if (!trauma && conscious) {
        return {
          ...state,
          steps: ["PATIENT_INFO", "OPQRST", "VS", "SAMPLE", "DCAP_BTLS"],
          guardian: false,
        };
      }

      if (!trauma && !conscious) {
        return {
          ...state,
          steps: ["PATIENT_INFO", "DCAP_BTLS", "VS", "OPQRST", "SAMPLE"],
          guardian: true,
        };
      }

      return { ...state, steps: [] };
    }),

  nextStep: () =>
    set((state) => {
      return { ...state, next: state.next + 1 };
    }),
  setCheck: (check: boolean) => set((state) => ({ ...state, check })),
}));
