"use client";
import { PageHeader } from "@/components/elements/PageHeader";
import { TabWrapper } from "@/components/layout/TabWrapper";
import { ChangePasswordForm } from "@/components/module/My/ChangePasswordForm";
import { MyProfileForm } from "@/components/module/My/MyProfileForm";
import { useProfile } from "@/hooks/api/useProfile";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export const MyContainer = () => {
  const FORM_ID = "my-profile-form";
  const { profile } = useProfile();
  const [editMode, setEditMode] = useState<boolean>(true);
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  if (!profile.user || !profile.company) return <div>loading...</div>;
  const onSubmit = () => {
    if (!editMode) {
      setEditMode(true);
    }
    if (editMode) {
      setEditMode(false);
    }
  };
  const onBack = () => {
    if (editMode) {
      setEditMode(false);
    }
  };
  return (
    <div className="h-full w-full">
      {!editMode ? (
        <div className="flex h-full flex-col gap-[6rem] rounded-lg">
          <PageHeader title={"프로필"} fontSize="xlarge" color="main" />
          <div className="flex h-full flex-col gap-[1.6rem]">
            <MyProfileForm
              formId={FORM_ID}
              user={profile.user}
              company={profile.company}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      ) : (
        <>
          <TabWrapper
            contents={[
              {
                title: "비밀번호 변경",
                content: (
                  <>
                    <PageHeader
                      title={"프로필"}
                      button={
                        <button type="button" onClick={onBack}>
                          <ChevronLeft />
                        </button>
                      }
                      fontSize="medium"
                    />
                    <ChangePasswordForm formId={FORM_ID} onSubmit={onSubmit} />
                  </>
                ),
              },
            ]}
          />
        </>
      )}
    </div>
  );
};
