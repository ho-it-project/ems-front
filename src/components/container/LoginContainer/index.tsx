"use client";
import LoginButton from "@/components/module/Login/LoginButton";
import InputModule from "@/components/module/Login/LoginInputModule";
import { TabModalWrapper } from "@/components/module/common/TabModalWrapper";
import { useState } from "react";

export const LoginContainer = () => {
  const [centerId, setCenterId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const wrong = true;

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
      />
      <div className="h-[1rem]" />

      {wrong ? (
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

      <LoginButton />
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
