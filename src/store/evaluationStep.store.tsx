import { create } from "zustand";

type EvalutaionStep =
  | "PATIENT_INFO"
  | "GUARDIAN_INFO"
  | "REPID"
  | "OPQRST"
  | "DCAP_BTLS"
  | "VS"
  | "SAMPLE";

interface EvaluationStepStore {
  now: number;
  steps: EvalutaionStep[];
  rapidEvaluation: {
    trauma: boolean;
    clear: boolean;
    conscious: boolean;
  };
  setSteps: () => void;
  setRapidEvaluation: (
    rapidEvaluation: EvaluationStepStore["rapidEvaluation"]
  ) => void;
  nextStep: () => void;
}

export const useEveluationStepStore = create<EvaluationStepStore>((set) => ({
  now: 0,
  steps: [],
  rapidEvaluation: {
    trauma: false,
    clear: false,
    conscious: false,
  },
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
        };
      }

      if (trauma && !clear) {
        return { ...state, steps: ["PATIENT_INFO", "VS", "SAMPLE"] };
      }

      if (!trauma && conscious) {
        return {
          ...state,
          steps: ["PATIENT_INFO", "OPQRST", "VS", "SAMPLE", "DCAP_BTLS"],
        };
      }

      if (!trauma && !conscious) {
        return {
          ...state,
          steps: [
            "PATIENT_INFO",
            "GUARDIAN_INFO",
            "DCAP_BTLS",
            "VS",
            "OPQRST",
            "SAMPLE",
          ],
        };
      }

      return { ...state, steps: [] };
    }),

  nextStep: () =>
    set((state) => {
      return { ...state, now: state.now + 1 };
    }),
}));
