"use client";

import { PageHeader } from "@/components/elements/PageHeader";
import { DcapBtlsInfoCard } from "@/components/module/Evaluation/DcapBtlsEvaluation/DcapBtlsInfoCard";
import { ProgressTracker } from "@/components/module/common/ProgressTracker";
import { useToast } from "@/components/ui/use-toast";
import { usePatient } from "@/hooks/api/usePatient";
import { useAuth } from "@/providers/AuthProvider";
import { DCAP_BTLS_AFFECT, DCAP_BTLS_AffectArea } from "@/types/evaluation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DCAP_BTLS_Evaluation = {
  affected_area: DCAP_BTLS_AffectArea | "NONE";
  affect: DCAP_BTLS_AFFECT;
  editMode?: boolean;
  description?: string;
};

export const DcapBtlsEvaluaionContainer = () => {
  const FORM_ID = "dcap-btls-form";
  const { patient } = usePatient();
  const { toast } = useToast();
  const router = useRouter();
  const { accessToken } = useAuth();
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
    if (dcapBtlsEvaluations[index].affected_area === "NONE") {
      toast({ description: "부위를 선택해주세요." });
      return;
    }
    if (
      Object.entries(dcapBtlsEvaluations[index].affect).filter(
        (item) => item[1] === true
      ).length === 0
    ) {
      toast({ description: "증상을 선택해주세요." });
      return;
    }

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
      if (
        dcapBtlsEvaluations.find(
          (item, i) =>
            item.affected_area === affected_area &&
            index !== i &&
            item.affected_area !== "NONE"
        )
      ) {
        toast({ description: "이미 선택된 부위입니다." });
        return;
      }
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = dcapBtlsEvaluations.filter(
      (item) => item.affected_area !== "NONE"
    );
    if (filtered.length === 0) {
      toast({ description: "평가를 진행해주세요." });
      return;
    }
    if (!patient) return;

    const { patient_id } = patient;
    const bodys = filtered.map((item) => {
      const { affected_area, affect } = item;
      const {
        deformity,
        contusion,
        abrasion,
        puncture,
        burn,
        tenderness,
        laceration,
        swelling,
      } = affect;

      //TODO: description 추가
      return JSON.stringify({
        affected_area,
        deformity: deformity.toString(),
        contusion: contusion.toString(),
        abrasion: abrasion.toString(),
        puncture: puncture.toString(),
        burn: burn.toString(),
        tenderness: tenderness.toString(),
        laceration: laceration.toString(),
        swelling: swelling.toString(),
      });
    });
    const responses = await Promise.all(
      bodys.map(async (body) => {
        return await fetch(`/api/ems/patients/${patient_id}/dcap_btls`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body,
        })
          .then((res) => res.json())
          .then((res: { is_success: boolean }) => {
            return res.is_success;
          });
      })
    );
    const isSuccess = responses.every((item) => item === true);
    const faildIndex = responses.findIndex((item) => item === false || !item);
    if (isSuccess) {
      router.push("/patient/additional-evaluation");
    } else {
      toast({ description: `${faildIndex + 1}번째 평가를 실패하였습니다.` });
    }
  };

  const onSkip = () => {
    router.push("/patient/additional-evaluation");
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
              className=" h-full rounded-[1rem] bg-lgrey"
              onClick={onSkip}
            >
              <div className="fontSize-regular flex items-center justify-between px-[1.4rem]  py-[1rem] text-white">
                건너뛰기
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
            <form
              className="flex  h-full w-full max-w-[72rem] flex-col items-center gap-[1rem]"
              id={FORM_ID}
              onSubmit={onSubmit}
            >
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
                  type="button"
                >
                  <Plus width={24} />
                </button>
              </div>
            </form>
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
