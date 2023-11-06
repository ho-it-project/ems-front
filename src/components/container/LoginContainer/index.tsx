"use client";
import LoginButton from "@/components/module/Login/LoginButton";
import InputModule from "@/components/module/Login/LoginInputModule";
import { TabModalWrapper } from "@/components/module/common/TabModalWrapper";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const LoginContainer = () => {
  const [centerId, setCenterId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const { push } = useRouter();
  const backUrl = useSearchParams().get("callbackURL");

  const { signIn, user } = useAuth();
  if (user) push(backUrl ? backUrl : "/");

  const handleLogin = async () => {
    const isSuccess = await signIn({
      ambulance_company_name: centerId,
      id_card: id,
      password,
    });
    if (isSuccess) push(backUrl ? backUrl : "/");
    setInvalid(!isSuccess);
  };

  const Content = (
    <div className="h-[55rem] w-[50rem] flex-col pl-16 pr-16 align-middle">
      <div className="h-[3.5rem]" />
      {/* Center Id */}
      <InputModule
        fieldName="기관 ID"
        value={centerId}
        onChangeCb={setCenterId}
      />
      <div className="h-[2rem]" />

      {/* Id */}
      <InputModule fieldName="ID" value={id} onChangeCb={setId} />
      <div className="h-[2rem]" />

      {/* Password */}
      <InputModule
        fieldName="비밀번호"
        value={password}
        onChangeCb={setPassword}
        type="password"
      />
      <div className="h-[1rem]" />

      {invalid ? (
        <div className=" text-lg text-red">
          * 등록되지 않은 아이디거나, 아이디 또는 비밀번호가 회원정보와 일치하지
          않습니다.
        </div>
      ) : null}
      <div className="h-[3rem]" />

      <div className="flex justify-end">
        <div className="text-[#979797] underline">ID/비밀번호 찾기</div>
      </div>
      <div className="h-[1.4rem]" />
      <LoginButton onClick={handleLogin} />
    </div>
  );

  return (
    <TabModalWrapper
      content={{
        title: "로그인",
        content: Content,
      }}
      style={{ titleWidth: 25 }}
      contentClassName="pr-0 pl-0"
    />
  );
};
