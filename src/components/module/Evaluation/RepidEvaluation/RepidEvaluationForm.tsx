"use client";
import { useState } from "react";
import { DualChoiceButton } from "../../common/DualChoiceButton";

export const RepidEvaluationForm = () => {
  const [isTrauma, setIsTrauma] = useState<null | boolean>();
  const [isClear, setIsClear] = useState<null | boolean>();
  const [isConscious, setIsConscious] = useState<null | boolean>();

  const handleTrauma = (isTrauma: boolean) => {
    setIsTrauma(isTrauma);
  };

  const handleClear = (isClear: boolean) => {
    setIsClear(isClear);
  };

  const handleConscious = (isConscious: boolean) => {
    setIsConscious(isConscious);
  };
  return (
    <div className="justify flex flex-col items-center justify-center gap-[5rem]">
      <DualChoiceButton
        title="외상유무"
        leftButton="외상환자"
        rightButton="비외상환자"
        select={isTrauma === null ? undefined : isTrauma ? "left" : "right"}
        onClickLeftButton={() => handleTrauma(true)}
        onClickRightButton={() => handleTrauma(false)}
      />
      <DualChoiceButton
        title="손상기전"
        leftButton="명확"
        rightButton="불명확"
        select={isClear === null ? undefined : isClear ? "left" : "right"}
        onClickLeftButton={() => handleClear(true)}
        onClickRightButton={() => handleClear(false)}
      />
      <DualChoiceButton
        title="의식상태"
        leftButton="있음"
        rightButton="무의식"
        select={
          isConscious === null ? undefined : isConscious ? "left" : "right"
        }
        onClickLeftButton={() => handleConscious(true)}
        onClickRightButton={() => handleConscious(false)}
      />
    </div>
  );
};
