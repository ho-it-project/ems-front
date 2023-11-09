import { PageHeader } from "@/components/elements/PageHeader";
import { MyProfileForm } from "@/components/module/My/MyProfileForm";

export const MyContainer = () => {
  const FORM_ID = "my-profile-form";
  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col gap-[6rem] rounded-lg">
        <PageHeader title={"프로필"} fontSize="xlarge" color="main" />
        <div className="flex h-full flex-col gap-[1.6rem]">
          <MyProfileForm formId={FORM_ID} />
        </div>
      </div>
    </div>
  );
};
