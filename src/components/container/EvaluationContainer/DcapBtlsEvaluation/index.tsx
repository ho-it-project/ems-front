"use client";

import { PageHeader } from "@/components/elements/PageHeader";
import { DcapBtlsInfoCard } from "@/components/module/Evaluation/DcapBtlsEvaluation/DcapBtlsInfoCard";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { DCAP_BTLS_AFFECT, DCAP_BTLS_AffectArea } from "@/lib/type/evaluation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

type DCAP_BTLS_Evaluation = {
  affected_area: DCAP_BTLS_AffectArea | "NONE";
  affect: DCAP_BTLS_AFFECT;
  editMode?: boolean;
  description?: string;
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
        affected_area: "NONE",
        affect: {
          deformity: false,
          contusion: false,
          abrasion: false,
          puncture: false,
          burn: false,
          tenderness: false,
          laceration: false,
          swelling: false,
        },
        editMode: false,
        description: "",
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
  const saveHandler = (index: number) => () => {
    setDcapBtlsEvaluations((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, editMode: false } : item
      )
    );
  };
  const deleteHandler = (index: number) => () => {
    setDcapBtlsEvaluations((prev) => prev.filter((_, idx) => idx !== index));
  };

  const selectAffectedHandler =
    (index: number) => (affect: DCAP_BTLS_AFFECT) => {
      setDcapBtlsEvaluations((prev) =>
        prev.map((item, idx) =>
          idx === index
            ? { ...item, affect: { ...item.affect, ...affect } }
            : item
        )
      );
    };
  const selectAffectedAreaHandler =
    (index: number) => (affected_area: DCAP_BTLS_AffectArea | "NONE") => {
      setDcapBtlsEvaluations((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, affected_area } : item
        )
      );
    };

  const descriptionHandler =
    (index: number) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setDcapBtlsEvaluations((prev) =>
        prev.map((item, idx) =>
          idx === index ? { ...item, description: value } : item
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
          <div className="m-auto max-w-[72rem]">
            <div className="flex  h-full w-full max-w-[72rem] flex-col items-center gap-[1rem] ">
              {dcapBtlsEvaluations.map((dcapBtlsEvaluation, index) => {
                return (
                  <DcapBtlsInfoCard
                    key={index}
                    affected_area={dcapBtlsEvaluation.affected_area}
                    affect={dcapBtlsEvaluation.affect}
                    editOnClick={editHandler(index)}
                    saveHandler={saveHandler(index)}
                    editMode={dcapBtlsEvaluation.editMode}
                    selectAffectedHandler={selectAffectedHandler(index)}
                    selectAffectedAreaHandler={selectAffectedAreaHandler(index)}
                    descriptionHandler={descriptionHandler(index)}
                    description={dcapBtlsEvaluation.description}
                    deleteHandler={deleteHandler(index)}
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
