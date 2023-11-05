import { Input } from "@/components/elements/Input";
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

const InputModule = ({
  value,
  fieldName,
  onChangeCb,
}: {
  value: string;
  fieldName: string;
  onChangeCb: Dispatch<SetStateAction<string>>;
}) => {
  const onChange = useCallback(
    (setState: Dispatch<SetStateAction<string>>) =>
      (v: ChangeEvent<HTMLInputElement>) => {
        const value = v.target.value;
        setState(value);
      },
    []
  );
  return (
    <div className="flex h-[8.9rem] w-[42rem] flex-col justify-between">
      {fieldName}
      <Input
        value={value}
        onChange={onChange(onChangeCb)}
        placeholder="ID를 입력하세요."
        placeholderColor="lgrey"
        height="large"
        className="text-2xl font-semibold"
      />
    </div>
  );
};

export default InputModule;
