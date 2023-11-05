"use client";
import { Input } from "@/components/elements/Input";
import { TabModalWrapper } from "@/components/module/common/TabModalWrapper";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

export const LoginContainer = () => {
  const [centerId, setCenterId] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChange = useCallback(
    (setState: Dispatch<SetStateAction<string>>) =>
      (v: ChangeEvent<HTMLInputElement>) => {
        const value = v.target.value;
        if (value) setState(value);
      },
    []
  );
  const InputModule = ({
    value,
    fieldName,
    onChangeCallback,
  }: {
    value: string;
    fieldName: string;
    onChangeCallback: Dispatch<SetStateAction<string>>;
  }) => {
    return (
      <div className="flex h-[8.9rem] w-[42rem] flex-col justify-between">
        {fieldName}
        <Input
          value={value}
          onChange={onChange(onChangeCallback)}
          placeholder="ID를 입력하세요."
          height="large"
        />
      </div>
    );
  };
  const wrong = true;

  const Content = (
    <div className="h-[55rem] w-[50rem] flex-col pl-16 pr-16 align-middle">
      <div className="h-[3.5rem]" />
      <InputModule
        fieldName="기관 ID"
        value={centerId}
        onChangeCallback={setCenterId}
      />
      <div className="h-[2rem]" />
      <InputModule fieldName="ID" value={id} onChangeCallback={setId} />
      <div className="h-[2rem]" />
      <InputModule
        fieldName="비밀번호"
        value={password}
        onChangeCallback={setPassword}
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
        <div>id, pw 찾기</div>
      </div>
      <div className="h-[1.4rem]" />
      <div>로그인</div>
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
