"use client";
import { Input } from "@/components/elements/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChangePasswordFormProps {
  formId: string;
  onSubmit?: () => void;
}

const myProfileSchema = z.object({
  now_password: z.string(),
  password: z.string(),
});

export const ChangePasswordForm = ({
  formId,
  onSubmit,
}: ChangePasswordFormProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof myProfileSchema>>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
      now_password: "",
      password: "",
    },
  });
  const { accessToken } = useAuth();
  const onSubmitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    fetch("api/ems/employees", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(form.getValues()),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (!json.is_success) throw new Error(json.message);
        toast({ description: "비밀번호가 변경되었습니다." });
        onSubmit && onSubmit();
      })
      .catch((err) => toast({ description: err.message }));
    // TODO: 에러 메세지에 따른 사용자 에러처리
  };
  return (
    <div className="flex flex-col gap-[2rem]">
      <Form {...form}>
        <form
          id={formId}
          aria-controls="my-profile-form"
          onSubmit={onSubmitHandler}
        >
          <div className="flex justify-center gap-[2rem]">
            <div className="flex min-h-[43.7rem] w-[63rem] min-w-[63rem] flex-col justify-center gap-[6rem] text-main">
              <FormField
                name="now_password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-5 col-start-5 row-start-2">
                    <div className="flex h-full w-full items-center justify-center gap-[3rem]">
                      <FormLabel className="min-w-[11rem] ">
                        <span className="fontSize-medium">현재 비밀번호</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} id="name" className="flex-1" />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-5 col-start-5 row-start-2">
                    <div className="flex h-full w-full items-center justify-center gap-[3rem]">
                      <FormLabel className="min-w-[11rem] ">
                        <span className="fontSize-medium">새 비밀번호</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} id="name" className="flex-1" />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <div className="flex w-full  justify-end">
                <button
                  className="fontSize-small fontSize-medium flex h-[4rem] w-[12.7rem] items-center justify-center rounded-lg bg-main text-right text-white"
                  form={formId}
                >
                  <span className="fontSize-regular">저장</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
