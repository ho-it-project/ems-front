"use client";

import { PageHeader } from "@/components/elements/PageHeader";
import { DcapBtlsInfoCard } from "@/components/module/Evaluation/DcapBtlsEvaluation/DcapBtlsInfoCard";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { DCAP_BTLS_AffectArea } from "@/type/evaluation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

type DCAP_BTLS_Evaluation = {
  affected_area: DCAP_BTLS_AffectArea;
  deformity: boolean;
  contusion: boolean;
  abrasion: boolean;
  puncture: boolean;
  burn: boolean;
  tenderness: boolean;
  laceration: boolean;
  swelling: boolean;
  editMode?: boolean;
};

export const DcapBtlsEvaluaionContainer = () => {
  const FORM_ID = "dcap-btls-form";
  const [dcapBtlsEvaluations, setDcapBtlsEvaluations] = useState<
    DCAP_BTLS_Evaluation[]
  >([]);
  const addHandler = () => {
    setDcapBtlsEvaluations((prev) => [
      ...prev,
      {
        affected_area: "UNKNOWN",
        deformity: false,
        contusion: false,
        abrasion: false,
        puncture: false,
        burn: false,
        tenderness: false,
        laceration: false,
        swelling: false,
        editMode: true,
      },
    ]);
  };
  const editHandler = (index: number) => () => {
    setDcapBtlsEvaluations((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, editMode: true } : item
      )
    );
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col gap-[3rem]">
        <PageHeader title="DCAP-BTLS" description="빠른 외상 평가">
          <div className="flex gap-[2rem]">
            <button className=" h-full w-[5rem] rounded-[1rem] bg-lgrey ">
              <div className="fontSize-regular flex items-center justify-between px-[1.4rem]  py-[1rem] text-white">
                <ArrowLeft width={24} />
              </div>
            </button>
            <button
              className=" h-full w-[12.7rem] rounded-[1rem] bg-main "
              form={FORM_ID}
              type="submit"
            >
              <div className="fontSize-regular flex items-center justify-between px-[1.4rem]  py-[1rem] text-white">
                <span>다 음</span>
                <ArrowRight width={24} />
              </div>
            </button>
          </div>
        </PageHeader>
        <div className="h-full flex-1 overflow-scroll">
          <div className="m-auto max-w-[72rem] overflow-hidden">
            <div className="flex  h-full w-full max-w-[72rem] flex-col items-center gap-[1rem]  overflow-scroll">
              <DcapBtlsInfoCard
                affected_area="ABDOMEN"
                deformity={false}
                contusion={false}
                abrasion={false}
                puncture={false}
                burn={false}
                tenderness={false}
                laceration={false}
                swelling={false}
              />
              {dcapBtlsEvaluations.map((dcapBtlsEvaluation, index) => {
                return (
                  <DcapBtlsInfoCard
                    key={index}
                    affected_area={dcapBtlsEvaluation.affected_area}
                    deformity={dcapBtlsEvaluation.deformity}
                    contusion={dcapBtlsEvaluation.contusion}
                    abrasion={dcapBtlsEvaluation.abrasion}
                    puncture={dcapBtlsEvaluation.puncture}
                    burn={dcapBtlsEvaluation.burn}
                    tenderness={dcapBtlsEvaluation.tenderness}
                    laceration={dcapBtlsEvaluation.laceration}
                    swelling={dcapBtlsEvaluation.swelling}
                    editOnClick={editHandler(index)}
                    editMode={dcapBtlsEvaluation.editMode}
                  />
                );
              })}

              <div>
                <button
                  className="flex h-[3.6rem] w-[6rem] items-center justify-center rounded-full bg-main text-white opacity-30"
                  onClick={addHandler}
                >
                  <Plus width={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProgressTracker
          steps={["신속평가", "환자정보입력", "증상평가", "요청", "이송"]}
          currentStep={3}
        />
      </div>
    </div>
  );
};
