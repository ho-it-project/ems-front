import { create } from "zustand";

interface RapidEvaluationStore {
  check: boolean;
  guardian: boolean;
  setCheck: (check: boolean) => void;
  setGuardian: (guardian: boolean) => void;
  rapidEvaluation: {
    trauma: boolean;
    clear: boolean;
    conscious: boolean;
  };
  setRapidEvaluation: (
    rapidEvaluation: RapidEvaluationStore["rapidEvaluation"]
  ) => void;
  init: () => void;
}

export const useRapidEvaluationStore = create<RapidEvaluationStore>((set) => ({
  check: false,
  guardian: false,
  rapidEvaluation: {
    trauma: false,
    clear: false,
    conscious: false,
  },

  setRapidEvaluation: (
    rapidEvaluation: RapidEvaluationStore["rapidEvaluation"]
  ) => set((state) => ({ ...state, rapidEvaluation })),
  setCheck: (check: boolean) => set((state) => ({ ...state, check })),
  setGuardian: (guardian: boolean) => set((state) => ({ ...state, guardian })),
  init: () =>
    set((state) => ({
      ...state,
      check: false,
      guardian: false,
      rapidEvaluation: {
        trauma: false,
        clear: false,
        conscious: false,
      },
    })),
}));
