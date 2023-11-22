"use client";
import { useEvaluationStep } from "@/hooks/useEvaluationStep";
import { useEveluationStepStore } from "@/store/evaluationStep.store";
import { useEffect } from "react";
import { DualChoiceButton } from "../../common/DualChoiceButton";

interface RapidEvaluationFormProps {
  formId: string;
}

export const RapidEvaluationForm = ({ formId }: RapidEvaluationFormProps) => {
  const { setRapidEvaluation, setSteps, rapidEvaluation, setCheck } =
    useEveluationStepStore();
  const { nextPage } = useEvaluationStep();
  const handleTrauma = (isTrauma: boolean) => {
    setRapidEvaluation({
      ...rapidEvaluation,
      trauma: isTrauma,
    });
  };

  const handleClear = (isClear: boolean) => {
    setRapidEvaluation({
      ...rapidEvaluation,
      clear: isClear,
    });
  };

  const handleConscious = (isConscious: boolean) => {
    setRapidEvaluation({
      ...rapidEvaluation,
      conscious: isConscious,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheck(true);
    nextPage();
    // 로직 작성 필요
  };

  useEffect(() => {
    setSteps();
  }, [rapidEvaluation, setSteps]);

  return (
    <form
      className="justify flex flex-col items-center justify-center gap-[5rem]"
      id={formId}
      onSubmit={onSubmit}
    >
      <DualChoiceButton
        title="외상유무"
        leftButton="외상환자"
        rightButton="비외상환자"
        select={rapidEvaluation.trauma ? "left" : "right"}
        onClickLeftButton={() => handleTrauma(true)}
        onClickRightButton={() => handleTrauma(false)}
      />
      <DualChoiceButton
        title="손상기전"
        leftButton="명확"
        rightButton="불명확"
        select={rapidEvaluation.clear ? "left" : "right"}
        onClickLeftButton={() => handleClear(true)}
        onClickRightButton={() => handleClear(false)}
      />
      <DualChoiceButton
        title="의식상태"
        leftButton="있음"
        rightButton="무의식"
        select={rapidEvaluation.conscious ? "left" : "right"}
        onClickLeftButton={() => handleConscious(true)}
        onClickRightButton={() => handleConscious(false)}
      />
    </form>
  );
};
